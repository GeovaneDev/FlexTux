const Discord = require("discord.js");

module.exports = {
    name: "limpar",
    description: "｢Admin｣ Limpar o canal de texto.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'quantidade',
            description: 'Número de mensagens para serem apagadas.',
            type: Discord.ApplicationCommandOptionType.Number,
            required: true,
        }
    ],

    run: async (client, interaction) => {
        let numero = interaction.options.getNumber('quantidade')
        await interaction.deferReply({ ephemeral: true });

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
            await interaction.editReply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
            return
        } else if (parseInt(numero) > 100 || parseInt(numero) <= 0) {
            let embed = new Discord.EmbedBuilder()
                .setColor("Random")
                .setDescription(`Olá, ${interaction.user} Utilize números entre 1 e 100`)
                .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });
            await interaction.editReply({ embeds: [embed], ephemeral: true })
            return
        } else {
            const now = new Date().getTime();
            const messages = await interaction.channel.messages.fetch({ limit: numero });
            const deletableMessages = messages.filter(msg => now - msg.createdTimestamp <= 14 * 24 * 60 * 60 * 1000);
            const nonDeletableMessages = messages.filter(msg => now - msg.createdTimestamp > 14 * 24 * 60 * 60 * 1000);
            if (nonDeletableMessages.size > 0) {
                let embed = new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setDescription("> Você só pode deletar mensagens com menos de 14 dias.");
                await interaction.editReply({ embeds: [embed] });
            }
            if (deletableMessages.size > 0) {
                try {
                    await interaction.channel.bulkDelete(deletableMessages, { filterOld: true });
                    let embed = new Discord.EmbedBuilder()
                        .setColor("Green")
                        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                        .setDescription(`> O canal de texto ${interaction.channel} teve \`${deletableMessages.size}\` mensagens deletadas por \`${interaction.user.username}\`.`);
                    await interaction.editReply({ embeds: [embed] });

                    let deletarmensagens = "false"; // Se estiver definido como "true" as mensagens seram deletadas, caso não o código sertá ignorado.

                    if (deletarmensagens === "true") {
                    setTimeout(() => {
                        interaction.deleteReply();
                    }, 5000);
                }
                } catch (error) {
                    console.error(error);
                    interaction.editReply({ content: '😭 Ocorreu um erro ao tentar deletar as mensagens.', ephemeral: true });
                }
            } else {
                interaction.editReply({ content: 'Não existe mensagens para deletar.', ephemeral: true });
            }
        }
    }
}