const Discord = require("discord.js");

module.exports = {
    name: "user-avatar",
    aliases: ["useravatar"],

    run: async (client, message, args) => {
        let user;
    if (!args[0]) {
      user = message.author;
    } else if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else if (!isNaN(args[0])) {
      user = await client.users.fetch(args[0]).catch(() => null);
    }
    
    if (!user) {
        const embedUsage = new Discord.EmbedBuilder()
        .setColor("Random")
        .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
        .setTitle("Uso incorreto do comando")
        .setDescription("Por favor, use o comando da seguinte maneira:\n\n`!useravatar <@usuário/Id do Usuário/Vazio>`\n\nExemplo: `!useravatar 691279644468445274`");

    return message.reply({ embeds: [embedUsage] });
    }

        const button = new Discord.ButtonBuilder()
            .setLabel("Abrir avatar no navegador")
            .setStyle(Discord.ButtonStyle.Link)
            .setURL(user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }));

        const buttonAvatar = new Discord.ActionRowBuilder().addComponents(button);

        let avatar = user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 });

        const embed = new Discord.EmbedBuilder()
            .setTitle(`🖼️ Avatar de ${user.username}`)
            .setDescription(`> ${message.author}, aqui está o avatar de ${user.username}!`)
            .setColor("Random")
            .setImage(avatar);

        message.reply({ embeds: [embed], components: [buttonAvatar] });
    },
};