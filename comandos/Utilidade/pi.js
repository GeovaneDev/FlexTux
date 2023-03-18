const Discord = require("discord.js");

module.exports = {
  name: "pi",
  description: "｢Utilidade｣ Calcule o valor do PI com um número de casas decimais! 🥧",
  type: Discord.ApplicationCommandType.ChatInput,

  options: [
    {
      name: "decimais",
      type: Discord.ApplicationCommandOptionType.Integer,
      description: "Número de casas decimais para mostrar o PI.",
      required: true,
      choices: [
        { name: "1", value: "1" },
        { name: "2", value: "2" },
        { name: "3", value: "3" },
        { name: "4", value: "4" },
        { name: "5", value: "5" },
        { name: "6", value: "6" },
        { name: "7", value: "7" },
        { name: "8", value: "8" },
        { name: "9", value: "9" },
        { name: "10", value: "10" },
        { name: "11", value: "11" },
        { name: "12", value: "12" },
        { name: "13", value: "13" },
        { name: "14", value: "14" },
        { name: "15", value: "15" },
      ],
    },
  ],

  run: async (client, interaction) => {
    const decimals = interaction.options.getInteger("decimais");

    if (decimals > 15) {
      return interaction.reply({
        content: "Desculpe, só posso calcular até 15 casas decimais.",
        ephemeral: true,
      });
    }

    const pi = Math.PI.toFixed(decimals);
    const embed = new Discord.EmbedBuilder()
    .setColor("Random")
    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
    .setDescription(`Olá ${interaction.user}, O valor de PI com ${decimals} casas decimais é: ${pi}`)

    return interaction.reply({ embeds: [embed]});
  },
};
