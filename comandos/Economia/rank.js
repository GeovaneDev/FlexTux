const Discord = require("discord.js");
const { mongoClient } = require("../../index");
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  name: "rank",
  description: "｢Economia｣ Mostra o rank por quantidade de dinheiro. (BETA)",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    const db = mongoClient.db("users");
    const usersCollection = db.collection("users");
  
    const rankUsers = await usersCollection
      .find()
      .sort({ balance: -1 })
      .toArray();
  
    const rankMessage = new Discord.EmbedBuilder()
      .setColor("Yellow")
      .setTitle("Rank Global")
      .setDescription(`Aqui está o rank global dos usuários por dinheiro:`)
      .setTimestamp();
  
    const developerId = process.env.DONO_ID;
  
    for (let i = 0; i < rankUsers.length; i++) {
      const userId = rankUsers[i].discordId;
      const user = await client.users.fetch(userId);
      const username = user ? user.tag : "Usuário não encontrado";
  
      const formattedUsername = userId === developerId ? `${username} *(Dono/Dev)*` : username;
  
      rankMessage.addFields({ name: `${i + 1}. ${formattedUsername}`, value: `Dinheiro: ${rankUsers[i].balance || 0}` });
    }
  
    await interaction.reply({ embeds: [rankMessage] });
  },  
};
