---
description: Deploy the GetIP API to Cloudflare Workers
---

# Deploy GetIP API

This workflow guides you through deploying the GetIP API to Cloudflare Workers.

## Prerequisites

- Cloudflare account
- Logged in to Wrangler (Cloudflare Workers CLI)

## Steps

1. **Login to Cloudflare (if not already logged in)**
   ```bash
   bunx wrangler login
   ```
   This will open a browser window to authenticate with your Cloudflare account.

2. **Verify the project builds correctly**
   ```bash
   bunx tsc --noEmit
   ```
   Ensure there are no TypeScript errors.

3. **Deploy to Cloudflare Workers**
   // turbo
   ```bash
   bunx wrangler deploy
   ```
   This will build and deploy your Worker to Cloudflare's edge network.

4. **Test the deployed API**
   After deployment, Wrangler will show you the URL (typically `https://getip.<your-subdomain>.workers.dev`).
   
   Test it with:
   ```bash
   curl https://getip.<your-subdomain>.workers.dev
   ```

## Expected Output

You should see a JSON response like:
```json
{
  "ip": "your.ip.address.here",
  "timestamp": "2026-01-11T04:32:38.000Z"
}
```

## Custom Domain (Optional)

To use a custom domain:

1. In Cloudflare Dashboard, go to Workers & Pages > Your Worker > Settings > Triggers
2. Add a custom domain or route
3. Update DNS records as instructed

## Troubleshooting

- If deployment fails, check your Cloudflare account permissions
- Ensure you've selected the correct account if you have multiple
- Check Wrangler logs for specific error messages
