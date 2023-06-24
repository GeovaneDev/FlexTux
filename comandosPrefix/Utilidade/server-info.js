const Discord = require("discord.js");

module.exports = {
    name: "server-info",
    aliases: ["server info", "serverinfo"],

  run: async (client, message, args) => {

        let membros = message.guild.memberCount;
        let cargos = message.guild.roles.cache.size;
        let canais = message.guild.channels.cache.size;
        let entrou = message.guild.joinedTimestamp;
        let servidor = message.guild;
        let donoid = message.guild.ownerId;
        let emojis = message.guild.emojis.cache.size;
        let serverid = message.guild.id
        let impulsos = message.guild.premiumSubscriptionCount;
        let data = message.guild.createdAt.toLocaleDateString("pt-br");


        let embed = new Discord.EmbedBuilder()
            .setColor("Blue")
            .setThumbnail(message.guild.iconURL({ dinamyc: true, format: "png", size: 4096 }))
            .setTitle(`Informações do servidor: ${message.guild}`)
            .addFields(
                {
                    name: `Identidade`,
                    value: `\`\`\`${serverid}\`\`\``,
                    inline: true,
                },
                {
                    name: `Canais em geral:`,
                    value: `Canais: ${canais}\n Cargos: ${cargos}`,
                    inline: true,
                },
                {
                    name: `Usuarios`,
                    value: `\`\`\`${membros} membros\`\`\``,
                    inline: true,
                },
                {
                    name: `Servidor criado`,
                    value: `<t:${parseInt(message.guild.createdTimestamp / 1000)}>`,
                    inline: true,
                },
                {
                    name: `🚀 ${message.author.username} entrou em `,
                    value: `<t:${parseInt(servidor.joinedTimestamp / 1000)}:F>`,
                    inline: true,
                },
                {
                    name: `Dono`,
                    value: `<@!${donoid}> \`\`(${donoid})\`\``,
                    inline: true,
                }
            )
        message.reply({ embeds: [embed] })
    }
}