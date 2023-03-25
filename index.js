const Discord = require("discord.js");
"use strict";
const dotenv = require('dotenv');
const { accessSync } = require("fs");
dotenv.config();

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildBans,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildVoiceStates,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildPresences,
  ]
});

module.exports = client

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  let mencoes = [`<@${client.user.id}>`, `<@!${client.user.id}>`]

  mencoes.forEach(element => {
    if (message.content === element) {

      let embed = new Discord.EmbedBuilder()
        .setColor("Random")
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynaimc: true }) })
        .setDescription(`😘 Olá, ${message.author} utilize \`/ajuda\` para ver minha lista de comando.\n Para conhecer minha história use \`/starnick info\`.`)

      message.reply({ embeds: [embed] })
    }
  })

})

client.on('interactionCreate', async (interaction) => {
  if (interaction.isCommand()) {
    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd) {
      return interaction.reply({
        content: '😭 Ocorreu um erro na execução do comando!',
        ephemeral: true
      });
    }
    try {
      interaction.member = interaction.guild.members.cache.get(interaction.user.id);
      await cmd.run(client, interaction);
    } catch (error) {
      console.error(`Erro ao executar o comando "${cmd.name}": ${error}`);
      interaction.reply({
        content: '😭 Ocorreu um erro ao executar o comando. Informe ao desenvolvedor.',
        ephemeral: true
      });
    }
  }
});

client.on('ready', () => {
  console.log(`🔥 Estou online em ${client.guilds.cache.size} Servidores!\n🎈 Estou logado(a) como ${client.user.tag}!`)
  client.user.setStatus("online");
  client.user.setPresence({
    activities: [{
      name: "Digite /ajuda para a lista de comandos.",
   }],
  })
})

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

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  const tempoAtual = Date.now();
  const tempoAnterior = message.createdTimestamp;
  const intervaloTempo = (tempoAtual - tempoAnterior) / 1000;
  if (intervaloTempo > 10) return;
});

client.slashCommands = new Discord.Collection()

require('./handler')(client)

client.login(process.env.DISCORD_TOKEN);