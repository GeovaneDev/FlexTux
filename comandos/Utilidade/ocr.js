const Discord = require('discord.js');
const Tesseract = require('tesseract.js');

module.exports = {
    name: 'ocr',
    description: '｢Utilidade｣ Ler o texto de uma imagem.',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'imagem',
            type: Discord.ApplicationCommandOptionType.Attachment,
            description: 'Envie a imagem.',
            required: true,
        },
        {
            name: 'secreta',
            type: Discord.ApplicationCommandOptionType.String,
            description: "É uma imagem secreta?",
            required: true,
            choices: [
                { name: `Sim`, value: 'true' },
                { name: `Não`, value: 'false' }
            ]
        },
    ],

    run: async (client, interaction) => {
        const attachment = interaction.options.getAttachment('imagem');
        let msgsecreta = interaction.options.getString('secreta')
        const ext = attachment.name.split('.').pop();

        if (!['jpg', 'jpeg', 'png'].includes(ext.toLowerCase())) {
            return interaction.reply({
                content: `A extensão do arquivo enviado precisa ser JPEG, JPG ou PNG.`,
                ephemeral: true,
            });
        }

        if (msgsecreta === 'true') {
            await interaction.deferReply({ ephemeral: true });
        } else if (msgsecreta === 'false') {
            await interaction.deferReply({ ephemeral: false });
        }

        const result = await Tesseract.recognize(attachment.url);

        let text = result.data.text.trim();
        if (!text) {
            return interaction.editReply(`:sob: Nenhum texto foi detectado nessa imagem.`);
        }

        let embed = new Discord.EmbedBuilder()
            .setColor('Random')
            .setTitle(':frame_photo: Resultado OCR:')
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setDescription(text);


        interaction.editReply({ embeds: [embed] });
    },
};