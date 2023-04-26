const Discord = require("discord.js");
"use strict";
const dotenv = require('dotenv');
const { accessSync } = require("fs");
const fs = require('fs');
dotenv.config();

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildBans,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
  ]
});

module.exports = client

client.on('ready', () => {
  console.log(`🔥 Estou online em ${client.guilds.cache.size} Servidores!\n🎈 Estou logado(a) como ${client.user.tag}!`)
  client.user.setStatus("online");
  client.user.setPresence({
    activities: [{
      name: "Digite /ajuda para a lista de comandos.",
    }],
  })
});

process.on('multipleResolutions', (type, reason, promise) => {
  console.log(`🚫 Erro Detectado\n\n` + type, promise, reason)
});

process.on('unhandledRejection', (reason, promise) => {
  console.log(`🚫 Erro Detectado:\n\n` + reason, promise)
});

process.on('uncaughtException', (error, origin) => {
  console.log(`🚫 Erro Detectado:\n\n` + error, origin)
});

process.on('uncaughtExceptionMonitor', (error, origin) => {
  console.log(`🚫 Erro Detectado:\n\n` + error, origin)
});

fs.readdir('./eventos', (err, file) => {
  file.forEach(event => {
    require(`./eventos/${event}`)
  })
})

client.slashCommands = new Discord.Collection()

require('./handler')(client)

client.login(process.env.DISCORD_TOKEN);

// Página de Status
const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<html><head><style>body {background-color: black; color: white;}</style></head><body><h1>Estou online</h1></body></html>');
  res.end();
});
server.listen(4254, () => {
  console.log('Servidor rodando na porta 8080');
});