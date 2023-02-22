const Discord = require("discord.js")

module.exports = {
  name: "ping",
  description: "Descubra o meu tempo de resposta.",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    let ping = client.ws.ping;

let embed = new Discord.EmbedBuilder()
      .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
      .setDescription(`Olá ${interaction.user}, meu ping está em \`${ping}ms\`.`)
      .setColor("Random");

    interaction.reply({ embeds: [embed] })
  }
}