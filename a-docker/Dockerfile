# This is copy-pasted from https://nodejs.org/de/docs/guides/nodejs-docker-webapp/
FROM node:10

WORKDIR /home/node/app

# Install dependencies in image
COPY package*.json ./
RUN npm install

# Copy script to image workdir
COPY ./index.js .
EXPOSE 8080
CMD [ "node", "index.js" ]