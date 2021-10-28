# Getting Started with Diplom project

This project is powered by js + react + node.js + mysql + rabbitmq, so, to run it:

```git
mkdir diplomWeb

cd ./diplomWeb

git pull https://github.com/Pechenyice/diplomWeb.git
```

or

```
git clone https://github.com/Pechenyice/diplomWeb.git

cd ./diplomWeb
```

and then

# I. Kubernetes way

## Fast dev way (antipattern)

1. Install [Minikube and kubectl](https://kubernetes.io/ru/docs/tasks/tools/install-minikube/)
2. Run local K8S [cluster](https://kubernetes.io/ru/docs/setup/learning-environment/minikube/) 
3. To run deployment:
```
kubectl apply -f ./kubernetes/antipattern/configmap.yaml

kubectl apply -f ./kubernetes/antipattern/nginx-config-map.yaml

kubectl apply -f ./kubernetes/antipattern/db-dump.yaml

kubectl apply -f ./kubernetes/antipattern/deployment.yaml
```
4. get pod [NAME] with command:
```
kubectl get pod
```
5. forward port to your local host with command:
```
kubectl port-forward [NAME] 80:80
```

<--<br/>
if [NAME] is something like<br/> **diplom-wrong-pattern-local-isolated-deploy-66754ff4b6-vvfp6**<br/>
then point 5 is<br/>
kubectl port-forward **diplom-wrong-pattern-local-isolated-deploy-66754ff4b6-vvfp6** 80:80<br/>
-->

6. Go to [localhost](http://localhost) or use curl with GET request on port 80
```
curl localhost:80
```

# II. Docker way

## Good and fast dev way

1. install [docker](https://www.docker.com/get-started)
2. Deploy<br/>
2.1 Fastest way

```
docker compose -f docker-compose-fast-boot.yml up
```

this will start already built docker containers from docker hub

>> 2.2 Fast way

```
docker compose up
```

this will build your own containers with any changes you want to

# III. Local deploy way

## do not use it please, it is needed only for contributors :)

1. Run following commands
```
npm run initial

npm run win_dev (on Windows)
npm run linux_dev (on Linux)
```

this will install all packages and start both frontend and backend servers

but you need run [rabbitMQ](https://www.rabbitmq.com/), [redis](https://redis.io/) and [mySQL](https://www.mysql.com/) by yourself, and if you configure it with not default ports, don't forget to change [./server/.env](server/.env) and [./services/dataManager/.env](services/dataManager/.env) if needed!

# ADDITION. Dumped data

## Users

Project has got hard-coded users are honored for for participating and helping the project:

|login         |password      |
|--------------|--------------|
|root          |root          |
|test          |test          |
|bcrypted      |bcrypted      |
|***maksim***  |***maksim***  |
|***maryana*** |***maryana*** |