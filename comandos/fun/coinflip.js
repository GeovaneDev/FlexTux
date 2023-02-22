const Discord = require("discord.js")

module.exports = {
    name: "coinflip",
    description: "Jogue cara ou coroa para ver quem vence!",
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {
        let running = new Discord.EmbedBuilder()
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setDescription(`💱 **Jogando a moeda para o alto...**`)
            .setColor("Green");
        interaction.reply({ embeds: [running] }).then(msg => {
            setTimeout(() => {
                let num = Math.random();
                if (num < 0.5) {
                    let cara = new Discord.EmbedBuilder()
                        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                        .setDescription(`💱 **Cara!**`)
                        .setColor("Green");
                    interaction.editReply({ embeds: [cara] })
                } else {
                    let coroa = new Discord.EmbedBuilder()
                        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                        .setDescription(`💱 **Coroa!**`)
                        .setColor("Green");
                    interaction.editReply({ embeds: [coroa] })
                }
            }, 3000)
        }
        )
    }
}
