FROM node:21-alpine3.18

EXPOSE 5173

WORKDIR /app

COPY ./front/package*.json .

RUN npm install

COPY ./front .

