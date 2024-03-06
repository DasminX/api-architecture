FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm i

COPY . .

COPY .env.dist .env

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]