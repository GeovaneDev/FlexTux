const Discord = require('discord.js');

module.exports = {
    name: "comemorar",
    description: "｢Anime Gifs｣ Comemore algo com alguém!",
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
        const response = await fetch.default("https://api.otakugifs.xyz/gif?reaction=celebrate");
        const data = await response.json();
        const comemorarImageUrl = data.url;

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
                .setImage(comemorarImageUrl)
                .setFooter({text: `Fonte: api.otakugifs.xyz`})
                .setColor("Random")
                .setDescription(`**Eu não acho que comemorar sozinho seja legal... Aqui, ${client.user} está comemorando com ${user}.**`)
            interaction.reply({ embeds: [userembed], components: [buttonDisabled] })
            return
        }
    
        if (user.id === client.user.id) {
            const botembed = new Discord.EmbedBuilder()
                .setDescription(`**${interaction.user} está comemorando com ${user}. Mas o que voê está comemorando?**`)
                .setImage(comemorarImageUrl)
                .setFooter({text: `Fonte: api.otakugifs.xyz`})
                .setColor("Random");
            interaction.reply({ embeds: [botembed], components: [buttonDisabled] });
            return
        }
    
        const embed = new Discord.EmbedBuilder()
            .setDescription(`**${interaction.user} está comemorando com ${user}.**`)
            .setImage(comemorarImageUrl)
            .setFooter({text: `Fonte: api.otakugifs.xyz`})
            .setColor("Random")

        interaction.reply({ embeds: [embed] }).then(() => {
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