const Discord = require('discord.js');
const { mongoClient } = require('../../index');

module.exports = {
    name: 'saldo',
    description: '｢Economia｣ Veja o saldo de alguém.',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'usuário',
            description: 'Usuário para exibir o dinheiro',
            type: Discord.ApplicationCommandOptionType.User,
            required: false,
        },
    ],

    run: async (client, interaction) => {
        let user = interaction.options.getUser("usuário");
        if (!user) user = interaction.user;
        let userId = user.id;

        try {
            const db = mongoClient.db('users');
            const usersCollection = db.collection('users');

            const result = await usersCollection.updateOne(
                { discordId: userId },
                { $setOnInsert: { balance: 0 } },
                { upsert: true }
            );

            const foundUser = await usersCollection.findOne({ discordId: userId });

            if (user.id === interaction.user.id) {
                let embedSelf = new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                    .setDescription(`Olá ${interaction.user}, seu saldo atual é de ${foundUser.balance} moedas.`)

                interaction.reply({ embeds: [embedSelf] });
                return
            } else {
                let embed = new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                    .setDescription(`Olá ${interaction.user}, o saldo atual do usuário <@${userId}> é de ${foundUser.balance} moedas.`)

                interaction.reply({ embeds: [embed] });
                return
            }
        } catch (error) {
            console.error(error);
            interaction.reply({
                content: 'Ocorreu um erro ao acessar o saldo.',
                ephemeral: true
            });
        }
    },
};
