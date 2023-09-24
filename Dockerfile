FROM node:latest

WORKDIR /app

COPY / /app/

RUN npm install

EXPOSE 8080

ENTRYPOINT ["npm", "run", "start"]
