const Discord = require('discord.js')

module.exports = {
  name: 'qr-code',
  aliases: ["qrcode"],

  run: async (client, message, args) => {
    const link = args.join(" ");

    if (!link) {
      const embedUsage = new Discord.EmbedBuilder()
          .setColor("Random")
          .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
          .setTitle("Uso incorreto do comando")
          .setDescription("Por favor, use o comando da seguinte maneira:\n\n`!qr-code <link/texto>`\n\nExemplo: `!qr-code https://nyssabot.pages.dev`");

      return message.reply({ embeds: [embedUsage] });
  }

    let embed = new Discord.EmbedBuilder()
    .setImage(`https://api.qrserver.com/v1/create-qr-code/?size=1024x1024&data=${link}`)
    .setColor(`Random`)
    .setDescription(`> **Olá ${message.author}, aqui está seu QR Code**`)
    .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
    .setFooter({ text: "Fonte: api.qrserver.com"})

    message.reply({ embeds: [embed] })
  }
}