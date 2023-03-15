const Discord = require("discord.js");
const { createCanvas, loadImage } = require('canvas');

module.exports = {
  name: "imagem-stonks",
  description: "｢Diversão｣ Cria uma imagem do meme stonks! (Beta)",
  options: [
    {
      name: "texto",
      description: "Escreva o texto para a imagem.",
      type: Discord.ApplicationCommandOptionType.String,
      required: true
    }
  ],

  run: async (client, interaction) => {
    const text = interaction.options.getString('texto');
    await interaction.deferReply();

    if (text.length > 36) {
      return interaction.editReply({ content: `Olá ${interaction.user}, Por favor escreva um texto com no maximo \`25\` letras`, ephemeral: true })
    } else {

      const canvas = createCanvas(739, 415);
      const ctx = canvas.getContext('2d');

      await new Promise(resolve => setTimeout(resolve, 100));

      const stonks = await loadImage('./imagens/stonks.jpg');

      ctx.drawImage(stonks, 0, 0, canvas.width, canvas.height);

      ctx.font = 'bold 28px sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';

      ctx.fillText(text, 0, 0);

      const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), 'stonks.png');

      await interaction.editReply({ content: `${interaction.user}\n`, files: [attachment] });
    }
  }
}