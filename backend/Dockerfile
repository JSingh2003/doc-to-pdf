FROM node:20-alpine3.19 AS build-deps

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm install

COPY . /usr/src/app/

EXPOSE 3001

CMD ["node", "server.js"]