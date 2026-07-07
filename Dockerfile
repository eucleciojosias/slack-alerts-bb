FROM node:24-alpine

RUN apk add --no-cache curl jq

WORKDIR /app

RUN npm install axios --save

COPY ./*.sh /app
COPY ./*.js /app

ENTRYPOINT ["/app/entrypoint.sh"]
