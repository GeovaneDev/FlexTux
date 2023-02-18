const Discord = require("discord.js");

module.exports = {
  name: "roleta-russa",
  description: "Jogar roleta-russa comigo.",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    const { guild } = interaction;
    const roleName = "Roleta Russa";

    const role = guild.roles.cache.find((r) => r.name === roleName);
    if (!role) {
      return interaction.reply({
        ephemeral: true,
        content: `O cargo ${roleName} não existe neste servidor.`
    });
    }
    const random = Math.floor(Math.random() * 6) + 1;

    if (random === 1) {
      const embed = new Discord.EmbedBuilder()
        .setTitle("💥 BANG 💥")
        .setDescription(
          `${interaction.user} perdeu no jogo da roleta-russa. 😵`
        )
        .setColor("Red");
      await interaction.reply({ embeds: [embed] });

      const role = interaction.guild.roles.cache.find(
        (r) => r.name === "Roleta Russa"
      );
      if (role) {
        const member = interaction.member;
        await member.roles.remove(role);
      }
    } else {
      const embed = new Discord.EmbedBuilder()
        .setTitle("🔫 CLICK 🔫")
        .setDescription(`${interaction.user} sobreviveu à roleta-russa! 😅`)
        .setColor("Green");
      await interaction.reply({ embeds: [embed] });

      const role = interaction.guild.roles.cache.find(
        (r) => r.name === "Roleta Russa"
      );
      if (role) {
        const member = interaction.member;
        await member.roles.add(role);
      }
    }
  },
};
