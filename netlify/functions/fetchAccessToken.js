const axios = require('axios');

exports.handler = async (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  try {
    const { code } = JSON.parse(event.body);
    const clientId = 'pt8PQIzv9ECrXxWtnKEByZhyWZjOcmuDGmZDyxswQM0n4ij83k2jkk-6LA9Ztrcr';
    const clientSecret = process.env.PATREON_CLIENT_SECRET; // Use environment variable
    const redirectUri = 'https://www.allthehacks.com/p/patreon-redirect/';

    console.log('Code received:', code);
    console.log('Client Secret:', clientSecret ? 'Retrieved successfully' : 'Not found');
    
    if (!clientSecret) {
      throw new Error('Client Secret not found in environment variables');
    }

    const response = await axios.post('https://www.patreon.com/api/oauth2/token', new URLSearchParams({
      'grant_type': 'authorization_code',
      'code': code,
      'client_id': clientId,
      'client_secret': clientSecret,
      'redirect_uri': redirectUri
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    console.log('Access token response:', response.data);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error('Error fetching access token:', error.response ? error.response.data : error.message);

    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ error: error.response ? error.response.data : error.message })
    };
  }
};
