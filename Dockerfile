FROM forumone/gesso:4-node-v14-php-7.4

COPY package*.json ./
RUN if test -e package-lock.json; then npm ci; else npm i; fi

COPY . .

EXPOSE 6006
