const Discord = require("discord.js");
const { translate } = require('@vitalets/google-translate-api');

module.exports = {
    name: "traduzir",
    description: "｢Utilidade｣ Traduzir um texto para outro idioma.",
    type: Discord.ApplicationCommandType.ChatInput,

    options: [
        {
            name: "texto",
            description: "Digite o texto que você deseja traduzir.",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "idioma",
            description: "Selecione o idioma para o qual você deseja traduzir o texto.",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
            choices: [
                { name: "Alemão", value: "de" },
                { name: "Chinês (simplificado)", value: "zh-CN" },
                { name: "Chinês (tradicional)", value: "zh-TW" },
                { name: "Espanhol", value: "es" },
                { name: "Francês", value: "fr" },
                { name: "Inglês", value: "en" },
                { name: "Italiano", value: "it" },
                { name: "Japonês", value: "ja" },
                { name: "Português", value: "pt" },
                { name: "Português (Brasil)", value: "pt-br" },
                { name: "Russo", value: "ru" }
            ]
        },
    ],

    run: async (client, interaction) => {
        const text = interaction.options.getString("texto");
        const lang = interaction.options.getString("idioma");

        try {
            const result = await translate(text, { to: lang });
            const embed = new Discord.EmbedBuilder()
                .setTitle(`Tradução de "${text}"`)
                .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
                .setFooter({ text: `${interaction.user.tag}` })
                .setDescription(result.text);
            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: "Não foi possível traduzir o texto.", ephemeral: true });
        }
    }
}
