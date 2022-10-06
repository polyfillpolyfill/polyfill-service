#!/bin/bash

version=`curl -X GET --fail -H "Fastly-Key: $FASTLY_API_KEY_POLYFILL_ACCOUNT" "https://api.fastly.com/service/$FASTLY_SERVICE_ID_PROD/version" | jq '.[-1].number'`

cloned_version=`curl -X PUT --fail -H "Fastly-Key: $FASTLY_API_KEY_POLYFILL_ACCOUNT" "https://api.fastly.com/service/$FASTLY_SERVICE_ID_PROD/version/$version/clone" | jq '.number'`

cat <<EOT >> toppops-logging-config.json
{
	"name": "toppops-collector",
	"url": "https://toppops-ingest.fastlylabs.com/ingest",
	"message_type": "blank",
	"format_version": 2,
	"format": "",
	"content_type": "text/plain",
	"method": "POST",
	"placement": "none"
}
EOT

curl -X POST -H "Content-Type: application/json" -d @toppops-logging-config.json "https://api.fastly.com/service/$FASTLY_SERVICE_ID_PROD/version/$cloned_version/logging/http" -H "FASTLY-KEY: $FASTLY_API_KEY_POLYFILL_ACCOUNT"

curl -X PUT --fail -H "Fastly-Key: $FASTLY_API_KEY_POLYFILL_ACCOUNT" "https://api.fastly.com/service/$FASTLY_SERVICE_ID_PROD/version/$cloned_version/activate"
