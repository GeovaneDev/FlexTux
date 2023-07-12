const Discord = require("discord.js")
const ms = require("ms");

module.exports = {
    name: "slowmode-set",
    description: "｢Admin｣ Configurar modo lento.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "tempo",
            description: "Coloque o tempo do modo lento [s|m|h].",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "canal",
            description: "Mencione um canal de texto.",
            type: Discord.ApplicationCommandOptionType.Channel,
            required: false,
        }
    ],

    run: async (client, interaction) => {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) {
            interaction.reply({ content: `❌ - Você não tem permissão para utilizar este comando. Você precisa ter a permissão "**Gerenciar Canais**".`, ephemeral: true })
        } else {
            let t = interaction.options.getString("tempo");
            let tempo;
            if (t.endsWith("h") && parseInt(t) > 6) {
                interaction.reply({ content: `O tempo não pode ser superior a 6 horas.`, ephemeral: true })
                return;
            } else {
                tempo = ms(t);
            }
            let channel = interaction.options.getChannel("canal");
            if (!channel || channel === null) channel = interaction.channel;

            if (!tempo || tempo === false || tempo === null) {
                interaction.reply({ content: `Forneça um tempo válido: [s|m|h].`, ephemeral: true })
            } else {
                channel.setRateLimitPerUser(tempo / 1000).then(() => {
                    const embed = new Discord.EmbedBuilder()
                        .setColor("Random")
                        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                        .setDescription(`> O canal de texto ${channel} teve seu modo lento definido para \`${t}\`.`)
                    interaction.reply({ embeds: [embed] })
                    return
                }).catch(() => {
                    interaction.reply({ content: `❌ Ops, algo deu errado ao executar este comando, verifique minhas permissões, preciso ter a permisão **"Gerenciar Canais"**.`, ephemeral: true })
                })
            }
        }
    }
}