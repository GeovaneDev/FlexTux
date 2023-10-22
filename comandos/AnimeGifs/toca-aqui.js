const Discord = require('discord.js');

module.exports = {
    name: "toca",
    description: `｢Anime Gifs｣ Mande um "toca aqui" para alguém e demonstre carinho!`,
    options: [
        {
            name: "aqui",
            description: `｢Anime Gifs｣ Mande um "toca aqui" para alguém e demonstre carinho!`,
            type: Discord.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "membro",
                    description: "Mencione um membro.",
                    type: Discord.ApplicationCommandOptionType.User,
                    required: true,
                }
            ],
        }
    ],
    
    run: async (client, interaction, args) => {

        let user = interaction.options.getUser("membro")

        var lista1 = [
            'https://flextuxcdn.pages.dev/imagens/QV72Chw.gif',
            'https://flextuxcdn.pages.dev/imagens/0gJH8YG.gif',
            'https://flextuxcdn.pages.dev/imagens/qC6JZLm.gif',
        ];

        var lista2 = [
            'https://flextuxcdn.pages.dev/imagens/0gJH8YG.gif',
            'https://flextuxcdn.pages.dev/imagens/qC6JZLm.gif',
            'https://flextuxcdn.pages.dev/imagens/QV72Chw.gif',
        ];

        var random1 = lista1[Math.floor(Math.random() * lista1.length)];
        var random2 = lista2[Math.floor(Math.random() * lista2.length)];

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
                .setImage(`${random1}`)
                .setColor("Random")
                .setDescription(`**Como você dar um toca aqui em você mesmo? Aqui, ${client.user} mandou um toca aqui para${user}**`)
            interaction.reply({ embeds: [userembed], components: [buttonDisabled] })
            return
        }

        const embed = new Discord.EmbedBuilder()
            .setDescription(`**${interaction.user} mandou um toca aqui para ${user}.**`)
            .setImage(`${random1}`)
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
            .setDescription(`**${user} Retribuiu o toca aqui de ${interaction.user}.**`)
            .setColor("Random")
            .setImage(`${random2}`)

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