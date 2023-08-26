FROM node:20.5.1-bookworm-slim

WORKDIR /app

COPY / /app/

RUN npm install

EXPOSE 8080

CMD ["node", "index.js"]