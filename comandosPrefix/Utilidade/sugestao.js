const Discord = require("discord.js");
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    name: "sugestao",
    aliases: ["sugerir"],

    run: async (client, message, args) => {
        if (!message.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
            message.reply(`Você não possui permissão para utilizar este comando.`);
            return;
        }

        message.reply(`Olá ${message.author}, Obrigado pela Sugestão!`);

        const sugestao = args.join(" ");
        if (!sugestao) {
            const embedUsage = new Discord.EmbedBuilder()
                .setColor("Random")
                .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
                .setTitle("Uso incorreto do comando")
                .setDescription("Por favor, use o comando da seguinte maneira:\n\n`!sugestao <sugestão>`\n\nExemplo: `!sugestao Melhorar o comando...`");
      
            return message.reply({ embeds: [embedUsage] });
        }
        const webhookUrl = process.env.WEBHOOK_SUGESTAO;
        const webhook = new Discord.WebhookClient({
            url: webhookUrl
        });

        let embed = new Discord.EmbedBuilder()
        .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        .setTitle(`Nova sugestão!`)
        .setDescription(`**Sugestão:\n ${sugestao}**`)
        .setColor("Random")

        await webhook.send({
            embeds: [embed]
        });
    }
}