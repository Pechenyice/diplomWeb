FROM node:14-alpine AS builder
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install 
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
ARG BACKEND_PORT
COPY nginx/nginx.conf /etc/nginx/conf.d
RUN sed -i "s/BACKEND_PORT/${BACKEND_PORT}/g" /etc/nginx/conf.d/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]