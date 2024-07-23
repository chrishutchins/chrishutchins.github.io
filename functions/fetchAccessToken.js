const axios = require('axios');

exports.handler = async (event, context) => {
  const { code } = JSON.parse(event.body);
  const clientId = 'pt8PQIzv9ECrXxWtnKEByZhyWZjOcmuDGmZDyxswQM0n4ij83k2jkk-6LA9Ztrcr';
  const clientSecret = '2yKYc3-J8tvlgBkajXqUDk3o-3RfZEI_DhJ3H31QCgKfIZBX_g1HT00Rj_XOeLlp';
  const redirectUri = 'https://chrishutchins.github.io/patreon-test.html';

  try {
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
    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

