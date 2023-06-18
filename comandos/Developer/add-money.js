const Discord = require('discord.js');
const { mongoClient } = require('../../index');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  name: 'add-money',
  description: '｢Developer｣ Adiciona dinheiro ao seu saldo. - Somente o desenvolvedor pode usar 😉',
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'quantidade',
      description: 'A quantidade de dinheiro a ser adicionada',
      type: Discord.ApplicationCommandOptionType.Integer,
      required: true,
    },
    {
      name: 'usuario',
      description: 'Usuário para adicionar o dinheiro',
      type: Discord.ApplicationCommandOptionType.User,
      required: false,
    },
  ],

  run: async (client, interaction) => {
    let user = interaction.options.getUser("usuario");
    if (!user) user = interaction.user;
    let userId = user.id;
    const amount = interaction.options.getInteger('quantidade');

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

      const result = await usersCollection.updateOne(
        { discordId: userId },
        { $inc: { balance: +amount } },
        { upsert: true }
      );
      let embed = new Discord.EmbedBuilder()
        .setColor("Random")
        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setDescription(`Foram adicionadas ${amount} moedas ao saldo de ${user}.`)

      interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      interaction.reply({
        content: 'Ocorreu um erro ao adicionar o saldo.',
        ephemeral: true
      });
    }
  },
};
