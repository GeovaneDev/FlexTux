const Discord = require("discord.js");
const figlet = require("figlet");

module.exports = {
    name: "ascii",
    description: "｢Utilidade｣ Converte um texto em ASCII",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "texto",
            description: "O texto que deseja converter para ASCII (Limite 11 caracters)",
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        }
    ],
    run: async (client, interaction) => {
        const text = interaction.options.getString("texto");
        await interaction.deferReply({ ephemeral: true })

        if (text.length > 11) {
            await interaction.editReply({ content: `Olá ${interaction.user}, o seu texto é muito grande o limite é de 11 caracteres.`})
            return;
        } else {
            figlet(text, function (err, data) {
                if (err) {
                    console.log("Erro ao converter texto para ASCII:", err);
                    interaction.editReply({ content: "Erro ao converter texto para ASCII."});
                    return;
                }

                if (!data) {
                    interaction.editReply({ content: "Texto não encontrado."});
                    return;
                }

                let user = interaction.user.tag;

                let embed = new Discord.EmbedBuilder()
                    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                    .setColor("Random")
                    .setTitle(`Aqui seu texto em ASCII:`)
                    .setDescription("```" + data + "```");

                interaction.editReply({ content: `<@${interaction.user.id}>`, embeds: [embed] });
            });
        }
    }
};
