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

    let page = parseInt(interaction.options.get('page')?.value) || 1;
    if (page < 1) page = 1;
  
    const rankUsers = await usersCollection
      .find()
      .sort({ balance: -1 })
      .toArray();
  
    const usersPerPage = 10;
    const startIdx = (page - 1) * usersPerPage;
    const endIdx = startIdx + usersPerPage;
    const rankUsersPerPage = rankUsers.slice(startIdx, endIdx);
  
    const rankMessage = new Discord.EmbedBuilder()
      .setColor("Yellow")
      .setTitle("Rank Global")
      .setDescription(`Aqui está o rank global dos usuários por dinheiro:`)
      .setTimestamp();
  
    const developerId = process.env.DONO_ID;
  
    for (let i = 0; i < rankUsersPerPage.length; i++) {
      const userId = rankUsersPerPage[i].discordId;
      const user = await client.users.fetch(userId);
      const username = user ? user.username : "Usuário não encontrado";
  
      const formattedUsername = userId === developerId ? `${username} *(Criador/Dev)*` : username;
  
      rankMessage.addFields({ name: `${startIdx + i + 1}. ${formattedUsername}`, value: `Dinheiro: ${rankUsersPerPage[i].balance || 0}` });
    }
  
    const backButton = new Discord.ButtonBuilder()
      .setCustomId('back')
      .setLabel('Voltar')
      .setStyle(Discord.ButtonStyle.Primary)
      .setDisabled(page === 1);
  
    const nextButton = new Discord.ButtonBuilder()
      .setCustomId('next')
      .setLabel('Avançar')
      .setStyle(Discord.ButtonStyle.Primary)
      .setDisabled(endIdx >= rankUsers.length);
  
    const actionRow = new Discord.ActionRowBuilder()
      .addComponents(backButton, nextButton);
  
    const reply = await interaction.reply({ embeds: [rankMessage], components: [actionRow], fetchReply: true });
    const message = reply instanceof Discord.Message ? reply : await reply.fetch();

    const filter = (i) => i.user.id === interaction.user.id;
    const collector = message.createMessageComponentCollector({ filter, time: 60000 });

    collector.on('collect', async (i) => {
      i.deferUpdate();

      if (i.customId === 'back') {
        page--;
      } else if (i.customId === 'next') {
        page++;
      }

      await updateRankMessage(page);
    });

    async function updateRankMessage(page) {
      const startIdx = (page - 1) * usersPerPage;
      const endIdx = startIdx + usersPerPage;
      const rankUsersPerPage = rankUsers.slice(startIdx, endIdx);

      rankMessage.fields = [];
      for (let i = 0; i < rankUsersPerPage.length; i++) {
        const userId = rankUsersPerPage[i].discordId;
        const user = await client.users.fetch(userId);
        const username = user ? user.username : "Usuário não encontrado";
    
        const formattedUsername = userId === developerId ? `${username} *(Dev)*` : username;
    
        rankMessage.addFields({ name: `${startIdx + i + 1}. ${formattedUsername}`, value: `Dinheiro: ${rankUsersPerPage[i].balance || 0}` });
      }

      backButton.setDisabled(page === 1);
      nextButton.setDisabled(endIdx >= rankUsers.length);

      await message.edit({ embeds: [rankMessage], components: [actionRow] });
    }

    collector.on('end', () => {
      backButton.setDisabled(true);
      nextButton.setDisabled(true);

      message.edit({ components: [actionRow] });
    });
  },  
};