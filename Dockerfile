FROM php:7.3-cli

ENV NODE_VERSION=v12.13.0 \
  NODE_CHECKSUM=c69671c89d0faa47b64bd5f37079e4480852857a9a9366ee86cdd8bc9670074a

ENV NODE_FILENAME=node-${NODE_VERSION}-linux-x64.tar.gz

RUN set -ex \
  && cd /tmp \
  && curl -fsSO "https://nodejs.org/dist/${NODE_VERSION}/${NODE_FILENAME}" \
  && echo "${NODE_CHECKSUM}  ${NODE_FILENAME}" | sha256sum -c \
  && tar xf "${NODE_FILENAME}" --strip-components=1 -C /usr/local \
  && rm "${NODE_FILENAME}" \
  && npm i -g gulp-cli

WORKDIR /app

COPY package*.json ./
RUN if test -e package-lock.json; then npm ci; else npm i; fi

COPY . .
