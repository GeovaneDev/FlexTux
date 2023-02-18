const { ApplicationCommandType, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "sus",
    description: "Mostra uma imagem mt sus.",
    type: ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {
        let sus = "https://i.imgur.com/hKUMowZ.png"

        let embed = new EmbedBuilder()
            .setImage(sus)

        interaction.reply({
            content: `${interaction.user}`,
            embeds: [embed],
            ephemeral: false
        })
    }
}