const Discord = require("discord.js");
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    name: "sugestao",
    description: "｢Utilidade｣ Envie uma sugestão, para me ajudar a evoluir!",
    type: Discord.ApplicationCommandType.ChatInput,

    options: [
        {
            name: "sugestao",
            description: "Escreva sua sugestão",
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        },
    ],

    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
            interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true });
            return;
        }

        interaction.reply({
            content: `Olá ${interaction.user}, Obrigado pela Sugestão!`,
            ephemeral: true
        });

        const sugestao = interaction.options.getString("sugestao");
        const webhookUrl = process.env.WEBHOOK_SUGESTAO;
        const webhook = new Discord.WebhookClient({
            url: webhookUrl
        });

        let embed = new Discord.EmbedBuilder()
        .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setTitle(`Nova sugestão!`)
        .setDescription(`**Sugestão:\n ${sugestao}**`)
        .setColor("Random")

        await webhook.send({
            embeds: [embed]
        });
    }
}