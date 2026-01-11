# GetIP - Simple IP Address API

A simple, robust API that returns the IP address of anyone who sends a GET request to the root domain. Built with TypeScript and deployed on Cloudflare Workers.

## Features

- ✅ **Simple & Robust**: No third-party dependencies
- ✅ **Strongly Typed**: Written in TypeScript with strict type checking
- ✅ **Fast**: Runs on Cloudflare's edge network
- ✅ **CORS Enabled**: Can be called from any origin
- ✅ **Standards Compliant**: Follows Cloudflare Workers best practices

## API Response

### Success Response (200 OK)

```json
{
  "ip": "203.0.113.42",
  "timestamp": "2026-01-11T04:32:38.000Z"
}
```

### Error Response (405 Method Not Allowed)

```json
{
  "error": "Method not allowed. Only GET requests are supported.",
  "timestamp": "2026-01-11T04:32:38.000Z"
}
```

### Error Response (404 Not Found)

```json
{
  "error": "Not found. Only root path (/) is available.",
  "timestamp": "2026-01-11T04:32:38.000Z"
}
```

## How It Works

The API extracts the client IP address from the request headers in the following priority order:

1. **CF-Connecting-IP** - Cloudflare's reliable client IP header (primary)
2. **X-Real-IP** - Common proxy header (fallback)
3. **X-Forwarded-For** - Standard proxy header (last resort)

## Development

### Prerequisites

- [Bun](https://bun.sh) installed
- Cloudflare account (for deployment)

### Installation

```bash
bun install
```

### Type Checking

```bash
bunx tsc --noEmit
```

### Local Development

```bash
bunx wrangler dev
```

This will start a local development server. Note that during local development, the IP address might be `127.0.0.1` or a local network IP.

### Deployment

```bash
bunx wrangler deploy
```

## Project Structure

```
getip/
├── src/
│   └── index.ts          # Main Worker code
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── wrangler.toml         # Cloudflare Workers configuration
└── README.md             # This file
```

## Technical Details

- **Runtime**: Cloudflare Workers (V8 isolates)
- **Language**: TypeScript with strict type checking
- **Package Manager**: Bun
- **Deployment**: Cloudflare Workers
- **No third-party libraries**: Uses only Web Standards APIs

## Security & Privacy

- The API does not store or log IP addresses
- CORS is enabled for all origins
- Responses are not cached to ensure real-time data
- Only GET requests to the root path are allowed

## License

MIT
