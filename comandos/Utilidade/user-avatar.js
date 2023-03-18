const Discord = require("discord.js");

module.exports = {
    name: "user-avatar",
    description: "｢Utilidade｣ Mostra o avatar de um usuário.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "user",
            description: "Mencione o usuário.",
            type: Discord.ApplicationCommandOptionType.User,
            required: false,
        },
    ],

    run: async (client, interaction) => {

        let user = interaction.options.getUser('user') || interaction.user;

        const button = new Discord.ButtonBuilder()
            .setLabel("Abrir avatar no navegador")
            .setStyle(Discord.ButtonStyle.Link)
            .setURL(user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }));

        const buttonAvatar = new Discord.ActionRowBuilder().addComponents(button);

        let avatar = user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 })

        let embed = new Discord.EmbedBuilder()
            .setTitle(`🖼・Avatar de ${user.username}`)
            .setDescription(`> Aqui ${interaction.user} o avatar de ${user.username}!`)
            .setColor('#ef53ff')
            .setImage(avatar)

        interaction.reply({ embeds: [embed], components: [buttonAvatar] })

    }
}