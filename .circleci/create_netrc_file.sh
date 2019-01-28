#!/usr/bin/env bash

# Set error handling
set -eu -o pipefail

# Heroku CLI Authentication - Netrc file format
# https://devcenter.heroku.com/articles/authentication#netrc-file-format

cat > ~/.netrc << EOF
machine api.heroku.com
	login $HEROKU_LOGIN
	password $HEROKU_AUTH_TOKEN
machine git.heroku.com
	login $HEROKU_LOGIN
	password $HEROKU_AUTH_TOKEN
machine code.heroku.com
	login $HEROKU_LOGIN
	password $HEROKU_AUTH_TOKEN
EOF

# Set umask - owner r+w only
chmod 0600 ~/.netrc
