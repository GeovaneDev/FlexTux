const Discord = require("discord.js")

module.exports = {
    name: "unlock",
    aliases: [""],

  run: async (client, message, args) => {

        if (!message.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) {
            message.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
        } else {
            const canal = message.mentions.channels.first() || message.channel;

            canal.permissionOverwrites.edit(message.guild.id, { SendMessages: true }).then(() => {
                message.reply({ content: `🔓 O canal de texto ${canal} foi desbloqueado!` })
                if (canal.id !== message.channel.id) return canal.send({ content: `🔓 Este canal foi desbloqueado!`, ephemeral: true })
            }).catch(e => {
                message.reply({ content: `❌ Ops, algo deu errado. Eu preciso ter a permissão de **Gerenciar Canais!**` })
            })
        }
    }
}