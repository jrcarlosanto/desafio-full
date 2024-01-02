FROM node:16

EXPOSE 3001

WORKDIR /app

COPY ./back/package*.json .

RUN npm install

COPY ./back .

CMD [ "npm","run" ,"dev" ]