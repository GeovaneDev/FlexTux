const Discord = require("discord.js");
const Canvas = require('canvas');

module.exports = {
  name: "mememaker",
  description: "｢Imagem｣ Crie um meme personalizado.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "imagem",
      description: "Envie uma imagem (formatos suportados: PNG, JPEG, JPG)",
      type: Discord.ApplicationCommandOptionType.Attachment,
      required: true,
    },
    {
      name: "texto_superior",
      description: "Insira o texto superior da imagem.",
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "texto_inferior",
      description: "Insira o texto inferior da imagem.",
      type: Discord.ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: "cor",
      description: "Escolha a cor do texto.",
      type: Discord.ApplicationCommandOptionType.String,
      required: false,
      choices: [
        { name: "Preto", value: "#000000" },
        { name: "Branco", value: "#ffffff" },
        { name: "Vermelho", value: "#ff0000" },
        { name: "Verde", value: "#00ff00" },
        { name: "Azul", value: "#0000ff" },
        { name: "Amarelo", value: "#ffff00" },
        { name: "Rosa", value: "#ff00ff" },
        { name: "Ciano", value: "#00ffff" },
        { name: "Laranja", value: "#ff8c00" },
        { name: "Roxo", value: "#800080" },
        { name: "Marrom", value: "#8b4513" },
        { name: "Cinza", value: "#808080" },
        { name: "Prata", value: "#c0c0c0" },
        { name: "Dourado", value: "#ffd700" },
        { name: "Lima", value: "#00ff00" },
        { name: "Aqua", value: "#00ffff" },
        { name: "Teal", value: "#008080" },
        { name: "Oliva", value: "#808000" },
        { name: "Índigo", value: "#4b0082" },
        { name: "Magenta", value: "#ff00ff" },
      ],
    },
  ],

  run: async (client, interaction) => {
    await interaction.deferReply();
    const imagem = interaction.options.getAttachment("imagem");
    const textoSuperior = interaction.options.getString("texto_superior");
    const textoInferior = interaction.options.getString("texto_inferior") || " ";
    let cor = interaction.options.getString("cor");
    if (!cor) {
      cor = "#000000";
    }
    const validExtensions = [".png", ".jpeg", ".jpg"];
    const fileExtension = imagem.name.slice(imagem.name.lastIndexOf(".")).toLowerCase();
    if (!validExtensions.includes(fileExtension)) {
      return await interaction.editReply("Formato de arquivo inválido. Envie uma imagem nos formatos suportados: PNG, JPEG, JPG.");
    }
    const image = await Canvas.loadImage(imagem.url);

    const maxWidth1 = 1920;
    const maxHeight = 1080;
 
    if (image.width > maxWidth1 || image.height > maxHeight) {
     return await interaction.editReply("A imagem é muito grande. Por favor, envie uma imagem com dimensões menores.");
    }

    const canvas = Canvas.createCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const fontSize = Math.floor(canvas.width / 10);
    const fontFamily = "Arial";
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.fillStyle = cor;
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.textAlign = "center";

    const adjustFontSize = (text, maxWidth) => {
      let fontSize = 130;

      while (ctx.measureText(text).width > maxWidth) {
        fontSize--;
        ctx.font = `${fontSize}px ${fontFamily}`;
      }

      return fontSize;
    };

    const maxWidth = canvas.width - 50;
    const adjustedFontSizeSuperior = adjustFontSize(textoSuperior, maxWidth);
    ctx.font = `${adjustedFontSizeSuperior}px ${fontFamily}`;
    ctx.fillText(textoSuperior, canvas.width / 2, adjustedFontSizeSuperior, maxWidth);
    ctx.strokeText(textoSuperior, canvas.width / 2, adjustedFontSizeSuperior, maxWidth);
    const adjustedFontSizeInferior = adjustFontSize(textoInferior, maxWidth);
    ctx.font = `${adjustedFontSizeInferior}px ${fontFamily}`;
    ctx.fillText(textoInferior, canvas.width / 2, canvas.height - 20, maxWidth);
    ctx.strokeText(textoInferior, canvas.width / 2, canvas.height - 20, maxWidth);
    const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), { name: "meme.png" });

    let embed = new Discord.EmbedBuilder()
    .setColor("Random")
    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
    .setTitle("Meme Maker")
    .setDescription(`Aqui ${interaction.user} seu meme customizado!`)
    .setImage("attachment://meme.png");

    await interaction.editReply({ files: [attachment], embeds: [embed] });
  },
};