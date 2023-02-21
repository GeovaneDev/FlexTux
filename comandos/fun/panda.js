const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'panda',
    description: 'Mostra uma imagem aleatória de um panda fofinho.',
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction, app) => {
        const response = await fetch("https://some-random-api.ml/animal/panda");
        const data = await response.json();
        const panImageUrl = data.image;

        const pandaEmbed = new Discord.EmbedBuilder()
            .setColor("Random")
            .setFooter({ text: "Fonte: some-random-api.ml" })
            .setDescription(`Olá ${interaction.user}, Awww, aqui está uma foto de um panda fofinho!`)
            .setImage(panImageUrl)
        await interaction.reply({ embeds: [pandaEmbed] });
    }
};