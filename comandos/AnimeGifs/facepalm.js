const Discord = require('discord.js');

module.exports = {
    name: "facepalm",
    description: "｢Anime Gifs｣ Dê um tapinha na própria testa para alguém que mereça!",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "membro",
            description: "Mencione um membro.",
            type: Discord.ApplicationCommandOptionType.User,
            required: true,
        }
    ],
    run: async (client, interaction, args) => {

        let user = interaction.options.getUser("membro")

        const fetch = await import('node-fetch');
        const response = await fetch.default("https://api.otakugifs.xyz/gif?reaction=facepalm");
        const data = await response.json();
        const facepalmImageUrl = data.url;

        const response2 = await fetch.default("https://api.otakugifs.xyz/gif?reaction=hug");
        const data2 = await response2.json();
        const abracoImageUrl2 = data2.url;

        const buttonDisabled = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.ButtonBuilder()
                .setCustomId('1')
                .setLabel('Retribuir')
                .setStyle(Discord.ButtonStyle.Primary)
                .setDisabled(true)
        )

        if (user.id === interaction.user.id) {
            const userembed = new Discord.EmbedBuilder()
                .setImage(abracoImageUrl2)
                .setFooter({text: `Fonte: otakugifs.xyz`})
                .setColor("Random")
                .setDescription(`**Você está fazendo um facepalm em si mesmo? Não fique triste! Deixa eu te ajudar! ${client.user} deu um abraço para animar o dia de ${user}!**`)
            interaction.reply({ embeds: [userembed], components: [buttonDisabled] })
            return
        }

        if (user.id === client.user.id) {
            const botembed = new Discord.EmbedBuilder()
                .setDescription(`**Oh não, ${interaction.user} enviou um facepalm para mim! Será que fiz algo errado?**`)
                .setImage(facepalmImageUrl)
                .setFooter({text: `Fonte: otakugifs.xyz`})
                .setColor("Random");
            interaction.reply({ embeds: [botembed], components: [buttonDisabled] });
            return
        }

        const embed = new Discord.EmbedBuilder()
            .setDescription(`**${interaction.user} mandou um facepalm para ${user}.**`)
            .setImage(facepalmImageUrl)
            .setFooter({text: `Fonte: otakugifs.xyz`})
            .setColor("Random")

        const button = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId('1')
                    .setLabel('Retribuir')
                    .setStyle(Discord.ButtonStyle.Primary)
                    .setDisabled(false)
            )

        const embed1 = new Discord.EmbedBuilder()
            .setDescription(`**${user} retribuiu o facepalm de ${interaction.user}... parece que essa conversa não está indo muito bem. Vamos tentar manter a calma.**`)
            .setColor("Random")
            .setImage(facepalmImageUrl)
            .setFooter({text: `Fonte: otakugifs.xyz`})

        interaction.reply({ embeds: [embed], components: [button] }).then(() => {
            const filter = i => i.customId === '1' && i.user.id === user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, max: 1 });

            collector.on('collect', async i => {
                if (i.customId === '1') {
                    i.reply({ embeds: [embed1] })
                }
            });

            collector.on("end", () => {
                interaction.editReply({
                    components: [
                        new Discord.ActionRowBuilder()
                            .addComponents(
                                new Discord.ButtonBuilder()
                                    .setCustomId('1')
                                    .setLabel('Retribuir')
                                    .setStyle(Discord.ButtonStyle.Primary)
                                    .setDisabled(true)
                            )
                    ]
                })
            })
        })
    }
}