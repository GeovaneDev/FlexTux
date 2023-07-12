const Discord = require("discord.js");
const ms = require("ms");

module.exports = {
    name: "timeout",
    aliases: [],

    run(client, message, args) {
        if (!message.member.permissions.has(Discord.PermissionFlagsBits.ModerateMembers)) {
            message.reply({ content: `❌ - Você não tem permissão para utilizar este comando. Você precisa ter a permissão "**Moderar Membros**".`, ephemeral: true });
        } else {
            const mentionable = message.mentions.users.first();
            const duration = args[1];
            const reason = args.slice(2).join(" ") || "Nenhum motivo fornecido.";

            if (!mentionable || !duration) {
                const embedUsage = new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                    .setTitle("Uso incorreto do comando")
                    .setDescription("Por favor, use o comando da seguinte maneira:\n\n`!timeout <@user> <tempo> <motivo>`\n\nExemplo: `!timeout @user 10m Spam`");

                return message.reply({ embeds: [embedUsage] });
            }
            const msDuration = ms(duration);
            const targetUser = message.guild.members.cache.get(mentionable.id);
            if (!targetUser) {
                message.reply({ content: "Esse usuário não existe neste servidor.", ephemeral: true });
                return;
            }

            if (targetUser.user.bot) {
                message.reply({ content: "Não posso dar timeout para um bot.", ephemeral: true });
                return;
            }

            if (isNaN(msDuration)) {
                message.reply({ content: "Por favor, forneça uma duração de timeout válida.", ephemeral: true });
                return;
            }

            if (msDuration < 5000 || msDuration > 2.419e9) {
                message.reply({ content: "A duração do timeout não pode ser menor que 5 segundos ou maior que 27 dias.", ephemeral: true });
                return;
            }

            try {

                targetUser.timeout(msDuration, reason);
                let embed = new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                    .setTitle(`Timeout aplicado com sucesso!`)
                    .setDescription(`
                    > Usuário: ${targetUser}
                    > Tempo: ${ms(msDuration, { long: true })}
                    > Motivo: ${reason}
                    > Moderador: ${message.author}`)
                message.reply({ embeds: [embed] });
                return;
            } catch (error) {
                console.log(error)
                message.reply(`❌ Ops, algo deu errado. Eu preciso ter a permissão **"Membros de castigo"**!`);
            }
        }
    },
};
