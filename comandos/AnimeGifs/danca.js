const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
    name: "dança",
    description: "｢Anime Gifs｣ Dançe com alguém!",
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

        const response = await fetch("https://api.otakugifs.xyz/gif?reaction=dance");
        const data = await response.json();
        const dancarImageUrl = data.url;

        if (user.id === interaction.user.id) {
            const userembed = new Discord.EmbedBuilder()
                .setImage(dancarImageUrl)
                .setFooter({text: `Fonte: api.otakugifs.xyz`})
                .setColor("Random")
                .setDescription(`**Eu não acho que dançar sozinho seja legal... Aqui, ${client.user} está dançando com ${user}.**`)
            interaction.reply({ embeds: [userembed] })
            return
        }
    
        if (user.id === client.user.id) {
            const botembed = new Discord.EmbedBuilder()
                .setDescription(`**Awww, obrigada. ${interaction.user} está dançando com ${user}.**`)
                .setImage(dancarImageUrl)
                .setFooter({text: `Fonte: api.otakugifs.xyz`})
                .setColor("Random");
            interaction.reply({ embeds: [botembed] });
            return
        }
    
        const embed = new Discord.EmbedBuilder()
            .setDescription(`**${interaction.user} está dançando com ${user}.**`)
            .setImage(dancarImageUrl)
            .setFooter({text: `Fonte: api.otakugifs.xyz`})
            .setColor("Random")

        interaction.reply({ embeds: [embed] }).then(() => {
            const filter = i => i.customId === '1' && i.user.id === user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, max: 1 });
        })
    }
}