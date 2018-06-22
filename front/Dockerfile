FROM node:10-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm set progress=false && npm config set depth 0
RUN npm i
COPY . .
RUN npm run build:prod

FROM abiosoft/caddy
WORKDIR /app
# COPY ./dist/angular ./
COPY --from=builder /app/dist/angular ./
COPY ./Caddyfile /etc/
CMD ["--conf", "/etc/Caddyfile", "--port", "9090", "--log", "stdout"]
