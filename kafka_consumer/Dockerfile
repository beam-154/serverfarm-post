FROM node:18-alpine

WORKDIR /usr/src/kafka_consumer

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]