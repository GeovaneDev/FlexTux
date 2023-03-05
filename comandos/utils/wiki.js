const Discord = require("discord.js");
const axios = require("axios");

module.exports = {
  name: "wiki",
  description: "Pesquise algo na Wikipedia.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "pesquisa",
      description: "Escreva o buscar as informações na Wikipedia para você",
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    const query = interaction.options.getString("pesquisa");

    if (!query) {
      return interaction.reply({
        content: `Por favor, informe uma consulta para pesquisa na Wikipedia.`,
        ephemeral: true,
      });
    }

    try {
      const response = await axios.get(
        `https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
          query
        )}`
      );
      const data = response.data;

      if (data.type === "disambiguation") {
        return interaction.reply({
          content: `Existem várias opções para "${query}". Por favor, forneça mais detalhes.`,
          ephemeral: true,
        });
      }

      const embed = new Discord.EmbedBuilder()
        .setColor("Random")
        .setTitle(data.title)
        .setDescription(data.description)
        .setURL(data.content_urls.desktop.page);

      const button = new Discord.ActionRowBuilder()
        .addComponents(
          new Discord.ButtonBuilder()
            .setLabel("Abrir na Wikipédia")
            .setURL(data.content_urls.desktop.page)
            .setStyle(Discord.ButtonStyle.Link)
        );

      return interaction.reply({
        embeds: [embed],
        components: [button],
      });
    } catch (error) {
      console.error(error);
      return interaction.reply({
        content: `Ocorreu um erro ao fazer a pesquisa na Wikipedia.`,
        ephemeral: true,
      });
    }
  },
};
