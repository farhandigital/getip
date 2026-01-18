/**
 * Response structure for IP address API
 */
export interface IpResponse {
  ip: string | null;
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
  timestamp: string;
}

/**
 * Error response structure
 */
export interface ErrorResponse {
  error: string;
  timestamp: string;
}
