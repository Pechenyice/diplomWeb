# Diplom Server-side explanation

## It is built with RPC strategy, main is API endpoint, who checks midllewares and delegates logic to microservices

./services/ folder must contain only amqpClient.js, amqpServer.js is independent service, that will be dockered in independent container, so, it's in the ./services/ folder just for my convenience