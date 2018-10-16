#!/bin/bash

cat << EOF > dns.json
{
  "zone": "$ZONE",
	"name": "$SUBDOMAIN",
  "rdata": "o2.shared.global.fastly.net",
  "emailAddress": "origami.support@ft.com"
}
EOF

curl --fail -X DELETE --header "Content-Type:application/json" --header "Accept:application/json" --header "x-api-key:$KONSTRUCTOR_API_KEY" -d @dns.json "https://dns-api.in.ft.com/v2"
