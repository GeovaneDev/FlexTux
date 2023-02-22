const Discord = require('discord.js')
module.exports = {
    name: "beijar",
    description: "Dê um beijinho em alguém!",
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
            'https://imgur.com/II1bakc.gif',
            'https://imgur.com/MzAjNdv.gif',
            'https://imgur.com/eKcWCgS.gif',
            'https://imgur.com/3aX4Qq2.gif',
            'https://imgur.com/uobBW9K.gif',
        ];

        var lista2 = [
            'https://imgur.com/3jzT5g6.gif',
            'https://imgur.com/VrETTlv.gif',
            'https://imgur.com/FozOXkB.gif',
            'https://imgur.com/7GhTplD.gif',
            'https://imgur.com/B6UKulT.gif',
        ];
        var lista3 = [
            'https://i.imgur.com/oHMDPq9.gif',
        ]

        var random1 = lista1[Math.floor(Math.random() * lista1.length)];
        var random2 = lista2[Math.floor(Math.random() * lista2.length)];
        var random3 = lista3[Math.floor(Math.random() * lista3.length)];

        if (user.id === interaction.user.id) {
            const userembed = new Discord.EmbedBuilder()
                .setImage(`${random1}`)
                .setColor("Random")
                .setDescription(`**${interaction.user} beijou... a si mesmo?**`)
            interaction.reply({ embeds: [userembed] })
            return
        }

        if (user.id === "944555548148375592" && interaction.user.id === "691279644468445274") {
            const userembed = new Discord.EmbedBuilder()
                .setImage(`https://i.imgur.com/oHMDPq9.gif`)
                .setColor("Random")
                .setDescription(`**${interaction.user} meu criador em deu um beijo. Obrigada! 😘**`)
            interaction.reply({ embeds: [userembed] })
            return
        }
        else if (user.id === "944555548148375592") { 
            const botembed = new Discord.EmbedBuilder()
                .setDescription(`**Não quero te beijar ${interaction.user}, mas gosto de você com amigo. ❤**`)
                .setColor("Random");
            interaction.reply({ embeds: [botembed] });
            return
        }

        const embed = new Discord.EmbedBuilder()
            .setDescription(`**${interaction.user} Deu um beijo em ${user}.**`)
            .setImage(`${random2}`)
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
            .setDescription(`**${user} Retribuiu o beijo de ${interaction.user}.**`)
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