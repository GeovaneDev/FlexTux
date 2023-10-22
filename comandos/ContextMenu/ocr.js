const Discord = require("discord.js");
const Tesseract = require('tesseract.js');

module.exports = {
  name: "Ler texto da imagem (OCR)",
  type: Discord.ApplicationCommandType.Message,

  run: async (client, interaction) => {
    const attachment = interaction.targetMessage.attachments.first();

    if (!attachment) {
      return interaction.reply({
        content: 'Nenhuma imagem encontrada na mensagem.',
        ephemeral: true,
      });
    }

    const ext = attachment.name.split('.').pop();

    if (!['jpg', 'jpeg', 'png'].includes(ext.toLowerCase())) {
      return interaction.reply({
        content: `A extensão do arquivo enviado precisa ser JPEG, JPG ou PNG.`,
        ephemeral: true,
      });
    }

    await interaction.deferReply();

    const result = await Tesseract.recognize(attachment.url);

    let text = result.data.text.trim();
    if (!text) {
      return interaction.editReply({
        content: 'Nenhum texto foi detectado nessa imagem.',
        ephemeral: true,
      });
    }

    let embed = new Discord.EmbedBuilder()
      .setColor("Random")
      .setTitle(':frame_photo: Resultado OCR:')
      .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
      .setDescription(text);

    interaction.editReply({ embeds: [embed] });
  },
};
