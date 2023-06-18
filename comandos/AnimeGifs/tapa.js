const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
    name: "tapa",
    description: "｢Anime Gifs｣ Dê um tapa em alguém (virtualmente, claro!) que mereça!",
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

        const response = await fetch("https://api.otakugifs.xyz/gif?reaction=slap");
        const data = await response.json();
        const tapamImageUrl = data.url;

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
                .setImage(`${tapamImageUrl}`)
                .setColor("Random")
                .setDescription(`**${user}... se deu um tapa?**`)

            interaction.reply({ embeds: [userembed], components: [buttonDisabled] })
            return
        }

        if (user.id === client.user.id) {
            const botembed = new Discord.EmbedBuilder()
                .setDescription(`**Aii, isso doeu em. ${interaction.user} Deu um tapa em ${user}.**`)
                .setImage(`${tapamImageUrl}`)
                .setColor("Random");

            interaction.reply({ embeds: [botembed], components: [buttonDisabled] });
            return
        }

        const embed = new Discord.EmbedBuilder()
            .setDescription(`**${interaction.user} Deu um tapa em ${user}.**`)
            .setImage(`${tapamImageUrl}`)
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
            .setDescription(`**${user} Retribuiu o tapa de ${interaction.user}.**`)
            .setColor("Random")
            .setImage(`${tapamImageUrl}`)

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