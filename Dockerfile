FROM forumone/gesso:4-node-v14-php-7.4

RUN apk add --no-cache git

COPY package*.json ./
RUN if test -e package-lock.json; then npm ci; else npm i; fi

COPY . .

EXPOSE 6006
