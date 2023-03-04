const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'letra',
    description: 'Veja a letra de uma música.',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'artista',
            description: 'Digite o nome do artista.',
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'musica',
            description: 'Digite o nome da música.',
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        }
    ],

    async run(client, interaction) {
        const artista = interaction.options.getString('artista');
        const musica = interaction.options.getString('musica');
        try {
            const info = await fetch(`https://api.vagalume.com.br/search.php?art=${artista}&mus=${musica}`).then(res => res.json());
            const letra = info.mus[0].text;
            interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setTitle(`🎶 - Letra da música ${info.mus[0].name} do artista ${info.art.name}`)
                        .setDescription(`${letra.replace(/\r?\n/g, '\n')}`)
                        .setColor('Random')
                        .setFooter({ text: `Fonte: vagalume.com.br`})
                        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynmiac: true }) })
                        .setTimestamp()
                ]
            });
        } catch (error) {
            console.error(error);
            interaction.reply('Ocorreu um erro ao tentar obter a letra da música.');
        }
    }
};