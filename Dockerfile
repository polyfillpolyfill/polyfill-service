FROM mhart/alpine-node:6.0.0

# The working directory must be set using WORKDIR
WORKDIR /app
ENV HOME="/app"

# Set the application to be in production mode by default
ENV NODE_ENV production

ADD ./package.json ./

# Install dependencies and remove the cache that NPM creates
RUN npm install --production && npm cache clean

# Add application code
ADD ./ .

# Heroku ignores this command and will use their designated port set as an environment variable
EXPOSE 3000

CMD ["npm", "start"]
