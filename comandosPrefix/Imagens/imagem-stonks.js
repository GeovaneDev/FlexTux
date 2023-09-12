const Discord = require("discord.js");
const { createCanvas, loadImage } = require('canvas');

module.exports = {
  name: "imagem-stonks",
  aliases: ["stonks"],

  run: async(client, message, args) => {
    const text = args.join(" ");

        if (!text) {
            const embedUsage = new Discord.EmbedBuilder()
                .setColor("Random")
                .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .setTitle("Uso incorreto do comando")
                .setDescription("Por favor, use o comando da seguinte maneira:\n\n`!imagem-stonks <texto>`\n\nExemplo: `!imagem-stonks FlexTux`");

            return message.reply({ embeds: [embedUsage] });
        }

    if (text.length > 36) {
      return message.reply({ content: `Olá ${message.author}, Por favor escreva um texto com no maximo \`25\` letras`, ephemeral: true })
    } else {

      const canvas = createCanvas(739, 415);
      const ctx = canvas.getContext('2d');

      await new Promise(resolve => setTimeout(resolve, 100));

      const stonks = await loadImage('./imagens/stonks.jpg');

      ctx.drawImage(stonks, 0, 0, canvas.width, canvas.height);

      ctx.font = 'bold 30px sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';

      ctx.fillText(text, 10, 10);

      const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), { name: "stonks.png" })

      let embed = new Discord.EmbedBuilder()
        .setColor("Green")
        .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        .setDescription(`> Olá, ${message.author}, Aqui sua imagem do meme Stonks.`)
        .setImage("attachment://stonks.png")

      await message.reply({ files: [attachment], embeds: [embed] })
    }
  }
}