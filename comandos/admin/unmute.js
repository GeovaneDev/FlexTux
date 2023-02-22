const Discord = require("discord.js");

module.exports = {
  name: "unmute",
  description: "Remover silenciamento.",
  type: Discord.ApplicationCommandType.ChatInput,

  options: [
    {
      name: "usuário",
      description: "O usuário que você deseja remover o silenciamento.",
      type: Discord.ApplicationCommandOptionType.User,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    const user = interaction.options.getUser("usuário");
    const member = interaction.guild.members.cache.get(user.id);
    const mutedRole = interaction.guild.roles.cache.find(
        (role) => role.name.toLowerCase() === "mute"
    );

    if (!mutedRole) {
      return interaction.reply(
        "Não foi possível encontrar o cargo 'Mute'."
      );
    }

    if (member.roles.cache.has(mutedRole.id)) {
      member.roles.remove(mutedRole.id);
      interaction.reply(`O usuário ${user} foi desmutado.`);
    } else {
      interaction.reply(`O usuário ${user} não está silenciado.`);
    }
  },
};
