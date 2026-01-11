/**
 * API Configuration
 * Single source of truth for API endpoints
 */

export const API_CONFIG = {
  /**
   * Local development endpoint
   * Used when running `bunx wrangler dev --port 8787`
   */
  LOCAL: 'http://localhost:8787',

  /**
   * Production endpoint
   * Deployed on Cloudflare Workers
   */
  PROD: 'https://getip.my.id',

  /**
   * Default endpoint (production)
   * Change this to switch between environments
   */
  get DEFAULT() {
    return this.PROD;
  },
} as const;

/**
 * Get the API endpoint based on environment
 * @param env - 'local' | 'prod' | 'default'
 * @returns The API endpoint URL
 */
export function getApiEndpoint(env: 'local' | 'prod' | 'default' = 'default'): string {
  switch (env) {
    case 'local':
      return API_CONFIG.LOCAL;
    case 'prod':
      return API_CONFIG.PROD;
    case 'default':
      return API_CONFIG.DEFAULT;
    default:
      return API_CONFIG.DEFAULT;
  }
}
