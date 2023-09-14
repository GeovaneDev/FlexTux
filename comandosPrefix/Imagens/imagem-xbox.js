const Canvas = require('canvas')
const Discord = require("discord.js")

module.exports = {
    name: "imagem-xbox",
    aliases: ["xbox"],
  
    run: async(client, message, args) => {
      const msg = args.join(" ");
  
          if (!msg) {
              const embedUsage = new Discord.EmbedBuilder()
                  .setColor("Random")
                  .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                  .setTitle("Uso incorreto do comando")
                  .setDescription("Por favor, use o comando da seguinte maneira:\n\n`!imagem-stonks <conquista>`\n\nExemplo: `!imagem-stonks FlexTux online!`");
  
              return message.reply({ embeds: [embedUsage] });
          }
  

        if (msg.length > 25) {
            return await message.reply({ content: `**Por favor escreva um texto com no maximo \`25\` letras**`, ephemeral: true })
        } else {
            const canvas = Canvas.createCanvas(1018, 560)
            const ctx = canvas.getContext("2d")

            const xbox = await Canvas.loadImage(`https://flextuxcdn.pages.dev/imagens/conquistaXbox.png`)

            ctx.drawImage(xbox, 0, 0, canvas.width, canvas.height)
            ctx.font = "48px sans-serif"
            ctx.fillStyle = "#d8d8d8";
            if (msg.length < 8) {
                ctx.fillText(`${msg}`, 425, 349)

                const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), { name: "xbox.png" })
                let embedXbox = new Discord.EmbedBuilder()
                    .setColor("Green")
                    .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                    .setDescription(`> Olá, ${message.author}, Aqui sua imagem da conquista Xbox.`)
                    .setImage("attachment://xbox.png")

                await message.reply({ files: [attachment], embeds: [embedXbox] })
            } else {
                ctx.fillText(`${msg}`, 236, 349)

                const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), { name: "xbox.png" })
                let embedXbox = new Discord.EmbedBuilder()
                    .setColor("Green")
                    .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                    .setDescription(`> Olá, ${message.author}, Aqui sua imagem da conquista Xbox.`)
                    .setImage("attachment://xbox.png")

                await message.reply({ files: [attachment], embeds: [embedXbox] })
            }
        }
    }
}