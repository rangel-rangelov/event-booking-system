FROM node:21.7.3-alpine

WORKDIR /app
COPY package*.json ./
RUN yarn install

COPY . .
EXPOSE 3000
CMD yarn dev
