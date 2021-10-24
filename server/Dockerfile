FROM node:14-alpine
WORKDIR /app/backend
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
CMD npx wait-port -t 15 rabbitmq:5672 && \
    npx wait-port -t 15 mysql:3306 && \
    node typesAndCategoriesUpdate.js && \
    npm start