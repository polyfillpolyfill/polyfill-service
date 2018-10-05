#!/bin/bash

CIRCLE_BRANCH=$CIRCLE_BRANCH
cat << EOF > dns-put.json
{
	"zone": "ft.com",
	"name": "$SUBDOMAIN",
	"oldRdata": "o2.shared.global.fastly.net",
	"newRdata": "o2.shared.global.fastly.net",
	"ttl": "21600",
	"emailAddress": "origami.support@ft.com"
}
EOF

curl --fail -X PUT --header "Content-Type:application/json" --header "Accept:application/json" --header "x-api-key:$KONSTRUCTOR_API_KEY" -d @dns-put.json "https://dns-api.in.ft.com/v2"
