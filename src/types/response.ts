/**
 * Location and network data from Cloudflare's request.cf object
 * This is the single source of truth for location-related fields
 */
export interface LocationData {
  country: string | null;
  city: string | null;
  region: string | null;
  regionCode: string | null;
  latitude: string | null;
  longitude: string | null;
  postalCode: string | null;
  timezone: string | null;
  continent: string | null;
  asn: number | null;
  asOrganization: string | null;
}

/**
 * Response structure for IP address API
 */
export interface IpResponse extends LocationData {
  ip: string | null;
  timestamp: string;
}

/**
 * Error response structure
 */
export interface ErrorResponse {
  error: string;
  timestamp: string;
}
