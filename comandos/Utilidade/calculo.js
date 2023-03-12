const Discord = require("discord.js");
const math = require("mathjs");

module.exports = {
  name: "calculo",
  description: "｢Utilidade｣ Faça um cálculo matemático rápido",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "expressao",
      description: "A expressão matemática para calcular",
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    const expressao = interaction.options.getString("expressao");

    if (!expressao) {
      return interaction.reply({
        content: "Por favor, forneça uma expressão matemática para calcular",
        ephemeral: true,
      });
    }

    try {
      const resultado = math.evaluate(expressao);

      const resposta = `Olá ${interaction.user}, aqui o resultado de ${expressao} é ${resultado}`;

      if (resposta.length > 2000) {
        return interaction.reply({
          content: "O resultado é muito longo para ser exibido",
          ephemeral: true,
        });
      }
      
      const embed = new Discord.EmbedBuilder()
      .setColor("Random")
      .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
      .setDescription(`${resposta}`)
      interaction.reply({ embeds: [ embed ], ephemeral: true });
    } catch (error) {
      interaction.reply({
        content: "Houve um erro ao calcular a expressão matemática",
        ephemeral: true,
      });
    }
  },
};
