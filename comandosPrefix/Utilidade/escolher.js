const Discord = require("discord.js");

module.exports = {
    name: "escolher",
    aliases: [],
    
    run(client, message, args) {
        const escolha1 = args[0];
        const escolha2 = args[1];

        if (!escolha1 || !escolha2) {
            const embedUsage = new Discord.EmbedBuilder()
              .setColor("Random")
              .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
              .setTitle("Uso incorreto do comando")
              .setDescription("Por favor, use o comando da seguinte maneira:\n\n`!escolher <escolha1> <escolha2>`\n\nExemplo: `!escolher gatos cachorros`");

          return message.reply({ embeds: [embedUsage] });
        }

        const escolhas = [escolha1, escolha2];
        const randomIndex = Math.floor(Math.random() * escolhas.length);
        const escolhida = escolhas[randomIndex];

        let embed = new Discord.EmbedBuilder()
            .setColor("Random")
            .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
            .setDescription(`Olá ${message.author}, eu escolhi...\n||\`\`\`${escolhida}\`\`\`|| Espero que você esteja feliz com a escolha.`);

        message.reply({ embeds: [embed] });
    }
};
