FROM node:14-alpine
WORKDIR /app/backend/services/dataManager
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
CMD npx wait-port rabbitmq:5672 && \
    npx wait-port mysql:3306 && \
    node amqpServer.js