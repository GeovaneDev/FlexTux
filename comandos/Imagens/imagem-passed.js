const Discord = require("discord.js")
const fetch = require("node-fetch");

module.exports = {
  name: "imagem-passed",
  description: "｢Imagem｣ Aplica o efeito 'passed' a uma imagem de perfil, estilo GTA",
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
    const response = await fetch(`https://some-random-api.com/canvas/overlay/passed?avatar=${useravatar}`);
    const buffer = await response.buffer();

    const attachment = new Discord.AttachmentBuilder(buffer, { name: "passed.png" })

    let embed = new Discord.EmbedBuilder()
    .setColor("Random")
    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
    .setImage("attachment://passed.png")
    .setTitle(`Aqui sua imagem de passed do GTA SA:`)
    .setFooter({ text: "Fonte: some-random-api.com"})

    await interaction.editReply({ files: [attachment], content: `<@${interaction.user.id}>`,embeds: [embed] })
  }
}