'use strict';

const express = require('express');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { createClient } = require('@supabase/supabase-js');

const CLIENT_ID = process.env.CLIENT_ID || '7654ba07-61c8-4305-8f23-aac9090a7b76';
const CLIENT_SECRET = process.env.CLIENT_SECRET || '33735ef23e7b514af0676ffd70c64e9799477c0615ba6cd392f450e38ed69457';

// API Configuration
const API_CONFIG = {
  baseUrl: 'https://api.getjobber.com',
  endpoints: {
    authorize: '/api/oauth/authorize',
    token: '/api/oauth/token',
    graphql: '/api/graphql'
  }
};

// Store tokens in memory (in production, use a proper storage solution)
let storedTokens = null;
const sessions = {};

const port = 3000;
const callbackUrl = 'https://qeo63u-ip-122-171-23-179.tunnelmole.net/callback';

const supabaseUrl = 'https://wakfztmwsvrrswxublvw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indha2Z6dG13c3ZycnN3eHVibHZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyOTA5NDMsImV4cCI6MjA1Mzg2Njk0M30.cl9I1g6rCg94woWSfa5RN7WZtAPb65vTw7VQLEQE6sI';
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize Express app
const app = express();

// Initial page redirecting to GetJobber
app.get('/auth', (req, res) => {
  const gmail = req.query.gmail;
  const authUrl = new URL(API_CONFIG.endpoints.authorize, API_CONFIG.baseUrl);
  authUrl.searchParams.append('response_type', 'code');
  authUrl.searchParams.append('client_id', CLIENT_ID);
  authUrl.searchParams.append('redirect_uri', `${callbackUrl}`);
  authUrl.searchParams.append('scope', 'notifications');
  authUrl.searchParams.append('state', encodeURIComponent(gmail));

  console.log('Authorization URL:', authUrl.toString());
  res.redirect(authUrl.toString());
});

// Callback service parsing the authorization token and asking for the access token
app.get('/callback', async (req, res) => {
  const { code, state: gmail } = req.query;
  const decodedGmail = decodeURIComponent(gmail);
  try {
    const tokenResponse = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: `${callbackUrl}`,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
      })
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error('Token Error Response:', errorData);
      throw new Error(`Token request failed with status ${tokenResponse.status}`);
    }

    const tokenData = await tokenResponse.json();
    // Store in session
    sessions[decodedGmail] = tokenData.access_token;
    // Store the tokens - only include properties that exist in the response
    storedTokens = {
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token
    };

    console.log('Access Token:', storedTokens.access_token);
    console.log('Refresh Token:', storedTokens.refresh_token);

    await saveToken('getjobber', decodedGmail, storedTokens.access_token, 'active');

    console.log('session:', sessions);
    res.send(`
      <html>
        <body style="font-family:sans-serif;text-align:center;margin-top:40px;">
          <p>Login successful. You can close this window.</p>
          <script>
            setTimeout(() => window.close(), 1000);
          </script>
        </body>
      </html>
    `);
  } catch (error) {
    console.error('GetJobber Auth Failed:', error.message);
    res.status(500).send('Authentication failed.');
  }
});

// New endpoint to fetch clients using GraphQL
app.get('/clients', async (req, res) => {
  const gmail = req.query.gmail;
  const token = req.query.token;
  if (!token) {
    return res.status(401).json({ error: 'Not authenticated. Please login first.' });
  }

  // Simpler query to test basic connectivity
  const query = `
    query {
      clients {
        nodes {
          id
          firstName
          lastName
          billingAddress {
            city
          }
      }
    totalCount
  }
    }
  `;

  try {
    console.log('Making GraphQL request with token:', token.substring(0, 10) + '...');

    const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.graphql}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Authorization': `Bearer ${token}`,
        'X-JOBBER-GRAPHQL-VERSION': '2025-01-20'
      },
      body: JSON.stringify({ query }),
    });

    console.log('Request URL:', `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.graphql}`);
    console.log('Request body:', JSON.stringify({ query }));

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers.raw());
    const responseText = await response.text();
    console.log('Raw response:', responseText);

    // Check if the response indicates an authentication error
    if (response.status === 401) {
      return res.status(401).json({
        error: 'Authentication failed',
        details: 'The access token may be invalid or expired. Please try re-authenticating.'
      });
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse JSON response:', e);
      return res.status(500).json({
        error: 'Failed to parse API response',
        details: responseText,
        status: response.status,
        headers: response.headers.raw()
      });
    }

    if (data.errors) {
      console.error('GraphQL Errors:', data.errors);
      return res.status(400).json({ errors: data.errors });
    }

    if (!data.data) {
      console.error('Unexpected response structure:', data);
      return res.status(500).json({ error: 'Unexpected response structure from API' });
    }

    return res.status(200).json(data.data);
  } catch (error) {
    console.error('Error fetching account:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
    }
    return res.status(500).json({
      error: 'Failed to fetch account data',
      details: error.message,
      stack: error.stack
    });
  }
});

