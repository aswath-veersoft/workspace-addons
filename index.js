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
app.use(express.json());

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

app.post('/checkExistingClient', async (req, res) => {
  const { email, token } = req.body;

  const query = `
query {
  clients(first: 1, searchTerm: "${email}") {
    edges {
      node {
        id
        firstName
        lastName
        companyName
        jobs(first: 20) {
          edges {
            node {
              id
              title
              jobType
              jobNumber
              jobStatus
              jobberWebUri
            }
          }
        }
        clientProperties {
          nodes {
            id
            address {
              street
              city
              province
              country
              postalCode
            }
          }
        }
        requests(first: 10) {
          edges {
            node {
              id
              title
              requestStatus
              jobberWebUri
            }
          }
        }
      }
    }
  }
}`;

  try {
    const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.graphql}`, {
      method: 'POST',
      headers: {
        'X-JOBBER-GRAPHQL-VERSION': '2025-01-20',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query }),
      redirect: 'follow',
      follow: 20
    });

    if (!response.ok) {
      throw new Error(`Failed to check client: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('data:', data);
    // Check if we have any clients in the response
    const clientEdge = data?.data?.clients?.edges?.[0];
    if (!clientEdge) {
      return res.status(200).json({ exists: false });
    }

    const client = clientEdge.node;
    
    // Send back the matched client with proper null checks
    return res.status(200).json({
      exists: true,
      client: {
        id: client.id,
        firstName: client.firstName || '',
        lastName: client.lastName || '',
        email: client.emails?.nodes?.[0]?.address || '',
        address: client.clientProperties?.nodes?.[0]?.address || {},
        jobs: client.jobs?.edges?.map(edge => edge.node) || [],
        properties: client.clientProperties?.nodes?.map(prop => ({
          id: prop.id,
          address: prop.address || {}
        })) || [],
        requests: client.requests?.edges?.map(edge => edge.node) || []
      }
    });
  } catch (error) {
    console.error('Error checking client:', error);
    return res.status(500).json({ error: 'Failed to check client', details: error.message });
  }
});

