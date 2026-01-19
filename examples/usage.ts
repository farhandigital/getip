/**
 * Example: How to use the GetIP API
 * 
 * This file demonstrates various ways to call the API.
 * You can run this with: bun run examples/usage.ts
 */

import 'dotenv/config'
const _API_ENDPOINT = process.env.TEST_ENDPOINT_URL;

if (!_API_ENDPOINT) {
  throw new Error('TEST_ENDPOINT_URL is not defined');
}

// prevents tsc from complaining about possible undefined
const API_ENDPOINT = _API_ENDPOINT;

// Example 1: Default endpoint - IP + Location data (JSON)
async function defaultEndpointExample() {
  console.log('Example 1: GET / - IP + Location Data');
  console.log('======================================\n');

  try {
    const response = await fetch(API_ENDPOINT);
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
    console.log('\nNote: Includes IP, location (city, region, country, timezone), and ASN information');
  } catch (error) {
    console.error('Error:', error);
  }
  console.log('\n');
}

// Example 2: Simple endpoint - IP only (Plain text)
async function simpleEndpointExample() {
  console.log('Example 2: GET /simple - IP Only (Plain Text)');
  console.log('==============================================\n');

  try {
    const response = await fetch(`${API_ENDPOINT}/simple`);
    const text = await response.text();
    console.log('Status:', response.status);
    console.log('Content-Type:', response.headers.get('content-type'));
    console.log('Response:', text);
    console.log('\nNote: Perfect for shell scripts and simple integrations');
  } catch (error) {
    console.error('Error:', error);
  }
  console.log('\n');
}

// Example 3: Debug endpoint - Full request data
async function debugEndpointExample() {
  console.log('Example 3: GET /debug - Full Request Data');
  console.log('==========================================\n');

  try {
    const response = await fetch(`${API_ENDPOINT}/debug`);
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Response (truncated for readability):');
    console.log('Headers:', Object.keys(data.headers).slice(0, 5).join(', '), '...');
    console.log('CF Metadata:', data.cf ? 'Present' : 'Not available');
    console.log('\nNote: Full response contains all request headers and Cloudflare metadata');
  } catch (error) {
    console.error('Error:', error);
  }
  console.log('\n');
}

// Example 4: Error handling - Method not allowed
async function errorMethodExample() {
  console.log('Example 4: POST Request (405 Method Not Allowed)');
  console.log('=================================================\n');

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
    });
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
  console.log('\n');
}

// Example 5: Error handling - Path not found
async function errorPathExample() {
  console.log('Example 5: Invalid Path (404 Not Found)');
  console.log('========================================\n');

  try {
    const response = await fetch(`${API_ENDPOINT}/api/ip`);
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
    console.log('\nNote: Error message lists all available paths');
  } catch (error) {
    console.error('Error:', error);
  }
  console.log('\n');
}



// Run all examples
async function runExamples() {
  console.log('╔════════════════════════════════════╗');
  console.log('║   GetIP API - Usage Examples       ║');
  console.log('╚════════════════════════════════════╝\n');
  console.log(`Endpoint: ${API_ENDPOINT}\n`);
  console.log('----------------------------------------\n');

  await defaultEndpointExample();
  await simpleEndpointExample();
  await debugEndpointExample();
  await errorMethodExample();
  await errorPathExample();

  console.log('✓ All examples completed!');
}

// Execute if run directly
if (import.meta.main) {
  runExamples().catch(console.error);
}
