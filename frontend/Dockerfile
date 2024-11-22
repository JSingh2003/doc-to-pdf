FROM node:16.17.0-bullseye-slim AS build

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm ci

COPY . /usr/src/app/

RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]