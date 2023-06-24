const Discord = require('discord.js');

module.exports = {
    name: "uptime",
    aliases: [],

    run: async (client, message, args) => {
        const uptime = client.uptime;
        const dias = Math.floor(uptime / 86400000);
        const horas = Math.floor(uptime / 3600000) % 24;
        const minutos = Math.floor(uptime / 60000) % 60;
        const segundos = Math.floor(uptime / 1000) % 60;

        const embed = new Discord.EmbedBuilder()
            .setColor("Random")
            .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
            .setDescription(`> Olá ${message.author}\n\n> Eu estou online há:\`${dias}\` dias, \`${horas}\` horas, \`${minutos}\` minutos e \`${segundos}\` segundos.`);

        message.reply({ embeds: [embed] });
    },
};
