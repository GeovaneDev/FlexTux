const Discord = require("discord.js");
const axios = require("axios");

module.exports = {
  name: "livro",
  aliases: [],

  run: async (client, message, args) => {
    const title = args.join(" ");

    if (!title) {
      const embedUsage = new Discord.EmbedBuilder()
              .setColor("Random")
              .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
              .setTitle("Uso incorreto do comando")
              .setDescription("Por favor, use o comando da seguinte maneira:\n\n`!livro <nome do livro>`\n\nExemplo: `!livro Monica 50 Anos`");

          return message.reply({ embeds: [embedUsage] });
    }

    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          title
        )}`
      );

      const books = response.data.items;

      if (!books || books.length === 0) {
        return message.reply({
          content: `Não foi possível encontrar informações sobre o livro "${title}"`,
        });
      }

      const book = books[0].volumeInfo;
      const embed = new Discord.EmbedBuilder()
        .setColor("#FFB6C1")
        .setTitle(book.title)
        .setURL(book.previewLink)
        .setFooter({ text: "Fonte: books.google.com" })
        .setDescription(
          `**Autor(es)**: ${book.authors || "Desconhecido"}\n**Editora**: ${book.publisher || "Desconhecido"
          }\n**Data de publicação**: ${book.publishedDate || "Desconhecido"
          }\n**Número de páginas**: ${book.pageCount ? book.pageCount.toLocaleString() : "Desconhecido"
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

      message.reply({
        embeds: [embed],
        components: [button],
      });
    } catch (error) {
      message.reply({
        content: "Ocorreu um erro ao buscar informações sobre o livro",
        ephemeral: true,
      });
    }
  },
};
