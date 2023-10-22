const Discord = require("discord.js");

module.exports = {
  name: "Ver avatar",
  type: Discord.ApplicationCommandType.User,

  run: async (client, interaction) => {
    let user = interaction.targetUser;

    const button = new Discord.ButtonBuilder()
      .setLabel("Abrir avatar no navegador")
      .setStyle(Discord.ButtonStyle.Link)
      .setURL(user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }));

    const buttonAvatar = new Discord.ActionRowBuilder().addComponents(button);

    let avatar = user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 });
    let embed = new Discord.EmbedBuilder()
      .setTitle(`🖼・Avatar de ${user.username}`)
      .setDescription(`> Aqui ${interaction.user} o avatar de ${user.username}!`)
      .setColor("Random")
      .setImage(avatar);

    interaction.reply({ embeds: [embed], components: [buttonAvatar] });
  },
};
