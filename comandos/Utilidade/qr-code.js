const Discord = require('discord.js')

module.exports = {
  name: 'qr-code',
  description: '｢Utilidade｣ Transformar um link em QR code.',
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'link',
      description: 'Digite o link para transformar em QR code.',
      type: Discord.ApplicationCommandOptionType.String,
      required: true
    }
  ],

  run: async (client, interaction) => {

const link = interaction.options.getString('link')

    let embed = new Discord.EmbedBuilder()
    .setImage(`https://api.qrserver.com/v1/create-qr-code/?size=1024x1024&data=${link}`)
    .setColor(`Random`)
    .setDescription(`**Olá ${interaction.user}, aqui está seu QR Code**`)
    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true}) })
    .setFooter({ text: "Fonte: api.qrserver.com"})

    interaction.reply({ embeds: [embed] })
  }
}