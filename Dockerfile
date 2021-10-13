# pull official base image
FROM node:14-alpine

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install \
	&& printf "ls\ncat ./package.json\nnpm run start" > entrypoint.sh

# add app
COPY . ./

# start app
CMD ["/bin/sh", "entrypoint.sh"]