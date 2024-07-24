document.addEventListener("DOMContentLoaded", function() {
  const clientId = 'pt8PQIzv9ECrXxWtnKEByZhyWZjOcmuDGmZDyxswQM0n4ij83k2jkk-6LA9Ztrcr';
  const redirectUri = 'https://chrishutchins.github.io/patreon-redirect.html';
  const scopes = 'identity identity.memberships';
  const nonSubscriberContent = `
    <p>This content is for subscribers only.</p>
    <button id="login-button">Login</button>
  `;

  const TOKEN_EXPIRY_DAYS = 30; // Set token expiry to 30 days

  // Simulate token expiry for testing purposes
  const simulateExpiry = false; // Set to true to simulate expiry
  if (simulateExpiry) {
    const fakePastDate = new Date();
    fakePastDate.setDate(fakePastDate.getDate() - 31); // Set date to 31 days in the past
    localStorage.setItem('patreonTokenTimestamp', fakePastDate.getTime().toString());
  }

  // Function to check if user is authenticated with Patreon
  async function isAuthenticatedWithPatreon() {
    const accessToken = localStorage.getItem('patreonAccessToken');
    const tokenTimestamp = localStorage.getItem('patreonTokenTimestamp');
    
    if (!accessToken || !tokenTimestamp) {
      return false;
    }

    const currentTime = new Date().getTime();
    const tokenAge = currentTime - parseInt(tokenTimestamp, 10);

    // Check if token is older than 30 days
    if (tokenAge > TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000) {
      localStorage.removeItem('patreonAccessToken');
      localStorage.removeItem('patreonTokenTimestamp');
      return false;
    }

    try {
      const response = await fetch('https://athpatreon.netlify.app/.netlify/functions/fetchPatreonData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ accessToken })
      });
      if (!response.ok) {
        throw new Error('Failed to fetch Patreon data');
      }
      const data = await response.json();
      const memberships = data.included;
      return memberships && memberships.length > 0;
    } catch (error) {
      console.error('Error fetching Patreon data:', error);
      return false;
    }
  }

  // Function to replace transcript content with gated content
  async function gateContent() {
    var transcript = document.querySelector('[itemprop="transcript"]');
    if (transcript) {
      const isAuthenticated = await isAuthenticatedWithPatreon();
      if (isAuthenticated) {
        // User is authenticated, show the original content
        transcript.style.display = 'block';
      } else {
        // Store original content
        var originalContent = transcript.innerHTML;

        // Create the patreon-gate element
        var patreonGate = document.createElement('div');

        // Create and append the unavailable slot div
        var unavailableDiv = document.createElement('div');
        unavailableDiv.innerHTML = nonSubscriberContent;
        patreonGate.appendChild(unavailableDiv);

        // Replace the original content with the patreon-gate element
        transcript.style.display = 'none'; // Hide the original content
        transcript.parentNode.insertBefore(patreonGate, transcript);

        // Add event listener to the login button
        document.getElementById('login-button').addEventListener('click', startPatreonLogin);
      }
    } else {
      console.error('Transcript element not found');
    }
  }

  // Function to start Patreon login process
  function startPatreonLogin() {
    const currentPage = window.location.href;
    const patreonAuthUrl = `https://www.patreon.com/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&state=${encodeURIComponent(currentPage)}`;
    window.location.href = patreonAuthUrl;
  }

  // Function to handle OAuth redirect (to be used on the fixed redirect page)
  async function handleOAuthRedirect() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    if (code) {
      try {
        const response = await fetch('https://athpatreon.netlify.app/.netlify/functions/fetchAccessToken', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ code })
        });
        if (!response.ok) {
          throw new Error('Failed to fetch access token');
        }
        const data = await response.json();
        localStorage.setItem('patreonAccessToken', data.access_token);
        localStorage.setItem('patreonTokenTimestamp', new Date().getTime().toString());
        // Redirect to the original page
        window.location.href = decodeURIComponent(state) || redirectUri.split('?')[0];
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    }
  }

  // Execute handleOAuthRedirect to handle the OAuth redirect
  handleOAuthRedirect().then(gateContent);
});
