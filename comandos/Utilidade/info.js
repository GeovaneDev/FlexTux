const Discord = require("discord.js")
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    name: "info",
    description: "Fornece informações sobre o mim.",
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {

        let membros = client.users.cache.size;
        let servidores = client.guilds.cache.size;
        let bot = client.user.username;
        let avatar_bot = client.user.displayAvatarURL({ dynamic: true });
        let mensagem = `Eu fui criado por Geovane(geovanedev).`

        let embed = new Discord.EmbedBuilder()
            .setColor("Random")
            .setAuthor({ name: bot, iconURL: avatar_bot })
            .setFooter({ text: mensagem })
            .setTimestamp(new Date())
            .setThumbnail(avatar_bot)
            .setDescription(`Olá, eu sou o \`${bot}\` meu objetivo é melhorar os servidores de Discord, oferecendo entretenimento, facilidade e muito mais. Atualmente, estou presente em \`${servidores}\` servidores, com \`${membros}\` membros. Desde 5 de janeiro de 2023, venho trabalhando para tornar os servidores ainda melhores.`);

        interaction.reply({ embeds: [embed] })


    }
}