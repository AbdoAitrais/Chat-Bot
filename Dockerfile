FROM node:16

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

COPY . .

Expose 2000

CMD ["npm","start"]