const Discord = require('discord.js');
const ms = require('ms');
const { mongoClient } = require('../../index');

module.exports = {
  name: 'trabalhar',
  description: '｢Economia｣ Trabalhe e ganhe algumas moedas',
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    const db = mongoClient.db('users');
    const usersCollection = db.collection('users');

    const amount = Math.floor(Math.random() * 500) + 100;

    try {
      const user = await usersCollection.findOneAndUpdate(
        { discordId: interaction.user.id },
        { $inc: { balance: +amount }, $set: { lastWork: new Date() } },
        { upsert: true, returnOriginal: false }
      );

      const cooldown = 30000;
      const remainingCooldown = Math.max(0, cooldown - (new Date() - user.value.lastWork.getTime()));

      if (remainingCooldown > 0) {
        const remainingCooldownFormatted = ms(remainingCooldown, { long: true });

        interaction.reply({
          content: `Você já trabalhou recentemente! Espere mais ${remainingCooldownFormatted} antes de trabalhar novamente.`,
          ephemeral: true,
        });
        return;
      }

      const embed = new Discord.EmbedBuilder()
        .setColor('Random')
        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setDescription(`Olá ${interaction.user}, você trabalhou e ganhou ${amount} moedas!`);

      interaction.reply({ embeds: [embed] });
      return
    } catch (error) {
      console.error(error);

      interaction.reply({
        content: 'Ocorreu um erro ao processar o comando. Por favor, tente novamente mais tarde.',
        ephemeral: true,
      });
      return
    }
  },
};
