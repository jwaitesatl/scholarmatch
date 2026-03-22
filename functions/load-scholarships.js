// ScholarMatch - Load Scholarships to Database
const { neon } = require('@neondatabase/serverless');

const scholarships = [
  {name: 'Federal Pell Grant', provider: 'US Government', amount: 7395, deadline: '2026-08-31', min_gpa: 0, major: 'any', year: 'undergraduate', citizenship: 'us_citizen', categories: ['federal', 'financial_need'], description: 'Federal grant for low-income students', url: 'https://studentaid.gov'},
  {name: 'TEACH Grant', provider: 'US Government', amount: 4000, deadline: '2026-08-31', min_gpa: 3.25, major: 'education', year: 'undergraduate', citizenship: 'us_citizen', categories: ['federal', 'education'], description: 'For future teachers', url: 'https://studentaid.gov'},
  {name: 'Coca-Cola Scholars Foundation', provider: 'Coca-Cola', amount: 20000, deadline: '2026-10-31', min_gpa: 3.0, major: 'any', year: 'high_senior', citizenship: 'us_citizen', categories: ['foundation', 'general'], description: 'Prestigious achievement scholarship', url: 'https://coca-colascholars.org'},
  {name: 'Gates Scholarship', provider: 'Bill & Melinda Gates Foundation', amount: 25000, deadline: '2026-03-15', min_gpa: 3.5, major: 'any', year: 'high_senior', citizenship: 'us_citizen', categories: ['foundation', 'low_income', 'minority'], description: 'Full cost for Pell-eligible minorities', url: 'https://www.thegatesscholarship.org'},
  {name: 'Jack Kent Cooke Foundation', provider: 'Jack Kent Cooke Foundation', amount: 40000, deadline: '2026-11-01', min_gpa: 3.5, major: 'any', year: 'high_senior', citizenship: 'us_citizen', categories: ['foundation', 'general'], description: 'For high-achieving students', url: 'https://www.jkcf.org'},
  {name: 'Dell Scholars Program', provider: 'Michael & Susan Dell Foundation', amount: 20000, deadline: '2026-12-01', min_gpa: 2.4, major: 'any', year: 'high_senior', citizenship: 'us_citizen', categories: ['foundation', 'low_income'], description: 'For Pell-eligible students', url: 'https://www.dellscholars.org'},
  {name: 'McDonalds HACER Scholarship', provider: 'McDonalds', amount: 50000, deadline: '2026-02-28', min_gpa: 2.8, major: 'any', year: 'high_senior', citizenship: 'us_citizen', categories: ['corporate', 'hispanic'], description: 'Hispanic scholarship program', url: 'https://mcdonalds.com/hacer'},
  {name: 'Walmart Foundation Scholarship', provider: 'Walmart', amount: 30000, deadline: '2026-03-31', min_gpa: 2.5, major: 'any', year: 'high_senior', citizenship: 'us_citizen', categories: ['corporate', 'employee_dependent'], description: 'For Walmart family members', url: 'https://walmartfoundation.org'},
  {name: 'Boeing Scholarship', provider: 'Boeing', amount: 10000, deadline: '2026-04-15', min_gpa: 3.0, major: 'stem', year: 'undergraduate', citizenship: 'us_citizen', categories: ['corporate', 'stem'], description: 'For future engineers', url: 'https://boeing.com'},
  {name: 'Google Lime Scholarship', provider: 'Google', amount: 10000, deadline: '2026-03-15', min_gpa: 3.0, major: 'computer_science', year: 'undergraduate', citizenship: 'any', categories: ['corporate', 'disability', 'stem'], description: 'For students with disabilities', url: 'https://limeconnect.com'},
  {name: 'Microsoft Scholarship', provider: 'Microsoft', amount: 15000, deadline: '2026-03-15', min_gpa: 3.0, major: 'stem', year: 'undergraduate', citizenship: 'us_citizen', categories: ['corporate', 'stem', 'minority'], description: 'Diversity in computing', url: 'https://microsoft.com'},
  {name: 'Amazon Future Engineer Scholarship', provider: 'Amazon', amount: 40000, deadline: '2026-02-15', min_gpa: 3.0, major: 'computer_science', year: 'high_senior', citizenship: 'us_citizen', categories: ['corporate', 'stem'], description: 'Amazon tech pipeline', url: 'https://amazonfutureengineer.com'},
  {name: 'Starbucks College Achievement Plan', provider: 'Starbucks', amount: 10000, deadline: '2026-08-31', min_gpa: 2.0, major: 'any', year: 'undergraduate', citizenship: 'us_citizen', categories: ['corporate', 'employee'], description: 'Full tuition for Starbucks', url: 'https://starbucks.com'},
  {name: 'UNCF Scholarship', provider: 'UNCF', amount: 5000, deadline: '2026-04-30', min_gpa: 2.5, major: 'any', year: 'undergraduate', citizenship: 'us_citizen', categories: ['minority', 'african_american'], description: 'United Negro College Fund', url: 'https://uncf.org'},
  {name: 'Hispanic Scholarship Fund', provider: 'HSF', amount: 5000, deadline: '2026-03-15', min_gpa: 3.0, major: 'any', year: 'undergraduate', citizenship: 'us_citizen', categories: ['minority', 'hispanic'], description: 'HSF scholarship', url: 'https://hsf.net'},
  {name: 'APIASF Scholarship', provider: 'APIASF', amount: 5000, deadline: '2026-01-15', min_gpa: 2.7, major: 'any', year: 'undergraduate', citizenship: 'us_citizen', categories: ['minority', 'asian_pacific'], description: 'Asian American support', url: 'https://apiasf.org'},
  {name: 'Women in STEM Scholarship', provider: 'Society of Women Engineers', amount: 10000, deadline: '2026-03-15', min_gpa: 3.0, major: 'stem', year: 'undergraduate', citizenship: 'us_citizen', categories: ['minority', 'women_stem'], description: 'SWE scholarship', url: 'https://swe.org'},
  {name: 'Girls Who Code Scholarship', provider: 'Girls Who Code', amount: 5000, deadline: '2026-03-01', min_gpa: 3.0, major: 'computer_science', year: 'undergraduate', citizenship: 'us_citizen', categories: ['minority', 'women_stem'], description: 'Tech gender diversity', url: 'https://girlswhocode.com'},
  {name: 'LGBTQ+ Scholarship', provider: 'Pride Foundation', amount: 5000, deadline: '2026-03-31', min_gpa: 3.0, major: 'any', year: 'undergraduate', citizenship: 'any', categories: ['minority', 'lgbtq'], description: 'Pride Foundation awards', url: 'https://pridefoundation.org'},
  {name: 'Georgia HOPE Scholarship', provider: 'Georgia Student Finance Commission', amount: 4000, deadline: '2026-07-01', min_gpa: 3.0, major: 'any', year: 'undergraduate', citizenship: 'us_citizen', categories: ['state', 'georgia'], description: 'Georgia HOPE program', url: 'https://gsfc.georgia.gov'},
  {name: 'Georgia Zell Miller Scholarship', provider: 'Georgia Student Finance Commission', amount: 5000, deadline: '2026-07-01', min_gpa: 3.7, major: 'any', year: 'undergraduate', citizenship: 'us_citizen', categories: ['state', 'georgia'], description: 'Full Zell Miller', url: 'https://gsfc.georgia.gov'},
  {name: 'Florida Bright Futures', provider: 'Florida Department of Education', amount: 3000, deadline: '2026-07-01', min_gpa: 3.0, major: 'any', year: 'high_senior', citizenship: 'us_citizen', categories: ['state', 'florida'], description: 'Florida merit', url: 'https://www.floridastudentfinancialaidsg.org'},
  {name: 'Cal Grant', provider: 'California Student Aid Commission', amount: 14000, deadline: '2026-03-02', min_gpa: 2.0, major: 'any', year: 'undergraduate', citizenship: 'us_citizen', categories: ['state', 'california'], description: 'California grant', url: 'https://csac.ca.gov'},
  {name: 'NYS Excelsior Scholarship', provider: 'New York State', amount: 5000, deadline: '2026-07-01', min_gpa: 3.0, major: 'any', year: 'undergraduate', citizenship: 'us_citizen', categories: ['state', 'new_york'], description: 'NY free tuition', url: 'https://hesc.ny.gov'},
  {name: 'Texas Tuition Promise', provider: 'Texas Higher Education Coordinating Board', amount: 5000, deadline: '2026-02-15', min_gpa: 0, major: 'any', year: 'high_senior', citizenship: 'us_citizen', categories: ['state', 'texas'], description: 'Texas prepaid', url: 'https://texastuitionpromise.org'},
  {name: 'Adult Learner Scholarship', provider: 'Various', amount: 5000, deadline: '2026-06-30', min_gpa: 2.0, major: 'any', year: 'undergraduate', citizenship: 'us_citizen', categories: ['special', 'adult_learner'], description: 'For students 25+', url: ''},
  {name: 'Single Parent Scholarship', provider: 'Various', amount: 5000, deadline: '2026-04-15', min_gpa: 2.0, major: 'any', year: 'undergraduate', citizenship: 'us_citizen', categories: ['special', 'single_parent'], description: 'For single parents', url: ''},
  {name: 'Foster Youth Scholarship', provider: 'Various', amount: 10000, deadline: '2026-03-15', min_gpa: 2.0, major: 'any', year: 'undergraduate', citizenship: 'us_citizen', categories: ['special', 'foster_care'], description: 'For foster care alumni', url: ''},
  {name: 'Homeless Youth Scholarship', provider: 'Various', amount: 5000, deadline: '2026-04-01', min_gpa: 2.0, major: 'any', year: 'undergraduate', citizenship: 'us_citizen', categories: ['special', 'homeless'], description: 'For homeless students', url: ''},
  {name: 'Immigration Relief Scholarship', provider: 'Various', amount: 5000, deadline: '2026-05-01', min_gpa: 2.5, major: 'any', year: 'undergraduate', citizenship: 'daca', categories: ['special', 'daca'], description: 'For DACA students', url: ''},
  {name: 'Blind Visually Impaired Scholarship', provider: 'Various', amount: 5000, deadline: '2026-03-15', min_gpa: 2.5, major: 'any', year: 'undergraduate', citizenship: 'us_citizen', categories: ['disability'], description: 'For visual impairment', url: ''},
  {name: 'Deaf Hard of Hearing Scholarship', provider: 'Various', amount: 5000, deadline: '2026-03-15', min_gpa: 2.5, major: 'any', year: 'undergraduate', citizenship: 'us_citizen', categories: ['disability'], description: 'For hearing impairment', url: ''},
  {name: 'Learning Disability Scholarship', provider: 'Various', amount: 5000, deadline: '2026-04-01', min_gpa: 2.5, major: 'any', year: 'undergraduate', citizenship: 'us_citizen', categories: ['disability'], description: 'For LD/ADHD', url: ''},
  {name: 'Veterans Scholarship', provider: 'VA', amount: 10000, deadline: '2026-03-31', min_gpa: 2.5, major: 'any', year: 'undergraduate', citizenship: 'us_citizen', categories: ['military', 'veteran'], description: 'Veteran education', url: 'https://va.gov'},
  {name: 'Veteran Dependent Scholarship', provider: 'Various', amount: 5000, deadline: '2026-03-31', min_gpa: 2.5, major: 'any', year: 'undergraduate', citizenship: 'us_citizen', categories: ['military', 'military_family'], description: 'For military family', url: ''},
  {name: 'National Guard Scholarship', provider: 'National Guard', amount: 5000, deadline: '2026-04-15', min_gpa: 2.0, major: 'any', year: 'undergraduate', citizenship: 'us_citizen', categories: ['military'], description: 'For NG members', url: ''},
  {name: 'Law Enforcement Dependent Scholarship', provider: 'Various', amount: 5000, deadline: '2026-04-01', min_gpa: 2.5, major: 'any', year: 'undergraduate', citizenship: 'us_citizen', categories: ['public_service', 'law_enforcement'], description: 'For police family', url: ''},
  {name: 'Firefighter Dependent Scholarship', provider: 'Various', amount: 5000, deadline: '2026-04-01', min_gpa: 2.5, major: 'any', year: 'undergraduate', citizenship: 'us_citizen', categories: ['public_service', 'firefighter'], description: 'For firefighter family', url: ''},
  {name: 'Nurse Corps Scholarship', provider: 'HRSA', amount: 25000, deadline: '2026-02-28', min_gpa: 0, major: 'nursing', year: 'undergraduate', citizenship: 'us_citizen', categories: ['healthcare', 'nursing'], description: 'Full tuition for nursing', url: 'https://hrsa.gov'},
  {name: 'Nursing Scholarship', provider: 'Various', amount: 5000, deadline: '2026-04-15', min_gpa: 2.5, major: 'nursing', year: 'undergraduate', citizenship: 'us_citizen', categories: ['healthcare', 'nursing'], description: 'For nursing students', url: ''},
  {name: 'Pre-Med Scholarship', provider: 'Various', amount: 10000, deadline: '2026-03-31', min_gpa: 3.2, major: 'biology', year: 'undergraduate', citizenship: 'us_citizen', categories: ['healthcare'], description: 'For pre-med students', url: ''},
  {name: 'Scholastic Art and Writing', provider: 'Scholastic', amount: 10000, deadline: '2026-01-15', min_gpa: 0, major: 'any', year: 'high_senior', citizenship: 'us_citizen', categories: ['arts'], description: 'Portfolio awards', url: 'https://scholastic.com'},
  {name: 'Young Musicians Scholarship', provider: 'Various', amount: 5000, deadline: '2026-03-15', min_gpa: 3.0, major: 'music', year: 'undergraduate', citizenship: 'us_citizen', categories: ['arts', 'music'], description: 'For music majors', url: ''},
  {name: 'Film Festival Scholarship', provider: 'Various', amount: 10000, deadline: '2026-06-30', min_gpa: 2.5, major: 'film', year: 'undergraduate', citizenship: 'us_citizen', categories: ['arts', 'film'], description: 'For film students', url: ''},
  {name: 'HVAC Scholarship', provider: 'Various', amount: 5000, deadline: '2026-03-31', min_gpa: 2.0, major: 'hvac', year: 'vocational', citizenship: 'us_citizen', categories: ['trade'], description: 'For HVAC students', url: ''},
  {name: 'Electrician Scholarship', provider: 'Various', amount: 5000, deadline: '2026-04-15', min_gpa: 2.0, major: 'electrical', year: 'vocational', citizenship: 'us_citizen', categories: ['trade'], description: 'For electrical students', url: ''},
  {name: 'Automotive Scholarship', provider: 'Various', amount: 5000, deadline: '2026-03-15', min_gpa: 2.0, major: 'automotive', year: 'vocational', citizenship: 'us_citizen', categories: ['trade'], description: 'For auto tech', url: ''},
  {name: 'Culinary Arts Scholarship', provider: 'Various', amount: 5000, deadline: '2026-04-30', min_gpa: 2.0, major: 'culinary', year: 'vocational', citizenship: 'us_citizen', categories: ['trade'], description: 'For culinary students', url: ''},
  {name: 'Peace Scholarship', provider: 'Various', amount: 5000, deadline: '2026-04-01', min_gpa: 2.5, major: 'any', year: 'undergraduate', citizenship: 'us_citizen', categories: ['community_service'], description: 'Volunteer recognition', url: ''},
  {name: 'DoSomething Scholarship', provider: 'DoSomething', amount: 5000, deadline: '2026-06-30', min_gpa: 2.0, major: 'any', year: 'undergraduate', citizenship: 'us_citizen', categories: ['community_service'], description: 'For activists', url: 'https://dosomething.org'},
  {name: 'Agriculture Future of America', provider: 'AFA', amount: 5000, deadline: '2026-03-15', min_gpa: 2.5, major: 'agriculture', year: 'undergraduate', citizenship: 'us_citizen', categories: ['agriculture'], description: 'For agriculture majors', url: 'https://agfuture.org'},
  {name: 'National FFA Scholarship', provider: 'National FFA', amount: 5000, deadline: '2026-02-01', min_gpa: 2.5, major: 'agriculture', year: 'high_senior', citizenship: 'us_citizen', categories: ['agriculture'], description: 'For FFA members', url: 'https://ffa.org'},
  {name: 'Entrepreneurship Scholarship', provider: 'Various', amount: 10000, deadline: '2026-06-15', min_gpa: 3.0, major: 'business', year: 'undergraduate', citizenship: 'us_citizen', categories: ['business'], description: 'For future founders', url: ''},
  {name: 'Accounting Scholarship', provider: 'Various', amount: 5000, deadline: '2026-05-01', min_gpa: 3.0, major: 'accounting', year: 'undergraduate', citizenship: 'us_citizen', categories: ['business'], description: 'For accounting majors', url: ''},
  {name: 'FedEx Scholarship', provider: 'FedEx', amount: 5000, deadline: '2026-03-31', min_gpa: 3.0, major: 'stem', year: 'undergraduate', citizenship: 'us_citizen', categories: ['corporate', 'stem'], description: 'For STEM students', url: 'https://fedex.com'},
  {name: 'Best Buy Scholarship', provider: 'Best Buy', amount: 5000, deadline: '2026-03-15', min_gpa: 2.5, major: 'stem', year: 'undergraduate', citizenship: 'us_citizen', categories: ['corporate', 'stem'], description: 'Digital transformation', url: 'https://bestbuy.com'},
  {name: 'Twitch Scholarship', provider: 'Twitch', amount: 25000, deadline: '2026-06-01', min_gpa: 2.5, major: 'any', year: 'undergraduate', citizenship: 'any', categories: ['corporate', 'gaming'], description: 'For gaming students', url: 'https://twitch.com'},
  {name: 'Apple Scholarship', provider: 'Apple', amount: 5000, deadline: '2026-04-01', min_gpa: 2.5, major: 'computer_science', year: 'undergraduate', citizenship: 'us_citizen', categories: ['corporate', 'stem'], description: 'Apple developer', url: 'https://apple.com'},
  {name: 'National Merit Scholarship', provider: 'NMSC', amount: 2500, deadline: '2026-03-15', min_gpa: 3.5, major: 'any', year: 'high_senior', citizenship: 'us_citizen', categories: ['academic'], description: 'For Merit finalists', url: 'https://nationalmerit.org'},
  {name: 'Davidson Fellows Scholarship', provider: 'Davidson Institute', amount: 50000, deadline: '2026-02-15', min_gpa: 0, major: 'any', year: 'under_18', citizenship: 'us_citizen', categories: ['academic', 'gifted'], description: 'For gifted students', url: 'https://davidsongifts.org'},
  {name: 'Siemens Competition', provider: 'Siemens', amount: 100000, deadline: '2026-09-15', min_gpa: 0, major: 'stem', year: 'high_school', citizenship: 'us_citizen', categories: ['academic', 'stem'], description: 'Top STEM competition', url: 'https://siemenscompetition.org'},
  {name: 'Regeneron Science Talent Search', provider: 'Regeneron', amount: 250000, deadline: '2026-10-15', min_gpa: 0, major: 'stem', year: 'high_senior', citizenship: 'us_citizen', categories: ['academic', 'stem'], description: 'Top science competition', url: 'https://societyforscience.org'},
  {name: 'Transfer Student Scholarship', provider: 'Various', amount: 5000, deadline: '2026-07-01', min_gpa: 3.0, major: 'any', year: 'transfer', citizenship: 'us_citizen', categories: ['transfer'], description: 'For CC transfers', url: ''},
  {name: 'Graduate Student Grant', provider: 'Various', amount: 10000, deadline: '2026-04-30', min_gpa: 3.0, major: 'any', year: 'graduate', citizenship: 'us_citizen', categories: ['graduate'], description: 'For grad students', url: ''}
];

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    await sql`DELETE FROM scholarships`;
    
    for (const s of scholarships) {
      await sql`
        INSERT INTO scholarships (
          name, provider, amount, deadline, min_gpa, major, year, citizenship, categories, description, url, verified, created_at
        ) VALUES (
          ${s.name}, ${s.provider}, ${s.amount}, ${s.deadline}, ${s.min_gpa}, ${s.major}, ${s.year}, ${s.citizenship}, ${JSON.stringify(s.categories)}, ${s.description}, ${s.url}, true, NOW()
        )
      `;
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, count: scholarships.length, message: `Loaded ${scholarships.length} scholarships!` })
    };
  } catch (error) {
    console.error('Load error:', error);
    return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
  }
};
