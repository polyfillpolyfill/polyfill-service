#!/bin/bash

# Delete current deploy branch
git branch -D deploy

# Create new deploy branch based on master
git checkout -b deploy

# Perform pre-deploy build steps
git describe > .semver

# Commit changes
git add -A
git commit -m "Deploying to Heroku"

# Push it up to heroku, the -f ensures that heroku won't complain
git push herokuqa -f deploy:master

# Switch it back to master
git checkout master
