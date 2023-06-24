const Discord = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    name: "beijar",
    description: "｢Anime Gifs｣ Dê um beijinho em alguém!",
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
        const response = await fetch.default("https://api.otakugifs.xyz/gif?reaction=kiss");
        const data = await response.json();
        const beijoImageUrl = data.url;

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
                .setImage(`${beijoImageUrl}`)
                .setColor("Random")
                .setFooter({ text: "Fonte: api.otakugifs.xyz"})
                .setDescription(`**${interaction.user} beijou... a si mesmo?**`)
            interaction.reply({ embeds: [userembed], components: [buttonDisabled] })
            return
        }

        if (user.id === client.user.id && interaction.user.id === process.env.DONO_ID) {
            const userembed = new Discord.EmbedBuilder()
                .setImage(`https://i.imgur.com/oHMDPq9.gif`)
                .setColor("Random")
                .setDescription(`**${interaction.user} meu criador em deu um beijo. Obrigada! 😘**`)
            interaction.reply({ embeds: [userembed], components: [buttonDisabled] })
            return
        }
        else if (user.id === client.user.id) { 
            const botembed = new Discord.EmbedBuilder()
                .setDescription(`**Não quero te beijar ${interaction.user}, mas gosto de você com amigo. ❤**`)
                .setColor("Random");
            interaction.reply({ embeds: [botembed], components: [buttonDisabled] });
            return
        }

        const embed = new Discord.EmbedBuilder()
            .setDescription(`**${interaction.user} Deu um beijo em ${user}.**`)
            .setImage(`${beijoImageUrl}`)
            .setFooter({ text: "Fonte: api.otakugifs.xyz"})
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
            .setFooter({ text: "Fonte: api.otakugifs.xyz"})
            .setImage(`${beijoImageUrl}`)

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