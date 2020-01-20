FROM forumone/gesso:php7.3-node12

COPY package*.json ./
RUN if test -e package-lock.json; then npm ci; else npm i; fi

COPY . .
