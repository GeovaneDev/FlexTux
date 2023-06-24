const Discord = require("discord.js")

module.exports = {
    name: "ping",
    aliases: [""],

    run: async(client, message, args) => {

    let ping = client.ws.ping;

    let embed = new Discord.EmbedBuilder()
      .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
      .setDescription(`> Olá ${message.author}\n\n> Meu ping está em \`${ping}ms\`.`)
      .setColor("Random");

    message.reply({ embeds: [embed] })
    }
}