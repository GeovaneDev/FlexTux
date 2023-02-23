const Discord = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
"use strict";
const dotenv = require('dotenv');
dotenv.config();

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds
  ]
});

module.exports = client

client.on('interactionCreate', (interaction) => {

  if (interaction.type === Discord.InteractionType.ApplicationCommand) {

    const cmd = client.slashCommands.get(interaction.commandName);

    if (!cmd) return interaction.reply(`Ocorreu um erro na execução do comando!`);

    interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

    cmd.run(client, interaction)

  }
})

client.on('ready', () => {
  console.log(`🔥 Estou online em ${client.guilds.cache.size} Servidores!\n🎈 Estou logado(a) como ${client.user.tag}!`)
  client.user.setStatus("online");
  client.user.setPresence({
    activities: [{
      name: "Digite /help para a lista de comandos."
    }],
  })
})

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception: " + err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.log("[GRAVE] Rejeição possivelmente não tratada em: Promise ", promise, " motivo: ", reason.message);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  const tempoAtual = Date.now();
  const tempoAnterior = message.createdTimestamp;
  const intervaloTempo = (tempoAtual - tempoAnterior) / 1000;
  if (intervaloTempo > 60) return;
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId === "tickets_basico") {
      let nome_canal = `🔖-${interaction.user.id}`;
      let canal = interaction.guild.channels.cache.find(c => c.name === nome_canal);

      if (canal) {
        interaction.reply({ content: `Olá **${interaction.user.username}**, você já possui um ticket em ${canal}.`, ephemeral: true })
      } else {

        let categoria = interaction.channel.parent;
        if (!categoria) categoria = null;

        interaction.guild.channels.create({

          name: nome_canal,
          parent: categoria,
          type: Discord.ChannelType.GuildText,
          permissionOverwrites: [
            {
              id: interaction.guild.id,
              deny: [Discord.PermissionFlagsBits.ViewChannel]
            },
            {
              id: interaction.user.id,
              allow: [
                Discord.PermissionFlagsBits.ViewChannel,
                Discord.PermissionFlagsBits.AddReactions,
                Discord.PermissionFlagsBits.SendMessages,
                Discord.PermissionFlagsBits.AttachFiles,
                Discord.PermissionFlagsBits.EmbedLinks
              ]
            },
          ]

        }).then((chat) => {

          interaction.reply({ content: `Olá **${interaction.user.username}**, seu ticket foi aberto em ${chat}.`, ephemeral: true })

          let embed = new Discord.EmbedBuilder()
            .setColor("Random")
            .setDescription(`Olá ${interaction.user}, você abriu o seu ticket.\nAguarde um momento para ser atendido.`);

          let botao_close = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
              .setCustomId("close_ticket")
              .setEmoji("🔒")
              .setStyle(Discord.ButtonStyle.Danger)
          );

          chat.send({ embeds: [embed], components: [botao_close] }).then(m => {
            m.pin()
          })

        })
      }
    } else if (interaction.customId === "close_ticket") {
      interaction.reply(`Olá ${interaction.user}, este ticket será excluído em 5 segundos.`)
      try {
        setTimeout(() => {
          interaction.channel.delete().catch(e => { return; })
        }, 5000)
      } catch (e) {
        return;
      }

    }
  }
})

client.on('messageCreate', async (message) => {
  if (message.mentions.has(client.user.id)) {
    await message.reply({embeds: [new Discord.EmbedBuilder()
      .setDescription(`:kissing_heart: **Olá ${message.author}, meu prefix é ```/```, para ver em tudo que posso te ajudar user ```/ajuda```**`)
      .setColor("Random")
      ]})
  }
})

client.slashCommands = new Discord.Collection()

require('./handler')(client)

client.login(process.env.DISCORD_TOKEN);