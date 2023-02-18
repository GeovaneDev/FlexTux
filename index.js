const Discord = require("discord.js");
const config = require("./config.json")
const { QuickDB } = require('quick.db')

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
  console.log(`🔥 Estou online em ${client.guilds.cache.size} Servidores!
  🎈 Estou logado(a) como${client.user.tag}!`)
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

client.on("messageDelete", (message, oldMessage, newMessage) => {
  const channel = client.channels.cache.get("1064233786809778207");
  const embed = new Discord.EmbedBuilder()
    .setTitle(`<:7889discordchat:1046476120297582622> ‣ LOG | Mensagem Deletada.`)
    .setColor('#10fee4')
    .setFooter({ text: `© ${client.user.username} 2023` })
    .setThumbnail(`${client.user.displayAvatarURL({ size: 2048 })}`)
    .setTimestamp(new Date())
    .setDescription(`**<:1288discordrole:1028430849915498606> ‣ Autor da mensagem**  \n> **Usuário:** ${message.author} \n> **ID:** ${message.author.id} \n\n**<:7889discordchat:1046476120297582622> ‣ Canal:** \n> ${message.channel} \n\n**Mensagem deletada:** \n \`\`\`${message.content}\`\`\``)
  channel.send({ embeds: [embed] });
})

client.on("messageUpdate", (message, oldMessage, newMessage) => {
  const channel = client.channels.cache.get("1064233786809778207");
  const embed = new Discord.EmbedBuilder()
    .setTitle(`<:7889discordchat:1046476120297582622> ‣ LOG | Mensagem Editada.`)
    .setColor('#10fee4')
    .setThumbnail(`${client.user.displayAvatarURL({ size: 2048 })}`)
    .setFooter({ text: `© ${client.user.username} 2023` })
    .setTimestamp(new Date())
    .setDescription(`**<:1288discordrole:1028430849915498606> ‣ Autor da mensagem** \n> **Usuário:** ${message.author} \n> **ID:** ${message.author.id} \n\n**<:7889discordchat:1046476120297582622> ‣ Canal:** \n> ${message.channel} \n\n**Mensagem antiga:** \n \`\`\`${message.content}\`\`\` \n**Mensagem nova:** \n \`\`\`${oldMessage.content}\`\`\``)

  let mensagem1 = new ActionRowBuilder().addComponents(
    new Discord.ButtonBuilder()
      .setLabel("Ir para mensagem")
      .setStyle(Discord.ButtonStyle.Link)
      .setURL(`${message.url}`)
      .setEmoji("📩")
  )

  channel.send({ embeds: [embed], components: [mensagem1] })
})

client.slashCommands = new Discord.Collection()

require('./handler')(client)

client.login(config.token);
