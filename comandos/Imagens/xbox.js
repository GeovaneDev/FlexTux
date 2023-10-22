const Canvas = require('canvas')
const Discord = require("discord.js")

module.exports = {
    name: "xbox",
    description: "｢Imagem｣ Desbloqueie uma conquista do Xbox. (Beta)",
    options: [
        {
            name: "conquista",
            description: "Mande sua conquista!",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    run: async (client, interaction, args, storage) => {
        let msg = interaction.options.getString('conquista')
        await interaction.deferReply();

        if (msg.length > 25) {
            return await interaction.editReply({ content: `**Por favor escreva um texto com no maximo \`25\` letras**`, ephemeral: true })
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
                    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                    .setDescription(`> Olá, ${interaction.user}, Aqui sua imagem da conquista Xbox.`)
                    .setImage("attachment://xbox.png")

                await interaction.editReply({ files: [attachment], embeds: [embedXbox] })
            } else {
                ctx.fillText(`${msg}`, 236, 349)

                const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), { name: "xbox.png" })
                let embedXbox = new Discord.EmbedBuilder()
                    .setColor("Green")
                    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                    .setDescription(`> Olá, ${interaction.user}, Aqui sua imagem da conquista Xbox.`)
                    .setImage("attachment://xbox.png")

                await interaction.editReply({ files: [attachment], embeds: [embedXbox] })
            }
        }
    }
}