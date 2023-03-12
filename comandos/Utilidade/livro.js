const Discord = require("discord.js");
const axios = require("axios");

module.exports = {
  name: "livro",
  description: "｢Utilidade｣ Pesquise informações sobre um livro.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "titulo",
      description: "O título do livro",
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    const title = interaction.options.getString("titulo");

    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          title
        )}`
      );

      const books = response.data.items;

      if (!books || books.length === 0) {
        return interaction.reply({
          content: `Não foi possível encontrar informações sobre o livro "${title}"`,
          ephemeral: true,
        });
      }

      const book = books[0].volumeInfo;
      const embed = new Discord.EmbedBuilder()
      .setColor("#FFB6C1")
      .setTitle(book.title)
      .setURL(book.previewLink)
      .setFooter({ text: "Fonte: books.google.com"})
      .setDescription(
        `**Autor(es)**: ${book.authors || "Desconhecido"}\n**Editora**: ${
          book.publisher || "Desconhecido"
        }\n**Data de publicação**: ${
          book.publishedDate || "Desconhecido"
        }\n**Número de páginas**: ${
          book.pageCount ? book.pageCount.toLocaleString() : "Desconhecido"
        }\n**Classificação**: ${book.averageRating || "Desconhecido"}\n
        **Descrição do livro:** ${book.description || "Sem descrição"}`
      )
      .setThumbnail(book.imageLinks?.thumbnail)

      const button = new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
          .setLabel("Informações completas")
          .setURL(`${book.previewLink}`)
          .setStyle(Discord.ButtonStyle.Link)
      );

      interaction.reply({
        embeds: [embed],
        components: [button],
      });
    } catch (error) {
      console.error(error);
      interaction.reply({
        content: "Ocorreu um erro ao buscar informações sobre o livro",
        ephemeral: true,
      });
    }
  },
};
