# Getting Started with Diplom project

This project is powered by js + react + node.js + mysql + rabbitmq, so, to run it:

## 0. install [docker](https://www.docker.com/get-started)

## 1. Deploy


### 1.1 Fastest way

```
git pull https://github.com/Pechenyice/diplomWeb.git

cd ./diplomWeb

docker compose -f docker-compose-fast-boot.yml up
```

this will start already built docker containers from docker hub

### 1.2 Fast way

```
git pull https://github.com/Pechenyice/diplomWeb.git

cd ./diplomWeb

docker compose up
```

this will build your own containers with any changes you want to

### 1.3 Local case

```
git pull https://github.com/Pechenyice/diplomWeb.git

npm run initial

npm run win_dev (on Windows)
npm run linux_dev (on Linux)
```

this will install all packages and start both frontend and backend servers

but you need run [rabbitMQ](https://www.rabbitmq.com/), [redis](https://redis.io/) and [mySQL](https://www.mysql.com/) by yourself, and if you configure it with not default ports, don't forget to change [./server/.env](server/.env) and [./services/dataManager/.env](services/dataManager/.env) if needed!

## 2. dumped data

### 2.1 Users

We have got hard-coded users:

|login  |password|
|-------|--------|
|root   |root    |
|test   |test    |
|maksim |maksim  |
|maryana|maryana |