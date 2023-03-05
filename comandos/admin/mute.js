const Discord = require("discord.js");

module.exports = {
  name: "mute",
  description: "Silenciar um usuário.",
  type: Discord.ApplicationCommandType.ChatInput,
  
  options: [
    {
      name: "usuário",
      description: "Usuário para ser silenciado.",
      type: Discord.ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: "tempo",
      description: "Tempo em segundos para o usuário ficar silenciado.",
      type: Discord.ApplicationCommandOptionType.Integer,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    const member = interaction.options.getMember("usuário");
    const seconds = interaction.options.getInteger("tempo");
    const reason = `Silenciado por ${interaction.user.tag}`;

    if (!member) {
      return interaction.reply({
        content: "Usuário não encontrado.",
        ephemeral: true,
      });
    }

    if (!member.manageable) {
      return interaction.reply({
        content: "Não tenho permissão para silenciar este usuário.",
        ephemeral: true,
      });
    }

    const mutedRole = interaction.guild.roles.cache.find(
      (role) => role.name.toLowerCase() === "Mutado"
    );

    if (!mutedRole) {
      return interaction.reply({
        content:
          "Não encontrei o cargo `Mutado`. Por favor, crie um cargo com esse nome e tente novamente.",
        ephemeral: true,
      });
    }

    if (member.roles.cache.has(mutedRole.id)) {
      return interaction.reply({
        content: "Usuário já está silenciado.",
        ephemeral: true,
      });
    }

    await member.roles.add(mutedRole, reason);
    interaction.reply({
      content: `${member} foi silenciado por ${seconds} segundos.`,
    });

    setTimeout(() => {
      member.roles.remove(mutedRole, "Tempo de silenciamento expirado.");
    }, seconds * 1000);
  },
};
