#!/bin/bash

cat << EOF > dns-post.json
{
	"zone": "$ZONE",
	"name": "$SUBDOMAIN",
	"rdata": "o2.shared.global.fastly.net",
	"ttl": "21600",
	"emailAddress": "origami.support@ft.com"
}
EOF

curl --fail -X POST --header "Content-Type:application/json" --header "Accept:application/json" --header "x-api-key:$KONSTRUCTOR_API_KEY" -d @dns-post.json "https://dns-api.in.ft.com/v2"
