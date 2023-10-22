const Discord = require("discord.js");

module.exports = {
  name: "lembrete",
  description: "｢Utilidade｣ Define um lembrete",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "tempo",
      description: "Tempo para o lembrete (30s, 5m, 12h)",
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "mensagem",
      description: "A mensagem do lembrete!",
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    const tempo = interaction.options.getString("tempo");
    const mensagem = interaction.options.getString("mensagem");

    const tempoEmMilissegundos = parseTime(tempo);

    if (tempoEmMilissegundos === null) {
      return interaction.reply("O tempo fornecido é inválido ou excede o limite de 12 horas.");
    }

    try {
      await interaction.user.createDM();
    } catch (error) {
      return interaction.reply("Não foi possível enviar o lembrete. Sua DM está fechada.");
    }

    setTimeout(() => {
      const usuario = interaction.user.id;
      const user = interaction.user;

      const embedLembrete = new Discord.EmbedBuilder()
        .setColor("Random")
        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setTitle("⏰ Lembrete!")
        .setDescription(`${user}, aqui está o seu lembrete:\n\`${mensagem}\``);

      user.send({ embeds: [embedLembrete] }).catch(() => {
      });
    }, tempoEmMilissegundos);

    const embedDefined = new Discord.EmbedBuilder()
      .setColor("Random")
      .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
      .setTitle("Lembrete Definido com sucesso!")
      .setDescription(`Olá ${interaction.user}, o seu lembrete foi definido com sucesso! Vou te lembrar usando a sua DM.`);

    await interaction.reply({ embeds: [embedDefined] });
  },
};

function parseTime(time) {
  const regex = /^(\d+)(s|m|h|d)$/;
  const matches = regex.exec(time);

  if (!matches) return null;

  const amount = parseInt(matches[1]);
  const unit = matches[2];

  switch (unit) {
    case "s":
      return amount * 1000;
    case "m":
      return amount * 60000;
    case "h":
      if (amount > 12) return null;
      return amount * 3600000;
    case "d":
      if (amount > 0) return null;
      return null;
    default:
      return null;
  }
}