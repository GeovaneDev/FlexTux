const Discord = require("discord.js");
const { mongoClient } = require('../../index.js');

module.exports = {
  name: "apostar",
  description: "｢Economia｣ Aposte suas moedas.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "quantidade",
      description: "A quantidade de moedas a serem apostadas",
      type: Discord.ApplicationCommandOptionType.Integer,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    const userId = interaction.user.id;
    const amount = interaction.options.getInteger("quantidade");

    try {
      const db = mongoClient.db("users");
      const usersCollection = db.collection("users");

      const user = await usersCollection.findOne({ discordId: userId });
      if (user.balance < amount) {
        interaction.reply("Você não tem moedas suficientes para apostar essa quantia.");
        return;
      }

      const isWin = Math.random() < 0.5;

      const result = await usersCollection.updateOne(
        { discordId: userId },
        {
          $inc: { balance: isWin ? amount : -amount },
        }
      );

      if (isWin) {
        let embedWin = new Discord.EmbedBuilder()
        .setColor("Random")
        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setDescription(`Parabéns ${interaction.user}, você ganhou ${amount} moedas!`);

        interaction.reply({ embeds: [embedWin] });
      } else {
        let embedlost = new Discord.EmbedBuilder()
        .setColor("Random")
        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setDescription(`${interaction.user} Você perdeu ${amount} moedas. Tente novamente!`);

        interaction.reply({ embeds: [embedlost] });
      }
    } catch (error) {
      console.error(error);
      interaction.reply("Ocorreu um erro ao acessar o banco de dados.");
    }
  },
};
