const Discord = require("discord.js");

module.exports = {
    name: "lembrete",
    aliases: ["lembrar"],
    description: "｢Utilidade｣ Define um lembrete",

    run(client, message, args) {
        const tempo = args[0];
        const mensagem = args.slice(1).join(" ");

         if (!tempo || !mensagem) {
          const embedUsage = new Discord.EmbedBuilder()
              .setColor("Random")
              .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
              .setTitle("Uso incorreto do comando")
              .setDescription("Por favor, use o comando da seguinte maneira:\n\n`!lembrete <tempo> <mensagem>`\n\nExemplo: `!lembrete 30m Fazer o exercício`");

          return message.reply({ embeds: [embedUsage] });
      }

        const tempoEmMilissegundos = parseTime(tempo);

        setTimeout(() => {
            const embedLembrete = new Discord.EmbedBuilder()
            .setColor("Random")
            .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
                .setTitle("⏰ Lembrete!")
                .setDescription(`${message.author}, aqui está o seu lembrete:\n\`${mensagem}\``);

            message.author.send({ embeds: [embedLembrete] }).catch(() => {});
        }, tempoEmMilissegundos);

        const embedDefined = new Discord.EmbedBuilder()
        .setColor("Random")
        .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
            .setTitle("Lembrete Definido com sucesso!")
            .setDescription(`Olá ${message.author}, o seu lembrete foi definido com sucesso! Vou te lembrar usando a sua DM.`);

        message.reply({ embeds: [embedDefined] });
    },
};

function parseTime(time) {
    const regex = /^(\d+)(s|m|h|d)$/;
    const matches = regex.exec(time);

    if (!matches) return null;

    const amount = parseInt(matches[1]);
    const unit = matches[2];

    switch (unit) {
        case "s":
            return amount * 1000;
        case "m":
            return amount * 60000;
        case "h":
            if (amount > 12) return null;
            return amount * 3600000;
        case "d":
            return null;
        default:
            return null;
    }
}