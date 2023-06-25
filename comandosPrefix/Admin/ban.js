const Discord = require("discord.js")

module.exports = {
    name: "ban",
    aliases: [],
    
    run(client, message, args) {
        if (!message.member.permissions.has(Discord.PermissionFlagsBits.BanMembers)) {
            message.reply({ content: `Você não possui permissão para utilizar este comando. Você precisa ter a permissão de Banir Membros.`, ephemeral: true });
        } else {
              if (message.mentions.users.first()) {
                userr = message.mentions.users.first();
              }
            let user = message.guild.members.cache.get(userr.id)
            let motivo = args[1];
            if (!motivo) motivo = "Não definido.";

            let embed = new Discord.EmbedBuilder()
                .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
                .setColor("Green")
                .setDescription(`> O usuário ${user} (\`${user.id}\`) foi banido com sucesso.\n> Por ${message.author.username}.\n> Motivo: ${motivo}.`);

            let erro = new Discord.EmbedBuilder()
                .setColor("Red")
                .setDescription(`❌ Não foi possível banir o usuário ${user} (\`${user.id}\`) do servidor!`);

            user.ban({ reason: [motivo] }).then(() => {
                message.reply({ embeds: [embed] })
            }).catch(e => {
                message.reply({ embeds: [erro], ephemeral: true })
            })
        }

    }
}