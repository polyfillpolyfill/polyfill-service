FROM mhart/alpine-node:5.7.1

# The working directory must be set using WORKDIR
WORKDIR /app

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
