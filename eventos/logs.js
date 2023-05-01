require('../index.js')

const Discord = require("discord.js");
const dotenv = require('dotenv');
const client = require('../index')

const webhookUrlLogsComandos = process.env.WEBHOOK_LOGS_COMMANDS;
const webhookClientLogsComandos = new Discord.WebhookClient({ url: webhookUrlLogsComandos });

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const args = interaction.options._hoistedOptions.map((option) => {
    return `${option.name}: ${option.value}`;
  });

  let logMessage = new Discord.EmbedBuilder()
  .setColor("Random")
  .setTitle("Log de Comandos:")
  .setDescription(`> Comando: ${interaction.commandName}
  > Executado por: ${interaction.user.tag}
  > Servidor: ${interaction.guild.name}
  > Argumentos: ${args.join(', ')}`)
  .setTimestamp();

  webhookClientLogsComandos.send({ embeds: [logMessage] });
});

const webhookUrlGuils = process.env.WEBHOOK_GUILDS;
const webhookClientGuilds = new Discord.WebhookClient({ url: webhookUrlGuils });

client.on('guildCreate', async (guild) => {
  let logMessage = new Discord.EmbedBuilder()
    .setColor('Random')
    .setTitle('Novo servidor:')
    .setDescription(`> Fui adicionada ao servidor: ${guild.name} (${guild.id}).
    > Dono: ${guild.ownerId})
    > Quantidade de Membros: ${guild.memberCount}
    > Ícone: ${guild.iconURL}`)
    .setTimestamp();

    webhookClientGuilds.send({ embeds: [logMessage] });
});

client.on('guildDelete', async (guild) => {
  let logMessage = new Discord.EmbedBuilder()
    .setColor('Random')
    .setTitle('Removido de um servidor:')
    .setDescription(`> 😭 Fui removida do servidor: ${guild.name} (${guild.id}).
    > Dono: ${guild.ownerId}
    > Quantidade de Membros: ${guild.memberCount}
    > Ícone: ${guild.iconURL}`)
    .setTimestamp();

    webhookClientGuilds.send({ embeds: [logMessage] });
});