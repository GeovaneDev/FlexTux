const Discord = require('discord.js');
const { mongoClient } = require('../../index');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  name: 'reset-saldo',
  description: '｢Developer｣ Reseta o saldo do usuário. - Somente o criador pode usar 😉',
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'usuario',
      description: 'Usuário para resetar o dinheiro',
      type: Discord.ApplicationCommandOptionType.User,
      required: false,
    },
  ],

  run: async (client, interaction) => {
    let user = interaction.options.getUser("usuario");
    if (!user) user = interaction.user;
    let userId = user.id;

    if (interaction.user.id !== process.env.DONO_ID) {
      interaction.reply({
        content: `Olá ${interaction.user}, você não tem permissão de executar esse comando. Apenas o dono pode executar!`,
        ephemeral: true,
      })
      return
    }

    try {
      const db = mongoClient.db('users');
      const usersCollection = db.collection('users');

      const user = await usersCollection.findOne({ discordId: userId });

      if (!user) {
        interaction.reply({
          content: `O usuário <@${userId}> ainda não tem um saldo registrado!`,
          ephemeral: true,
        });
        return;
      }

      await usersCollection.updateOne({ discordId: userId }, { $set: { balance: 0 } });
      let embed = new Discord.EmbedBuilder()
        .setColor("Random")
        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setDescription(`O saldo de moedas de <@${userId}> foi resetado com sucesso!`)

      interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (error) {
      console.error(error);
      interaction.reply({
        content: 'Ocorreu um erro ao resetar o saldo.',
        ephemeral: true
      });
    }
  },
};