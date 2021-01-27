FROM node:12-alpine AS BUILD_IMAGE

# packages needed for node-gyp and dupe-krill
RUN apk add --update --no-cache python make g++ curl bash

# install node-prune (https://github.com/tj/node-prune)
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

RUN apk add --no-cache \
        ca-certificates \
        gcc \
        musl-dev

ENV RUSTUP_HOME=/usr/local/rustup \
    CARGO_HOME=/usr/local/cargo \
    PATH=/usr/local/cargo/bin:$PATH \
    RUST_VERSION=1.49.0
RUN set -eux; \
    apkArch="$(apk --print-arch)"; \
    case "$apkArch" in \
        x86_64) rustArch='x86_64-unknown-linux-musl'; rustupSha256='05c5c05ec76671d73645aac3afbccf2187352fce7e46fc85be859f52a42797f6' ;; \
        aarch64) rustArch='aarch64-unknown-linux-musl'; rustupSha256='6a8a480d8d9e7f8c6979d7f8b12bc59da13db67970f7b13161ff409f0a771213' ;; \
        *) echo >&2 "unsupported architecture: $apkArch"; exit 1 ;; \
    esac; \
    url="https://static.rust-lang.org/rustup/archive/1.23.1/${rustArch}/rustup-init"; \
    wget "$url"; \
    echo "${rustupSha256} *rustup-init" | sha256sum -c -; \
    chmod +x rustup-init; \
    ./rustup-init -y --no-modify-path --profile minimal --default-toolchain $RUST_VERSION --default-host ${rustArch}; \
    rm rustup-init; \
    chmod -R a+w $RUSTUP_HOME $CARGO_HOME; \
    rustup --version; \
    cargo --version; \
    rustc --version;
RUN cargo install dupe-krill --verbose

# use a non-root user to make commands such as npm post-install scripts safer
USER node

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin
WORKDIR /home/node/app

# copy by default will make the root user own the files, we want the node user to own the files
COPY --chown=node:node package*.json .snyk /home/node/app/

RUN npm ci

COPY --chown=node:node . /home/node/app/

RUN npm run build
# remove development dependencies
RUN npm prune --production

# run node prune
RUN /usr/local/bin/node-prune

RUN find . -type d -name @formatjs -prune -exec rm -rf {} \;
RUN rm -rf polyfill-library-3.42.0/polyfills/__dist
RUN find node_modules/polyfill-library*/polyfills -type d -mindepth 1 | grep -v ".*__dist.*" | xargs rm -rf 
RUN rm -rf .git

# hardlink duplicate files to save space (saves 50% for polyfill-service)
RUN dupe-krill .

FROM node:12-alpine AS runtime
COPY --chown=node:node --from=BUILD_IMAGE /home/node/app /home/node/app/
USER node
EXPOSE 8080
ENV NODE_ENV=production
CMD ["node", "/home/node/app/server/index.js"]
