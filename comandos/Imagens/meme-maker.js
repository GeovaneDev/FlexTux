const Discord = require("discord.js");
const Canvas = require("canvas");

module.exports = {
    name: "meme-maker",
    description: "｢Imagem｣ Crie um meme personalizado! (Beta)",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "imagem",
            description: "Link para a imagem do meme",
            type: Discord.ApplicationCommandOptionType.String,
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
        const imagemUrl = interaction.options.getString("imagem");
        const texto1 = interaction.options.getString("texto1");
        const texto2 = interaction.options.getString("texto2") || "";
	await interaction.deferReply()

        if (texto1.length > 22) {
            await interaction.editReply({
                content: "O limite do texto são \`22\` Caracters.",
                ephemeral: true,
            })
            return;
        } else if (texto2.length > 22 ) {
            await interaction.editReply({
                content: "O limite do texto são \`22\` Caracters.",
                ephemeral: true,
            })
            return;
        }

        const canvas = Canvas.createCanvas(600, 600);
        const ctx = canvas.getContext("2d");

        const imagem = await Canvas.loadImage(imagemUrl);
        ctx.drawImage(imagem, 0, 0, canvas.width, canvas.height);

        ctx.font = "bold 36px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.fillText(texto1.toUpperCase(), canvas.width / 2, 50);
        ctx.strokeText(texto1.toUpperCase(), canvas.width / 2, 50);

        ctx.font = "bold 36px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.fillText(texto2.toUpperCase(), canvas.width / 2, canvas.height - 20);
        ctx.strokeText(texto2.toUpperCase(), canvas.width / 2, canvas.height - 20);

        const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), { name: "meme.png"});

        let embed = new Discord.EmbedBuilder()
            .setColor("Green")
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setDescription(`> Olá, ${interaction.user}, Aqui seu meme:`)
            .setImage("attachment://meme.png")

        await interaction.editReply({ files: [attachment], embeds: [embed] });
    },
};