const Discord = require("discord.js");
const math = require("mathjs");

module.exports = {
    name: "calc",
    aliases: ["calculadora", "calcular"],

    run(client, message, args) {
        const expressao = args.join(" ");

        if (!expressao) {
            const embedUsage = new Discord.EmbedBuilder()
                .setColor("Random")
                .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .setTitle("Uso incorreto do comando")
                .setDescription("Por favor, use o comando da seguinte maneira:\n\n`!calc <expressão>`\n\nExemplo: `!calc 5+5`");

            return message.reply({ embeds: [embedUsage] });
        }

        try {
            math.parse(expressao);

            const resultado = math.evaluate(expressao);
            const resposta = `> Olá ${message.author}, aqui o resultado de **\`${expressao}\`** é **\`${resultado}\`**.`;

            if (resposta.length > 2000) {
                return message.reply("O resultado é muito longo para ser exibido");
            }

            let embed = new Discord.EmbedBuilder()
                .setColor("Random")
                .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .setDescription(resposta);

            message.reply({ embeds: [embed] });
        } catch (error) {
            message.reply("Houve um erro ao calcular a expressão matemática");
        }
    }
};