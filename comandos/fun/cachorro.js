const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "cachorro",
    description: "Envia uma imagem aleatória de cachorro fofinho.",
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {
        const response = await fetch("https://dog.ceo/api/breeds/image/random");
        const data = await response.json();
        const embed = new Discord.EmbedBuilder()
            .setDescription(`Olá ${interaction.user}, Awww, aqui está uma foto de um cachorrinho fofinho!`)
            .setFooter({text: "Fonte: dog.ceo"})
            .setImage(data.message)
            .setColor("Random");
        await interaction.reply({ embeds: [embed] });
    }
};