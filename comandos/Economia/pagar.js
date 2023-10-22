const Discord = require('discord.js');
const { mongoClient } = require('../../index');

module.exports = {
    name: 'pagar',
    description: '｢Economia｣ Pagar moedas a outro usuário',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'usuário',
            description: 'Usuário para pagar',
            type: Discord.ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: 'quantidade',
            description: 'Quantidade de moedas para pagar',
            type: Discord.ApplicationCommandOptionType.Integer,
            required: true,
        },
    ],

    run: async (client, interaction) => {
        const user = interaction.options.getUser("usuário");
        const amount = interaction.options.getInteger("quantidade");
        const senderId = interaction.user.id;

        if (user.id === senderId) {
            return interaction.reply({
                content: ':x: Você não pode pagar a si mesmo.',
                ephemeral: true
            });
        }

        if (isNaN(amount) || amount === undefined || amount <= 0) {
            return interaction.reply({
                content: ':x: O valor precisa ser maior que 0.',
                ephemeral: true
            });
        }

        try {
            const db = mongoClient.db('users');
            const usersCollection = db.collection('users');

            const sender = await usersCollection.findOne({ discordId: senderId });
            if (sender.balance < amount) {
                return interaction.reply({
                    content: `:x: Você não tem moedas suficientes para pagar a ${user}. Seu saldo atual é de ${sender.balance} moedas.`,
                    ephemeral: true
                });
            }

            const result = await usersCollection.updateMany(
                { discordId: { $in: [senderId, user.id] } },
                { $inc: { balance: senderId === senderId ? +amount : amount } }
            );

            let embed = new Discord.EmbedBuilder()
                .setColor("Random")
                .setDescription(`Olá ${interaction.user}, você enviou ${amount} moedas para ${user}. Seu saldo atual é de ${sender.balance - amount} moedas.`)
                .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                .setTitle("💸 Transferência de Moedas!")

            await interaction.reply({ embeds: [embed] })
        } catch (error) {
            console.error(error);
            interaction.reply({
                content: 'Ocorreu um erro ao processar o pagamento.',
                ephemeral: true
            });
        }
    },
};
