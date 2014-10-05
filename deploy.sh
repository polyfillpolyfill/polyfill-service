#!/bin/bash

# Store current branch and version
BRANCH=`git symbolic-ref -q --short HEAD`
VERSION=`git describe`
DEPLOY="$BRANCH-$VERSION"

# Create new deploy branch based on current branch
git checkout -b $DEPLOY

############################################
# Perform pre-deploy build steps - could run a grunt task here

echo $VERSION > .semver

#
############################################

# Commit changes
git add -A
git commit -m "Deploying $VERSION to Heroku"

# Push it up to heroku, the -f ensures that heroku won't complain
git push herokuqa -f deploy:master

# Switch it back to the branch we were working on
git checkout $BRANCH

# Delete the deploy branch
git branch -D $DEPLOY
