const Discord = require("discord.js");
const figlet = require("figlet");

module.exports = {
    name: "ascii",
    aliases: [""],

    run: async(client, message, args) => {
        const text = args.join(" ");

        if (!text) {
            const embedUsage = new Discord.EmbedBuilder()
                .setColor("Random")
                .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .setTitle("Uso incorreto do comando")
                .setDescription("Por favor, use o comando da seguinte maneira:\n\n`!ascii <texto>`\n\nExemplo: `!ascii FlexTux`");

            return message.reply({ embeds: [embedUsage] });
        }

        if (text.length > 11) {
            return message.reply(`Olá ${message.author}, o seu texto é muito grande, o limite é de 11 caracteres.`);
        } else {
            figlet(text, function (err, data) {
                if (err) {
                    return message.reply("Erro ao converter texto para ASCII.");
                }

                if (!data) {
                    return message.reply("Texto não encontrado.");
                }

                let embed = new Discord.EmbedBuilder()
                    .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
                    .setColor("Random")
                    .setTitle("Aqui seu texto em ASCII:")
                    .setDescription("```" + data + "```");

                message.reply({ embeds: [embed] });
            });
        }
    }
};
