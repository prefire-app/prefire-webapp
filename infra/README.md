# CloudFront security headers

This folder contains the CloudFront Response Headers Policy that protects
`prefire.online` (distribution `E37O4COPWXGZVT`).

## Files

| File | Purpose |
|---|---|
| `cloudfront-response-headers-policy.json` | Policy body (CSP, HSTS, nosniff, frame-ancestors=none, Referrer-Policy, Permissions-Policy, COOP). |
| `apply-cloudfront-headers.sh` | Idempotent script that creates or updates the policy and attaches it to the distribution's default cache behavior. |

## Apply

bash
AWS_PROFILE=prefire-root ./infra/apply-cloudfront-headers.sh


Pass a different distribution id as `$1` if you ever move to a new
distribution.

## CSP allowlist (kept in sync with src/lib/constants.ts)

- `script-src 'self'` — no inline or remote scripts.
- `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com` — Tailwind + Vite inject inline styles at build time; cannot tighten without a hashing/nonce pipeline.
- `font-src 'self' https://fonts.gstatic.com data:` — IBM Plex Mono.
- `img-src` — Mapbox tiles, ArcGIS topo fallback, S3 PMTiles + NAIP, TIGERweb counties.
- `connect-src` — same hosts plus the API Gateway origin.
- `frame-ancestors 'none'` — disallow framing site-wide.

## Adding a new external host

1. Add the host to the appropriate directive in `cloudfront-response-headers-policy.json`.
2. Re-run `apply-cloudfront-headers.sh`. The script updates the policy in place — CloudFront takes ~5 min to roll out.
3. Verify with:

bash
curl -sI https://prefire.online | grep -iE 'content-security|strict-transport|x-content|x-frame|referrer'

