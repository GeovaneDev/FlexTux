const Discord = require('discord.js');

module.exports = {
    name: "palmas",
    description: "｢Anime Gifs｣ Mostre seu apoio a alguém e bata palminhas! 🎉",
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
        const response = await fetch.default("https://api.otakugifs.xyz/gif?reaction=clap");
        const data = await response.json();
        const palmasImageUrl = data.url;

        if (user.id === interaction.user.id) {
            const userembed = new Discord.EmbedBuilder()
                .setImage(palmasImageUrl)
                .setColor("Random")
                .setFooter({ text: "Fonte: api.otakugifs.xyz"})
                .setDescription(`**${interaction.user} bateu palmas... para si mesmo?**`)
            interaction.reply({ embeds: [userembed] })
            return
        }

        else if (user.id === client.user.id) { 
            const botembed = new Discord.EmbedBuilder()
                .setDescription(`**${interaction.user}, por que você está batendo palmas para mim?** `)
                .setColor("Random");
            interaction.reply({ embeds: [botembed] });
            return
        }

        const embed = new Discord.EmbedBuilder()
            .setDescription(`**${interaction.user} bateu palmas para ${user}.**`)
            .setImage(palmasImageUrl)
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
            

        interaction.reply({ embeds: [embed] }).then(() => {
            const filter = i => i.customId === '1' && i.user.id === user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, max: 1 });

            collector.on('collect', async i => {
                if (i.customId === '1') {
                    i.reply({ embeds: [embed1] })
                }
            });
        })
    }
}