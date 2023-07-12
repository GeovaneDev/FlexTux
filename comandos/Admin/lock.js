const Discord = require("discord.js")

module.exports = {
    name: "lock",
    description: "｢Admin｣ Bloquear um canal.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "canal",
            description: "Mencione um canal para o bloquear o chat.",
            type: Discord.ApplicationCommandOptionType.Channel,
            required: false,
        }
    ],

    run: async (client, interaction) => {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) {
            interaction.reply({ content: `❌ - Você não tem permissão para utilizar este comando. Você precisa ter a permissão "**Gerenciar Canais**".`, ephemeral: true })
        } else {
            const canal = interaction.options.getChannel("canal") || interaction.channel;

            canal.permissionOverwrites.edit(interaction.guild.id, { SendMessages: false }).then(() => {
                interaction.reply({ content: `🔒 O canal de texto ${canal} foi bloqueado!` })
                if (canal.id !== interaction.channel.id) return canal.send({ content: `🔒 Este canal foi bloqueado!`, ephemeral: true })
            }).catch(e => {
                interaction.reply({ content: `❌ Ops, algo deu errado. Eu preciso ter a permissão de **Gerenciar Canais!**`, ephemeral: true })
            })
        }

    }
}