# syntax=docker/dockerfile:1

FROM node:16

WORKDIR /app
COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn install
COPY . ./

EXPOSE 8080

RUN chmod +x ./start.sh
CMD  ["./start.sh"]