const Discord = require('discord.js');

module.exports = {
    name: "cafune",
    description: "｢Anime Gifs｣ Faça cafuné em alguém para demostrar carinho!",
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
        const response = await fetch.default("https://api.otakugifs.xyz/gif?reaction=pat");
        const data = await response.json();
        const cafuneImageUrl = data.url;

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
                .setImage(cafuneImageUrl)
                .setFooter({text: `Fonte: otakugifs.xyz`})
                .setColor("Random")
                .setDescription(`**Eu não acho que fazer cafuné em você mesmo seja bom... Aqui, ${client.user} Fez cafuné em ${user}.**`)
            interaction.reply({ embeds: [userembed], components: [buttonDisabled] })
            return
        }

        if (user.id === client.user.id) {
            const botembed = new Discord.EmbedBuilder()
                .setDescription(`**Awww, obrigada. ${interaction.user} Fez cafuné em ${user}.**`)
                .setImage(cafuneImageUrl)
                .setFooter({text: `Fonte: otakugifs.xyz`})
                .setColor("Random");
            interaction.reply({ embeds: [botembed], components: [buttonDisabled] });
            return
        }

        const embed = new Discord.EmbedBuilder()
            .setDescription(`**${interaction.user} Fez cafuné em ${user}.**`)
            .setImage(cafuneImageUrl)
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
            .setDescription(`**${user} Retribuiu o cafune de ${interaction.user}.**`)
            .setColor("Random")
            .setImage(cafuneImageUrl)
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