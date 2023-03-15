const Discord = require('discord.js');

module.exports = {
    name: "uptime",
    description: "｢Utilidade｣ Quanto tempo estou online.",
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {
        let dias = Math.floor(client.uptime / 86400000);
        let horas = Math.floor(client.uptime / 3600000) % 24;
        let minutos = Math.floor(client.uptime / 60000) % 60;
        let segundos = Math.floor(client.uptime / 1000) % 60;
        let embed = new Discord.EmbedBuilder()
            .setColor("Random")
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setDescription(`> Olá ${interaction.user}\n\n> Eu estou online há:\`${dias}\` dias, \`${horas}\` horas, \`${minutos}\` minutos e \`${segundos}\` segundos.`)

        interaction.reply({ embeds: [embed], ephemeral: true })
    }
}