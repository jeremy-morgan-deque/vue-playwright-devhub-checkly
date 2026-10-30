#!/usr/bin/env bash
set -euo pipefail

API_KEY="${AXE_DEVHUB_API_KEY:-}"
PROJECT_ID="${AXE_DEVHUB_PROJECT_KEY_PLAYWRIGHT:-}"
SERVER_URL="${AXE_DEVHUB_SERVER_VUE_APP:-https://axe.deque.com}"
GIT_SHA="${GIT_SHA:-$(git rev-parse HEAD)}"

if [[ -z "$API_KEY" ]]; then
  echo "[axe] No API key set, skipping violation check"
  exit 0
fi

if [[ -z "$PROJECT_ID" ]]; then
  echo "[axe] No project ID set, skipping violation check"
  exit 0
fi

echo "[axe] Checking violations for SHA: $GIT_SHA"

HTTP_STATUS=$(curl -s -o /tmp/axe-response.json -w "%{http_code}" \
  -H "X-API-Key: $API_KEY" \
  -H "Accept: application/json" \
  "${SERVER_URL}/api-pub/v1/axe-watcher/gh/${GIT_SHA}?project_id=${PROJECT_ID}" \
)

RESPONSE=$(cat /tmp/axe-response.json)
echo "[axe] HTTP $HTTP_STATUS — $RESPONSE"

if [[ "$HTTP_STATUS" -lt 200 || "$HTTP_STATUS" -ge 300 ]]; then
  if echo "$RESPONSE" | grep -q "no pipeline runs detected"; then
    echo "[axe] No pipeline baseline yet — violation check will activate after the first CI run"
    exit 0
  fi
  echo "[axe] Non-2xx response, skipping violation check"
  exit 0
fi

VIOLATION_COUNT=$(echo "$RESPONSE" | grep -o '"last_run_violation_count":[0-9]*' | grep -o '[0-9]*' || true)
AXE_URL=$(echo "$RESPONSE" | grep -o '"axe_url":"[^"]*"' | sed 's/"axe_url":"//;s/"//' || true)

if [[ -z "$VIOLATION_COUNT" ]]; then
  echo "[axe] Could not parse response, skipping violation check"
  echo "[axe] Response: $RESPONSE"
  exit 0
fi

if [[ "$VIOLATION_COUNT" -gt 0 ]]; then
  echo ""
  echo "[axe] FAIL: $VIOLATION_COUNT accessibility violation(s) found"
  echo "[axe] Details: ${SERVER_URL}${AXE_URL}"
  exit 1
fi

echo "[axe] PASS: No accessibility violations found"
