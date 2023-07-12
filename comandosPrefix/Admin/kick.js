const Discord = require("discord.js")

module.exports = {
    name: "kick",
    aliases: [""],

  run: async (client, message, args) => {
        if (!message.member.permissions.has(Discord.PermissionFlagsBits.KickMembers)) {
            message.reply({ content: `❌ - Você não tem permissão para utilizar este comando. Você precisa ter a permissão "**Expulsar Membros**".`, epemeral: true })
        } else {
            const user = message.mentions.users.first();
            let motivo = args[1];
            const membro = message.guild.members.cache.get(user.id)

            if (!motivo) motivo = "Não informado"

            let embed = new Discord.EmbedBuilder()
                .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
                .setColor("Green")
                .setDescription(`> O usuário ${membro} foi expulso com sucesso!\n\n> Motivo: \`${motivo}\`\n\n> Por ${message.author.username}.`)

            let embed_erro = new Discord.EmbedBuilder()
                .setColor("Red")
                .setDescription(`❌ O usuário ${membro} não foi expulso do servidor!\nHouve um erro na hora de executar este comando, por favor tente novamente.`);

            membro.kick(motivo).then(() => {
                message.reply({ embeds: [embed] })
            }).catch(e => {
                message.reply({ embeds: [embed_erro], epemeral: true })
            })
        }


    }
}