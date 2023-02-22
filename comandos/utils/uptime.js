const { ApplicationCommandType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: "uptime",
    description: "Quanto tempo estou online.",
    type: ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {
        let dias = Math.floor(client.uptime / 86400000);
        let horas = Math.floor(client.uptime / 3600000) % 24;
        let minutos = Math.floor(client.uptime / 60000) % 60;
        let segundos = Math.floor(client.uptime / 1000) % 60;
        let embed = new EmbedBuilder()
            .setColor('FF0000')
            .setTitle(`Horário de Inicialização`)
            .setDescription(`Olá ${interaction.user}, eu fui iniciado há: \n\`${dias}d ${horas}h ${minutos}m ${segundos}s\``)
            .setFooter({
                text: `Comando requisitado por: ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL({ format: "png" })
            });

        interaction.reply({ content: `${interaction.user}`, embeds: [embed], ephemeral: true })
    }
}