app.post('/newclient', async (req, res) => {
  app.use(express.json());
  console.log("REQ BODY:", req.body);
  console.log("REQ QUERY:", req.query);
  const { gmail, firstName, lastName, email, company, companyPhone, token } = req.body;

  console.log({ gmail, firstName, lastName, email, company, companyPhone, token });
  if (!token) {
    return res.status(401).json({ error: 'Not authenticated. Please login first.' });
  }
  const query = `
  mutation {
    clientCreate(
      input: {
        firstName: "${firstName.replace(/"/g, '\\"')}"
        lastName: "${lastName.replace(/"/g, '\\"')}"
        companyName: "${company.replace(/"/g, '\\"')}"
      phones: [
          { description: MAIN, primary: true, number: "${companyPhone.replace(/"/g, '\\"')}" }
        ]
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
      body: JSON.stringify({ query }),
      redirect: 'follow',
      follow: 20
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

app.post('/create-property', async (req, res) => {
  const { address, token, clientId } = req.body;
  console.log({ address, token, clientId });

  if (!address || !token || !clientId) {
    return res.status(401).json({ 
      error: 'Missing required fields', 
      details: 'Authentication token, address, and clientId are required.' 
    });
  }

  // Simplified mutation without variables
  const query = `
  mutation {
    propertyCreate(
      clientId: "${clientId}",
      input: {
        properties: [{
          address: {
            street1: "${address.street1 || ''}"
            street2: "${address.street2 || ''}"
            city: "${address.city || ''}"
            province: "${address.province || ''}"
            country: "${address.country || ''}"
            postalCode: "${address.postalCode || ''}"
          }
        }]
      }
    ) {
      properties {
        id
        address {
          street1
          street2
          city
          province
          country
          postalCode
        }
        client {
          id
          firstName
          lastName
        }
        jobberWebUri
        routingOrder
      }
      userErrors {
        message
        path
      }
    }
  }`;

  try {
    const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.graphql}`, {
      method: 'POST',
      headers: {
        'X-JOBBER-GRAPHQL-VERSION': '2025-01-20',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to create property: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Full Response:', data);
    
    if (data.errors) {
      console.error('GraphQL Errors:', data.errors);
      return res.status(400).json({ 
        error: 'Failed to create property', 
        details: data.errors 
      });
    }

    if (data.data.propertyCreate.userErrors?.length > 0) {
      return res.status(400).json({
        error: 'Validation errors occurred',
        details: data.data.propertyCreate.userErrors
      });
    }
    
    console.log('Properties created:', data.data.propertyCreate.properties);
    return res.status(200).json({
      success: true,
      properties: data.data.propertyCreate.properties
    });

  } catch (error) {
    console.error('Error creating property:', error);
    return res.status(500).json({ 
      error: 'Failed to create property', 
      details: error.message 
    });
  }
});

// Add a new endpoint to get property details
app.get('/property/:propertyId', async (req, res) => {
  const { propertyId } = req.params;
  const { token } = req.query;

  if (!token || !propertyId) {
    return res.status(401).json({ 
      error: 'Missing required fields', 
      details: 'Authentication token and propertyId are required.' 
    });
  }

  const query = `
  query GetProperty($propertyId: ID!) {
    property(id: $propertyId) {
      id
      address {
        street1
        street2
        city
        province
        country
        postalCode
      }
      client {
        id
        firstName
        lastName
      }
      isBillingAddress
      jobberWebUri
      jobs(first: 10) {
        edges {
          node {
            id
            title
            jobStatus
          }
        }
      }
      quotes(first: 10) {
        edges {
          node {
            id
            title
            status
          }
        }
      }
      requests(first: 10) {
        edges {
          node {
            id
            title
            status
          }
        }
      }
      routingOrder
      taxRate {
        id
        name
        rate
      }
    }
  }`;

  const variables = {
    propertyId
  };

  try {
    const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.graphql}`, {
      method: 'POST',
      headers: {
        'X-JOBBER-GRAPHQL-VERSION': '2025-01-20',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        variables
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch property: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.errors) {
      return res.status(400).json({ 
        error: 'Failed to fetch property', 
        details: data.errors 
      });
    }

    return res.status(200).json({
      success: true,
      property: data.data.property
    });

  } catch (error) {
    console.error('Error fetching property:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch property', 
      details: error.message 
    });
  }
});

app.post('/create-job', async (req, res) => {
  const { 
    jobTitle,
    jobDescription,
    propertyId,
    token
  } = req.body;
  console.log('Job Creation Request:', req.body);

  if (!jobTitle || !propertyId || !token) {
    return res.status(401).json({ 
      error: 'Missing required fields', 
      details: 'Authentication token, job title, and propertyId are required.' 
    });
  }

  try {

    const query = `
    mutation {
      jobCreate(
        input: {
          title: "${jobTitle}",
          propertyId: "${propertyId}",
          instructions: "${jobDescription}",
          invoicing: {
            invoicingSchedule: ON_COMPLETION
            invoicingType: VISIT_BASED
          },
          scheduling: {
            createVisits: false
            visitConfirmationStatus: false
            notifyTeam: false
          }
        }
      ) {
        job {
          id
          title
          jobNumber
          jobStatus
          instructions
          jobberWebUri
          createdAt
        }
        userErrors {
          message
          path
        }
      }
    }
  `;
  


    const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.graphql}`, {
      method: 'POST',
      headers: {
        'X-JOBBER-GRAPHQL-VERSION': '2025-01-20',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to create job: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Job Creation Response:', data);
    
    if (data.errors) {
      console.error('GraphQL Errors:', data.errors);
      return res.status(400).json({ 
        error: 'Failed to create job', 
        details: data.errors 
      });
    }

    if (data.data.jobCreate.userErrors?.length > 0) {
      return res.status(400).json({
        error: 'Validation errors occurred',
        details: data.data.jobCreate.userErrors
      });
    }

    return res.status(200).json({
      success: true,
      job: data.data.jobCreate.job
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: 'Failed to create job', 
      details: error.message 
    });
  }
});

app.post('/create-request', async (req, res) => {
  const { 
    requestTitle,
    clientId,
    token
  } = req.body;
  console.log('Request Creation Request:', req.body);

  if (!requestTitle  || !token) {
    return res.status(401).json({ 
      error: 'Missing required fields', 
      details: 'Authentication token, request title, and clientId are required.' 
    });
  }

  try {
    const query = `
    mutation {
      requestCreate(
        input: {
          clientId: "${clientId}",
          title: "${requestTitle}"
        }
      ) {
        request {
          id
          title
          client {
            id
            name
          }
          createdAt
        }
        userErrors {
          message
        }
      }
    }
    `;



    const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.graphql}`, {
      method: 'POST',
      headers: {
        'X-JOBBER-GRAPHQL-VERSION': '2025-01-20',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to create request: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Request Creation Response:', JSON.stringify(data, null, 2));
    
    if (data.errors) {
      console.error('GraphQL Errors:', data.errors);
      return res.status(400).json({ 
        error: 'Failed to create request', 
        details: data.errors 
      });
    }

    if (data.data.requestCreate.userErrors?.length > 0) {
      return res.status(400).json({
        error: 'Validation errors occurred',
        details: data.data.requestCreate.userErrors
      });
    }

    return res.status(200).json({
      success: true,
      request: data.data.requestCreate.request
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: 'Failed to create request', 
      details: error.message 
    });
  }
});


// Start the server
app.listen(port, (err) => {
  if (err) return console.error(err);
  console.log(`Express server listening at http://localhost:${port}`);
});
