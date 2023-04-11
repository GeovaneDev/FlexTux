const Discord = require("discord.js");
const Canvas = require("canvas");

module.exports = {
    name: "meme-maker",
    description: "｢Imagem｣ Crie um meme personalizado! (Beta)",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "imagem",
            description: "Arquivo de imagem para o meme",
            type: Discord.ApplicationCommandOptionType.Attachment,
            required: true,
        },
        {
            name: "texto1",
            description: "Texto para a parte superior do meme",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "texto2",
            description: "Texto para a parte inferior do meme",
            type: Discord.ApplicationCommandOptionType.String,
            required: false,
        },
    ],
    run: async (client, interaction) => {
        const imagemfile = interaction.options.getAttachment("imagem");
        const texto1 = interaction.options.getString("texto1");
        const texto2 = interaction.options.getString("texto2") || "";

        const allowedExtensions = [".png", ".jpg", ".jpeg"];
        const extension = imagemfile.name.slice(imagemfile.name.lastIndexOf("."));
        if (!allowedExtensions.includes(extension)) {
            await interaction.reply({
                content: "O arquivo anexado não é uma imagem permitida (.png, .jpg, .jpeg).",
                ephemeral: true,
            });
            return;
        }

        if (texto1.length > 23 || texto2.length > 23) {
            await interaction.reply({
                content: "O limite do texto são \`22\` caracteres.",
                ephemeral: true,
            });
            return;
        }

        await interaction.deferReply()

        const imagem = await Canvas.loadImage(imagemfile.attachment);
        const canvas = Canvas.createCanvas(imagem.width, imagem.height);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(imagem, 0, 0, canvas.width, canvas.height);
        ctx.font = "bold 69px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.fillText(texto1.toUpperCase(), canvas.width / 2, 50);
        ctx.strokeText(texto1.toUpperCase(), canvas.width / 2, 50);
        ctx.fillText(texto2.toUpperCase(), canvas.width / 2, canvas.height - 20);
        ctx.strokeText(texto2.toUpperCase(), canvas.width / 2, canvas.height - 20);
        const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), { name: "meme.png" });

        const embed = new Discord.EmbedBuilder()
            .setColor("Green")
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setDescription(`Olá, ${interaction.user}, aqui está o seu meme:`)
            .setImage("attachment://meme.png");

        await interaction.editReply({ embeds: [embed], files: [attachment] });
    },
};