FROM node:12-alpine AS build
# packages needed for node-gyp and dupe-krill
RUN apk add --update --no-cache python make g++ rust cargo
# use a non-root user to make commands such as npm post-install scripts safer
USER node
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin:/home/node/.cargo/bin
RUN cargo install dupe-krill
# copy by default will make the root user own the files, we want the node user to own the files
COPY --chown=node:node package*.json .snyk /home/node/app/
WORKDIR /home/node/app
RUN npm install
COPY --chown=node:node . /home/node/app/
RUN npm run build
RUN npm prune --prod
# hardlink duplicate files to save space (saves 50% for polyfill-service)
RUN dupe-krill .

FROM node:12-alpine
COPY --chown=node:node --from=build /home/node/app /home/node/app/
USER node
EXPOSE 8080
ENV NODE_ENV=production
CMD ["node", "/home/node/app/server/index.js"]