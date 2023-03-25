const Discord = require("discord.js")
const Canvas = require('canvas')

module.exports = {

    name: "imagem-ednaldo",
    description: "｢Diversão｣ Escreva algo no pano do Ednaldo Pereira.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "texto",
            description: "Escreva o texto para a imagem.",
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        }
    ],

    run: async (client, interaction, args, storage) => {

        let msg = interaction.options.getString('texto')
        await interaction.deferReply();

        if (msg.length >= 25) {
            return interaction.editReply({ content: `<a:alert:1063207714890715256> O texto só pode conter até 25 caracteres`, ephemeral: true })
        }

        const canvas = Canvas.createCanvas(1018, 560)
        const ctx = canvas.getContext("2d")

        const ednaldo = await Canvas.loadImage(`https://i.imgur.com/pzS3ZJH.jpg`)

        ctx.drawImage(ednaldo, 0, 0, canvas.width, canvas.height)
        ctx.font = "48px sans-serif"
        ctx.fillStyle = "#00000";
        if (msg.length < 8) {
            ctx.fillText(`${msg}`, 425, 349) // coordenadas do texto, x = 425 y = 349

            const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), { name: "ednaldo.png" })
            let embedEdnaldo = new Discord.EmbedBuilder()
                .setColor("Green")
                .setDescription(`Olá, ${interaction.user}, Aqui sua imagem do Ednaldo.`)
                .setImage("attachment://ednaldo.png")
            interaction.editReply({ files: [attachment], embeds: [embedEdnaldo] })
        } else {
            ctx.fillText(`${msg}`, 215, 349) // coordenadas do texto, x = 215 y = 349

            const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), { name: "ednaldo.png" })
            let embedEdnaldo = new Discord.EmbedBuilder()
                .setColor("Green")
                .setDescription(`Olá, ${interaction.user}, Aqui sua imagem do Ednaldo.`)
                .setImage("attachment://ednaldo.png")
            interaction.editReply({ files: [attachment], embeds: [embedEdnaldo] })
        }
    }
}