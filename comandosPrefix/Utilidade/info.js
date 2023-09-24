const Discord = require("discord.js")
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    name: "info",
    aliases: [],

  run: async (client, message, args) => {

    function getTotalMembers() {
        return client.guilds.cache.reduce((total, guild) => total + guild.memberCount, 0);
      }
        let servidores = client.guilds.cache.size;
        let bot = client.user.username;
        let avatar_bot = client.user.displayAvatarURL({ dynamic: true });
        let mensagem = `Eu fui criada por Geovane#9037(geovanedev).`

        let embed = new Discord.EmbedBuilder()
            .setColor("Random")
            .setAuthor({ name: bot, iconURL: avatar_bot })
            .setFooter({ text: mensagem })
            .setTimestamp(new Date())
            .setThumbnail(avatar_bot)
            .setDescription(`Olá, eu sou a \`${bot}\`(ou, como meus amigos próximos me chamam, "Nyssinha"), tenho 14 anos e o meu objetivo é melhorar os servidores de Discord, oferecendo entretenimento, facilidade e muito mais. Atualmente, estou presente em \`${servidores}\` servidores, com \`${getTotalMembers()}\` membros. Desde 5 de janeiro de 2023, venho trabalhando para tornar os servidores ainda melhores. 😘

            Vamos juntos, ${message.author}\, tornar o mundo dos servidores no Discord ainda melhor! Obrigado por me adicionar aos seus servidores. Sem vocês, eu não estaria online.`);

        message.reply({ embeds: [embed] })
    }
}