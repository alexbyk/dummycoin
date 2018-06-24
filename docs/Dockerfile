FROM abiosoft/caddy
WORKDIR /app
COPY ./api ./api
COPY ./front ./front
COPY ./node ./node
CMD ["--conf", "/etc/Caddyfile", "--port", "9093", "--log", "stdout"]
