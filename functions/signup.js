// ScholarMatch - Signup API
// Netlify Function

const { neon } = require('@neondatabase/serverless');

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    const data = JSON.parse(event.body);
    
    const { 
      email, 
      name, 
      phone, 
      state, 
      gpa, 
      year, 
      major, 
      citizenship,
      background_categories,
      email_consent,
      sms_consent
    } = data;
    
    // Validate required
    if (!email) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Email required' }) };
    }
    
    // Check if user exists
    const existing = await sql`SELECT id FROM users WHERE email = ${email}`;
    if (existing.length > 0) {
      return { statusCode: 409, headers, body: JSON.stringify({ error: 'Email already registered' }) };
    }
    
    // Insert user
    const result = await sql`
      INSERT INTO users (
        email, name, phone, state, gpa, year, major, citizenship,
        background_categories, email_consent, sms_consent
      ) VALUES (
        ${email}, ${name}, ${phone}, ${state}, ${gpa}, ${year}, ${major}, ${citizenship},
        ${JSON.stringify(background_categories || [])}, 
        ${email_consent || false}, 
        ${sms_consent || false}
      )
      RETURNING id, email, name, tier, created_at
    `;
    
    const user = result[0];
    
    // Log consent if given
    if (email_consent) {
      await sql`
        INSERT INTO consent_logs (user_id, consent_type, granted, timestamp)
        VALUES (${user.id}, 'email', true, NOW())
      `;
    }
    
    // Get matching scholarships
    const scholarshipMatches = await sql`
      SELECT s.*, 
        CASE 
          WHEN s.min_gpa <= ${gpa} THEN 50
          ELSE 0
        END +
        CASE 
          WHEN s.major = 'any' OR s.major ILIKE ${'%' + major + '%'} THEN 20
          ELSE 0
        END as score
      FROM scholarships s
      WHERE (s.min_gpa IS NULL OR s.min_gpa <= ${gpa})
        AND (s.citizenship IS NULL OR s.citizenship = 'any' OR s.citizenship = ${citizenship})
      ORDER BY score DESC, s.deadline ASC
      LIMIT 10
    `;
    
    // Save matches
    for (const sch of scholarshipMatches) {
      await sql`
        INSERT INTO matches (user_id, scholarship_id, score)
        VALUES (${user.id}, ${sch.id}, ${sch.score})
      `;
    }
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        user: { id: user.id, email: user.email, name: user.name },
        matches: scholarshipMatches.length,
        message: 'Welcome to ScholarMatch!'
      })
    };
    
  } catch (error) {
    console.error('Signup error:', error);
    
    if (error.code === '23505') {
      return { statusCode: 409, headers, body: JSON.stringify({ error: 'Email already registered' }) };
    }
    
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Server error' }) };
  }
};
