const Discord = require("discord.js");

module.exports = {
    name: "limpar",
    aliases: ["clear"],

  run: async (client, message, args) => {
        const numero = args.join(" ");

        if (!message.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
            message.reply({ content: `❌ - Você não tem permissão para utilizar este comando. Você precisa ter a permissão "**Gerenciar Mensagens**".`, ephemeral: true })
        } else if (parseInt(numero) > 100 || parseInt(numero) <= 0) {
            let embed = new Discord.EmbedBuilder()
                .setColor("Random")
                .setDescription(`Olá, ${message.author} Utilize números entre 1 e 100`)
                .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true }) });
                message.reply({ embeds: [embed], ephemeral: true })
        } else {
            const now = new Date().getTime();
            const messages = await message.channel.messages.fetch({ limit: numero });
            const deletableMessages = messages.filter(msg => now - msg.createdTimestamp <= 14 * 24 * 60 * 60 * 1000);
            const nonDeletableMessages = messages.filter(msg => now - msg.createdTimestamp > 14 * 24 * 60 * 60 * 1000);
            if (nonDeletableMessages.size > 0) {
                let embed = new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setDescription(`> Algumas mensagens não foram deletadas por serem enviadas antes de 14 dias. ${deletableMessages.size} mensagens deletadas.`);
                message.reply({ content: `<@${message.author.id}>`, embeds: [embed] });
            }
            if (deletableMessages.size > 0) {
                try {
                    await message.channel.bulkDelete(deletableMessages, { filterOld: true });
                        let embed = new Discord.EmbedBuilder()
                        .setColor("Green")
                        .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
                        .setDescription(`> O canal de texto ${message.channel} teve \`${deletableMessages.size}\` mensagens deletadas por \`${message.author.username}\`.`);
                    message.channel.send({ content: `<@${message.author.id}>`, embeds: [embed] });
                } catch (error) {
                    console.log(error)
                    message.reply({ content: '😭 Ocorreu um erro ao tentar deletar as mensagens.', ephemeral: true });
                }
            } else {
                message.reply({ content: 'Não existe mensagens para deletar.', ephemeral: true });
            }
        }
    }
}