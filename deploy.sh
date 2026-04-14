#!/usr/bin/env bash
# deploy.sh — build and deploy to S3 + invalidate CloudFront cache
# Usage: ./deploy.sh [bucket-name] [cloudfront-distribution-id]
#
# Prerequisites:
#   - AWS CLI installed and configured (aws configure)
#   - .env.production file with VITE_API_URL set to your production backend
#   - S3 bucket already created and configured for static hosting
#   - (Optional) CloudFront distribution in front of the bucket

set -euo pipefail

BUCKET="${1:-prefire-webapp}"
CF_DIST="${2:-E37O4COPWXGZVT}"
AWS_PROFILE="${AWS_PROFILE:-prefire-root}"

echo "==> Building for production..."
npm run build

echo "==> Syncing to s3://$BUCKET ..."
aws s3 sync dist/assets s3://"$BUCKET"/assets \
  --cache-control "public, max-age=31536000, immutable" \
  --profile "$AWS_PROFILE" \
  --delete
  

aws s3 sync dist s3://"$BUCKET" \
  --exclude "assets/*" \
  --cache-control "public, max-age=0, must-revalidate" \
  --profile "$AWS_PROFILE" \
  --delete

echo "==> Configuring S3 bucket for SPA routing..."
aws s3api put-bucket-website \
  --bucket "$BUCKET" \
  --profile "$AWS_PROFILE" \
  --website-configuration '{
    "IndexDocument": {"Suffix": "index.html"},
    "ErrorDocument": {"Key": "index.html"}
  }'

if [[ -n "$CF_DIST" ]]; then
  echo "==> Invalidating CloudFront distribution $CF_DIST ..."
  aws cloudfront create-invalidation \
    --distribution-id "$CF_DIST" \
    --profile "$AWS_PROFILE" \
    --paths "/*"
fi

echo ""
echo "Deployed to: http://$BUCKET.s3-website-us-east-1.amazonaws.com"
if [[ -n "$CF_DIST" ]]; then
  echo "CloudFront cache invalidated."
fi
echo "Done."
