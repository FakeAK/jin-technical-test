FROM node:12

WORKDIR /usr/jin

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 3020

CMD [ "npm", "start" ]

