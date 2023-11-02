const Discord = require("discord.js");
const axios = require("axios");

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

    const apiUrl = `https://flextux-ocr-api.onrender.com/?image=${encodeURIComponent(attachment.url)}`;

    try {
      const response = await axios.get(apiUrl, { timeout: 30000 });

      if (response.status === 200) {
        const data = response.data;

        if (data.text) {
          let embed = new Discord.EmbedBuilder()
            .setColor("Random")
            .setTitle(':frame_photo: Resultado OCR:')
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
            .setDescription(data.text);

          interaction.editReply({ embeds: [embed] });
        } else {
          interaction.editReply({
            content: 'Nenhum texto foi detectado nessa imagem.',
            ephemeral: true,
          });
        }
      } else {
        interaction.editReply({
          content: 'Ocorreu um erro ao processar a imagem.',
          ephemeral: true,
        });
      }
    } catch (error) {
      console.error(error);
      interaction.editReply({
        content: 'Ocorreu um erro ao processar a imagem.',
        ephemeral: true,
      });
    }
  },
};
