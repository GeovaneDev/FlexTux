FROM node:lts-slim

WORKDIR /app

COPY / /app/

RUN npm install

EXPOSE 8080

ENTRYPOINT ["npm", "run", "start"]
