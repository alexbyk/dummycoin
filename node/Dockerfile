FROM node:10-alpine as builder
WORKDIR /app
COPY package*.json ./
ENV NODE_ENV=production
RUN npm set progress=false && npm config set depth 0
RUN npm i
COPY . .
ENTRYPOINT npm run start:prod