app.get('/settoken', async (req, res) => {
  const email = req.query.email;
  const provider = 'getjobber';
  const status = 'active';
  const token = req.query.token;
    const { data, error } = await supabase
        .from('tokens')
        .insert([
            { provider, email, token, status, created_at: new Date().toISOString() }
        ]);
    if (error) {
        console.error('Error saving token:', error);
    } else {
        console.log('Token saved successfully:', data);
    }
    res.json({ success: true });
});

app.get('/newclient', async (req, res) => {
  const gmail = req.query.gmail;
  const name = req.query.name;
  const email = req.query.email;
  const companyName = req.query.company;
  const token = req.query.token;
  console.log('@newclient/Token:', token);
  if (!token) {
    return res.status(401).json({ error: 'Not authenticated. Please login first.' });
  }
  const [firstName, lastName = ""] = name.split(' '); // Default lastName to an empty string if undefined
  const query = `
  mutation {
    clientCreate(
      input: {
        firstName: "${firstName.replace(/"/g, '\\"')}"
        lastName: "${lastName.replace(/"/g, '\\"')}"
        companyName: "${companyName.replace(/"/g, '\\"')}"
        emails: [
          { description: MAIN, primary: true, address: "${email.replace(/"/g, '\\"')}" }
        ]
      }
    ) {
      client {
        id
        firstName
        lastName
      }
      userErrors {
        message
        path
      }
    }
  }
`;

  try {
    const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.graphql}`, {
      method: 'POST',
      headers: {
        'X-JOBBER-GRAPHQL-VERSION': '2025-01-20',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    });

    if (!response.ok) {
      throw new Error(`Failed to create client: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Full Response:', data);
    
    if (data.errors) {
      console.error('GraphQL Errors:', data.errors);
      return res.status(500).json({ error: 'Failed to create client', details: data.errors });
    }
    
    console.log('Client created:', data.data.clientCreate);
    return res.status(200).json(data.data.clientCreate);
  } catch (error) {
    console.error('Error creating client:', error);
    return res.status(500).json({ error: 'Failed to create client', details: error.message });
  }
});


app.get('/status', async (req, res) => {
  const gmail = req.query.gmail;
  const token = sessions[decodeURIComponent(gmail)];
console.log('@status/Token:', token);

  if (!token) {
    return res.json({ loggedIn: false });
  }

  try {
    const repoRes = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.graphql}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Authorization': `Bearer ${token}`,
        'X-JOBBER-GRAPHQL-VERSION': '2025-01-20'
      },
      body: JSON.stringify({
        query: `
          query {
            clients {
              nodes {
                id
                firstName
                lastName
                billingAddress {
                  city
                }
              }
              totalCount
            }
          }
        `
      })
    });
    const clients = await repoRes.json();
    console.log('Clients:', clients);
    const names = clients.data.clients;
    console.log('Names:', names);
    console.log('totalCount:', clients.data.clients.totalCount);
    res.json({ loggedIn: true, clients: names, totalCount: clients.data.clients.totalCount });
  } catch (e) {
    console.error('Repo fetch error', e);
    res.json({ loggedIn: false });
  }
});

// Start the server
app.listen(port, (err) => {
  if (err) return console.error(err);
  console.log(`Express server listening at http://localhost:${port}`);
});
