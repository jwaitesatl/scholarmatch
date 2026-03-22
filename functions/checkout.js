// ScholarMatch - Stripe Checkout API
// Netlify Function

const { neon } = require('@neondatabase/serverless');
const stripe = require('stripe');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const data = JSON.parse(event.body);
    const { tier, email, userId } = data;

    // Define prices for each tier
    const prices = {
      premium: {
        priceId: 'price_1TDbJTEuOht0SBkLkXLfhjt3', // $9.99/month
        name: 'ScholarMatch Premium',
        description: 'Unlimited scholarship matches + email alerts'
      },
      complete: {
        priceId: 'price_1TDbKFEuOht0SBkLW1WNr0Nu', // $49.99/month
        name: 'ScholarMatch Complete',
        description: 'Everything in Premium + essay review + 1-on-1 coaching'
      }
    };

    const selectedTier = prices[tier];
    if (!selectedTier) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid tier' }) };
    }

    // Create Stripe checkout session
    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: selectedTier.priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.URL || 'https://scholarmatch.io'}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.URL || 'https://scholarmatch.io'}/cancel.html`,
      customer_email: email,
      metadata: {
        userId: userId || '',
        tier: tier
      }
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        sessionId: session.id,
        url: session.url 
      })
    };

  } catch (error) {
    console.error('Checkout error:', error);
    return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
  }
};
