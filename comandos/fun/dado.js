const Discord = require("discord.js");

module.exports = {
  name: "dado",
  description: "Jogue um dado de seis lados.",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    const roll = Math.floor(Math.random() * 6) + 1;
    let embed = new Discord.EmbedBuilder()
    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
    .setDescription(`💱 **Jogando o dado para o alto...**`)
    .setColor("Green");
interaction.reply({ embeds: [embed] }).then(msg => {

    setTimeout(() => {

    const embed1 = new Discord.EmbedBuilder()
    .setTitle("Dado de seis lados")
    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
    .setDescription(`O resultado foi: **${roll}**`)
    .setColor("Random");
    interaction.editReply({ embeds: [embed1] })
    }, 3000)
    })
  }
}
