const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "gato",
  description: "Mostra uma imagem aleatória de um gato fofinho.",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    const response = await fetch("https://api.thecatapi.com/v1/images/search");
    const data = await response.json();
    const catImageUrl = data[0].url;

    const catEmbed = new Discord.EmbedBuilder()
      .setColor("Random")
      .setFooter({ text: "Fonte: thecatapi.com" })
      .setDescription(`Olá ${interaction.user}, Awww, aqui está uma foto de um gatinho fofinho!`)
      .setImage(catImageUrl);
    await interaction.reply({ embeds: [catEmbed] });
  }
}
