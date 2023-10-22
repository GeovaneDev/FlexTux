const Discord = require("discord.js");

module.exports = {
  name: "roleta",
  description: "｢Diversão｣ Aposte em um número e veja se você é sortudo(a)!",
  options: [
    {
        name: "russa",
        description: "｢Diversão｣ Aposte em um número e veja se você é sortudo(a)!",
        type: Discord.ApplicationCommandOptionType.Subcommand,
    }
],

  run: async (client, interaction) => {
    
    const random = Math.floor(Math.random() * 6) + 1;

    if (random === 1) {
      const embed = new Discord.EmbedBuilder()
        .setTitle("💥 BANG 💥")
        .setDescription(
          `${interaction.user} perdeu no jogo da roleta-russa. 😵`
        )
        .setColor("Red");
      await interaction.reply({ embeds: [embed] });

    } else {
      const embed = new Discord.EmbedBuilder()
        .setTitle("🔫 CLICK 🔫")
        .setDescription(`${interaction.user} sobreviveu à roleta-russa! 😅`)
        .setColor("Green");
      await interaction.reply({ embeds: [embed] });
    }
  },
};
