const axios = require('axios');

exports.handler = async (event, context) => {
  const { accessToken } = JSON.parse(event.body);

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: ''
    };
  }

  try {
    const response = await axios.get('https://www.patreon.com/api/oauth2/v2/identity?include=memberships&fields%5Buser%5D=full_name,vanity&fields%5Bmember%5D=currently_entitled_amount_cents', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ error: error.message })
    };
  }
};
