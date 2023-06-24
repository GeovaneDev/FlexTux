const Discord = require("discord.js");
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();
"use strict";

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildModeration,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
  ]
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync(`./comandosPrefix/`);

fs.readdirSync('./comandosPrefix/').forEach(local => {
  const comandos = fs.readdirSync(`./comandosPrefix/${local}`).filter(arquivo => arquivo.endsWith('.js'))

  for(let file of comandos) {
      let puxar= require(`./comandosPrefix/${local}/${file}`)

      if(puxar.name) {
          client.commands.set(puxar.name, puxar)
      } 
      if(puxar.aliases && Array.isArray(puxar.aliases))
      puxar.aliases.forEach(x => client.aliases.set(x, puxar.name))
  } 
});

client.on("messageCreate", async (message) => {

  let prefix = process.env.PREFIX;

  if (message.author.bot) return;
  if (message.channel.type === Discord.ChannelType.DM) return;     

  if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;

  if(!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);

  let cmd = args.shift().toLowerCase()
  if(cmd.length === 0) return;
  let command = client.commands.get(cmd)
  if(!command) command = client.commands.get(client.aliases.get(cmd)) 
  
try {
    command.run(client, message, args)
} catch (err) { 
   console.error('Erro:' + err); 
}
});

module.exports = client

client.on('ready', () => {
  console.log(`🔥 Estou online em ${client.guilds.cache.size} Servidores!\n🎈 Estou logado(a) como ${client.user.tag}!`)
  client.user.setStatus("online");
  let status = [
    {
      name: '🎁Confira meu site: https://nyssabot.pages.dev',
      type: Discord.ActivityType.Playing,
    },
    {
      name: `💻${client.guilds.cache.size} Servidores`,
      type: Discord.ActivityType.Playing,
    },
    {
      name: `🎇${client.users.cache.size} Usuários`,
      type: Discord.ActivityType.Playing,
    },
    {
      name: '🎉Confira meu perfil no Top.gg',
      type: Discord.ActivityType.Playing,
    },
    {
      name: '💎Veja meus comandos usando /ajuda.',
      type: Discord.ActivityType.Playing,
    },
  ];
  client.user.setActivity(status[0]);
  setInterval(() => {
    let random = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[random]);
  }, 120000);
  //setTimeout(() => {
  //  const { AutoPoster } = require('topgg-autoposter')
  //  const ap = AutoPoster(process.env.TOP_GG_TOKEN, client)
  //  ap.on('posted', () => {
  //  })
  //}, 6000000);
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

const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;
const clientMongo = new MongoClient(uri);

clientMongo.connect()
  .then(() => {
    console.log("📚 Conectado ao MongoDB!");
  })
  .catch((error) => {
    console.error("Ocorreu um erro ao conectar ao MongoDB:", error);
  });

module.exports.mongoClient = clientMongo;