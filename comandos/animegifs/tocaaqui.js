const Discord = require('discord.js')
module.exports = {
    name: "tocaaqui",
    description: `Mande um "toca aqui" para alguém e demonstre carinho!`,
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

        var lista1 = [
            'https://i.imgur.com/QV72Chw.gif',
            'https://i.imgur.com/0gJH8YG.gif',
            'https://i.imgur.com/qC6JZLm.gif',
        ];

        var lista2 = [
            'https://i.imgur.com/0gJH8YG.gif',
            'https://i.imgur.com/qC6JZLm.gif',
            'https://i.imgur.com/QV72Chw.gif',
        ];

        var random1 = lista1[Math.floor(Math.random() * lista1.length)];
        var random2 = lista2[Math.floor(Math.random() * lista2.length)];

        if (user.id === interaction.user.id) {
            const userembed = new Discord.EmbedBuilder()
                .setImage(`${random1}`)
                .setColor("Random")
                .setDescription(`**Como você dar um toca aqui em você mesmo? Aqui, ${client.users.cache.get("944555548148375592")} mandou um toca aqui para${user}**`)
            interaction.reply({ embeds: [userembed] })
            return
        }

        if (user.id === "944555548148375592") { 
            const botembed = new Discord.EmbedBuilder()
                .setDescription(`**Awww, obrigada. ${interaction.user} mandou um toca aqui para ${user}.**`)
                .setImage(`${random1}`)
                .setColor("Random");
            interaction.reply({ embeds: [botembed] });
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