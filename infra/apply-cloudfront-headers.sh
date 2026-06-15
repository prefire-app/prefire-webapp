#!/usr/bin/env bash
# apply-cloudfront-headers.sh — create / update a Response Headers Policy and
# attach it to the prefire-webapp CloudFront distribution.
#
# Idempotent: if the policy already exists by name it is updated; if it is
# already attached to the distribution's default cache behavior, no change is
# made.
#
# Usage: ./infra/apply-cloudfront-headers.sh [distribution-id]
#
# Requires: AWS CLI v2, jq, AWS_PROFILE env (defaults to prefire-root).

set -euo pipefail

DIST_ID="${1:-E37O4COPWXGZVT}"
AWS_PROFILE="${AWS_PROFILE:-prefire-root}"
POLICY_NAME="prefire-webapp-security-headers"
POLICY_FILE="$(dirname "$0")/cloudfront-response-headers-policy.json"

if ! command -v jq >/dev/null 2>&1; then
  echo "jq is required" >&2
  exit 1
fi

# 1. Find or create the response-headers policy.
EXISTING_ID="$(
  aws cloudfront list-response-headers-policies \
    --type custom \
    --profile "$AWS_PROFILE" \
  | jq -r --arg name "$POLICY_NAME" \
      '.ResponseHeadersPolicyList.Items[]?
        | select(.ResponseHeadersPolicy.ResponseHeadersPolicyConfig.Name == $name)
        | .ResponseHeadersPolicy.Id' \
  | head -n1
)"

if [[ -z "$EXISTING_ID" ]]; then
  echo "==> Creating response-headers policy '$POLICY_NAME'..."
  POLICY_ID="$(
    aws cloudfront create-response-headers-policy \
      --response-headers-policy-config "file://$POLICY_FILE" \
      --profile "$AWS_PROFILE" \
    | jq -r '.ResponseHeadersPolicy.Id'
  )"
else
  POLICY_ID="$EXISTING_ID"
  ETAG="$(
    aws cloudfront get-response-headers-policy \
      --id "$POLICY_ID" \
      --profile "$AWS_PROFILE" \
    | jq -r '.ETag'
  )"
  echo "==> Updating existing policy $POLICY_ID..."
  aws cloudfront update-response-headers-policy \
    --id "$POLICY_ID" \
    --if-match "$ETAG" \
    --response-headers-policy-config "file://$POLICY_FILE" \
    --profile "$AWS_PROFILE" >/dev/null
fi

echo "==> Policy id: $POLICY_ID"

# 2. Attach to distribution's default cache behavior if not already attached.
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

aws cloudfront get-distribution-config \
  --id "$DIST_ID" \
  --profile "$AWS_PROFILE" > "$TMP/dist.json"

CURRENT="$(jq -r '.DistributionConfig.DefaultCacheBehavior.ResponseHeadersPolicyId // ""' "$TMP/dist.json")"
ETAG="$(jq -r '.ETag' "$TMP/dist.json")"

if [[ "$CURRENT" == "$POLICY_ID" ]]; then
  echo "==> Distribution $DIST_ID already uses policy $POLICY_ID — done."
  exit 0
fi

echo "==> Attaching policy $POLICY_ID to distribution $DIST_ID..."
jq --arg pid "$POLICY_ID" \
  '.DistributionConfig.DefaultCacheBehavior.ResponseHeadersPolicyId = $pid
   | .DistributionConfig' "$TMP/dist.json" > "$TMP/new-config.json"

aws cloudfront update-distribution \
  --id "$DIST_ID" \
  --if-match "$ETAG" \
  --distribution-config "file://$TMP/new-config.json" \
  --profile "$AWS_PROFILE" >/dev/null

echo "==> Done. CloudFront will roll out the change in ~5 min."
echo "    Verify with: curl -sI https://prefire.online | grep -iE 'content-security|strict-transport|x-content|x-frame|referrer'"
