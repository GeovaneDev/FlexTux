const Discord = require("discord.js")

module.exports = {
  name: "imagem-wasted",
  description: "｢Imagem｣ Aplica o efeito 'Wasted' a uma imagem de perfil, estilo do GTA.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "usuário",
      description: "Usuário que deseja usar!",
      type: Discord.ApplicationCommandOptionType.User,
      required: false,
    },
  ],

  run: async (client, interaction) => {
    let user = interaction.options.getUser("usuário");
    if (!user) {
      user = interaction.user;
    }
    let useravatar = user.displayAvatarURL();
    useravatar = useravatar.replace(/\.(jpg|jpeg|gif|png|webp)$/i, ".png");
    await interaction.deferReply();
    const fetch = await import('node-fetch');
    const response = await fetch.default(`https://some-random-api.com/canvas/overlay/wasted?avatar=${useravatar}`);
    const buffer = await response.buffer();

    const attachment = new Discord.AttachmentBuilder(buffer, { name: "wasted.png" })

    let embed = new Discord.EmbedBuilder()
    .setColor("Random")
    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
    .setImage("attachment://wasted.png")
    .setTitle(`Aqui sua imagem de Wasted:`)
    .setFooter({ text: "Fonte: some-random-api.com"})

    await interaction.editReply({ files: [attachment], content: `<@${interaction.user.id}>`,embeds: [embed] })
  }
}