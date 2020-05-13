FROM node:12-alpine AS build
RUN apk add --update --no-cache python make g++ rust cargo
USER node
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin:/home/node/.cargo/bin
RUN cargo install dupe-krill
COPY --chown=node:node package*.json pnpm-lock.yaml .snyk /home/node/app/
WORKDIR /home/node/app
RUN npm install
COPY --chown=node:node . /home/node/app/
RUN ls -la
RUN npm run build
RUN npm prune --prod
RUN dupe-krill .

FROM node:12-alpine
COPY --chown=node:node --from=build /home/node/app /home/node/app/
USER node
EXPOSE 8080
ENV NODE_ENV=production
CMD ["node", "/home/node/app/server/index.js"]