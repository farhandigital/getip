import { getClientIp, getCountry } from "./lib/getHeaders";
import { handleOptions, createJsonResponse } from "./lib/createResponse";
import { Env } from "./types/env";
import { IpResponse, ErrorResponse } from "./types/response";

/**
 * Main fetch handler for the Worker
 */
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return handleOptions();
    }

    // Only allow GET requests to root path
    if (request.method !== 'GET') {
      const errorResponse: ErrorResponse = {
        error: 'Method not allowed. Only GET requests are supported.',
        timestamp: new Date().toISOString(),
      };
      return createJsonResponse(errorResponse, 405);
    }

    // Only respond to root path
    if (url.pathname !== '/') {
      const errorResponse: ErrorResponse = {
        error: 'Not found. Only root path (/) is available.',
        timestamp: new Date().toISOString(),
      };
      return createJsonResponse(errorResponse, 404);
    }

    // Extract the client IP and country
    const ip = getClientIp(request);
    const country = getCountry(request);
    
    // Apply rate limiting based on IP address
    // Limit: 60 requests per minute per IP per Cloudflare location
    if (ip) {
      const { success } = await env.IP_RATE_LIMITER.limit({ key: ip });
      if (!success) {
        const errorResponse: ErrorResponse = {
          error: 'Rate limit exceeded. Maximum 60 requests per minute allowed.',
          timestamp: new Date().toISOString(),
        };
        return new Response(JSON.stringify(errorResponse, null, 2), {
          status: 429,
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Retry-After': '60',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
    }

    // Return the client IP
    const response: IpResponse = {
      ip,
      country,
      timestamp: new Date().toISOString(),
    };

    return createJsonResponse(response);
  },
} satisfies ExportedHandler<Env>;
