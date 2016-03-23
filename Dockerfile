FROM mhart/alpine-node:5.7.1

# The working directory must be set using WORKDIR
WORKDIR .
ENV HOME="/"

# If you have native dependencies, you'll need extra tools. Also remove any cached files from the installs
# RUN apk add --no-cache make gcc g++ python

ADD ./package.json ./

# If don't you need npm, use a base tag
RUN npm install --production

# Remove the cache that NPM creates
RUN npm cache clean

# Add application code
ADD ./ .

# Heroku ignores this command and will use their designated port set as an environment variable
EXPOSE 3000

CMD ["npm", "start"]
