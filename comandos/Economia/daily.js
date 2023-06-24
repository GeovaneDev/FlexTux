const Discord = require('discord.js');
const { mongoClient } = require('../../index.js');

module.exports = {
    name: 'daily',
    description: '｢Economia｣ Recebe uma recompensa diária.',
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {
        const userId = interaction.user.id;

        try {
            const db = mongoClient.db('users');
            const usersCollection = db.collection('users');

            const today = new Date();
            const day = today.getDate();
            const month = today.getMonth();
            const year = today.getFullYear();
            const now = today.getTime();

            let user = await usersCollection.findOne({ discordId: userId });
            if (!user) {
                await usersCollection.insertOne({ discordId: userId, balance: 0 });
                user = { discordId: userId, balance: 0 };
            }

            if (user.dailyClaimed && now - user.dailyClaimed < 24 * 60 * 60 * 1000) {
                const remainingTime = 24 * 60 * 60 * 1000 - (now - user.dailyClaimed);
                const remainingHours = Math.floor(remainingTime / (60 * 60 * 1000));
                const remainingMinutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
                interaction.reply({
                    content: `Você já recebeu sua recompensa diária hoje! Tente novamente em ${remainingHours} horas e ${remainingMinutes} minutos.`,
                    ephemeral: true,
                });
                return;
            }

            const reward = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;

            const result = await usersCollection.updateOne(
                { discordId: userId },
                { $inc: { balance: reward }, $set: { dailyClaimed: now } }
            );

            let embed = new Discord.EmbedBuilder()
                .setColor("Random")
                .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                .setDescription(`Olá ${interaction.user} você coletou sua recompensa diária de ${reward} moedas.`)

            interaction.reply({ embeds: [embed], ephemeral: true, });
        } catch (error) {
            console.error(error);
            interaction.reply({
                content: 'Ocorreu um erro ao acessar o saldo.',
                ephemeral: true
            });
        }
    },
};
