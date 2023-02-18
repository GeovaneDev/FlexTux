const Discord = require('discord.js')
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args))

module.exports = {
  name: 'mcsrvstat',
  description: 'Veja as informações de um servidor de Minecraft.',
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'ip',
      description: 'Digite o ip do servidor.',
      type: Discord.ApplicationCommandOptionType.String,
      required: true
    }
  ],

  run: async (client, interaction) => {
    const ip = interaction.options.getString('ip')
    const server = await fetch(`https://api.mcsrvstat.us/2/${ip}`, {
      method: 'GET'
    }).then(res => res.json())

    let off = new Discord.EmbedBuilder().setDescription(
      `O servidor ${ip} esta offline ou não existe.`
    )
    if (!server.online) return interaction.reply({ embeds: [off] })
    let embed = new Discord.EmbedBuilder()
      .setDescription(
        `Olá ${interaction.user} estas são as informações do servidor:\nIp: ${ip}\nVersão: ${server.version}\nPlayers: ${server.players.online}/${server.players.max}`
      )
      .setColor('Random')
      .setFooter({ text: `Mensage by ${interaction.user.tag}` })
    interaction.reply({ embeds: [embed] })
  }
}
