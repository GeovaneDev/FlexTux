const Discord = require("discord.js");
const ms = require("ms"); // Antes de executar o comando use "npm i pretty-ms ms"

module.exports = {
    name: "timeout",
    description: "｢Admin｣ Castigue um membro!",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "usuario",
            description: "O usuário que você quer dar um timeout.",
            type: Discord.ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: "duração",
            description: "Duração do timeout (20s, 30m, 1h, 1day).",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "motivo",
            description: "O motivo para o timeout.",
            type: Discord.ApplicationCommandOptionType.String,
            required: false,
        },
    ],

    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ModerateMembers)) {
            interaction.reply({ content: `❌ - Você não tem permissão para utilizar este comando. Você precisa ter a permissão "**Moderar Membros**".`, ephemeral: true });
        } else {
            const mentionable = interaction.options.get("usuario").value;
            const duration = interaction.options.get("duração").value;
            const reason = interaction.options.get("motivo")?.value || "Nenhum motivo fornecido.";
            const msDuration = ms(duration);

            const targetUser = await interaction.guild.members.fetch(mentionable);
            if (!targetUser) {
                await interaction.reply({
                    content: "Esse usuário não existe neste servidor.",
                    emphemeral: true,
                });
                return;
            }

            if (targetUser.user.bot) {
                await interaction.reply({
                    content: "Não posso dar timeout para um bot.",
                    ephemeral: true, 
                });
                return;
            }

            if (isNaN(msDuration)) {
                await interaction.reply({
                    content: "Por favor, forneça uma duração de timeout válida.",
                    ephemeral: true,
            });
                return;
            }

            if (msDuration < 5000 || msDuration > 2.419e9) {
                await interaction.reply({
                    content: "A duração do timeout não pode ser menor que 5 segundos ou maior que 27 dias.",
                    ephemeral: true,
                });
                return;
            }

            const targetUserRolePosition = targetUser.roles.highest.position;
            const requestUserRolePosition = interaction.member.roles.highest.position;
            const botRolePosition = interaction.guild.members.me.roles.highest.position;

            if (targetUserRolePosition >= requestUserRolePosition) {
                await interaction.reply({
                    content: "Você não pode dar timeout para esse usuário porque eles têm o mesmo cargo ou um cargo maior que o seu.",
                    ephemeral: true,
                });
                return;
            }

            if (targetUserRolePosition >= botRolePosition) {
                await interaction.reply({
                    content: "Não posso dar timeout para esse usuário porque eles têm o mesmo cargo ou um cargo maior que o meu.",
                    ephemeral: true,
                });
                return;
            }

            await interaction.deferReply();

            try {
                const { default: prettyMs } = await import("pretty-ms");

                if (targetUser.isCommunicationDisabled()) {
                    await targetUser.timeout(msDuration, reason);
                    let embedupdated = new Discord.EmbedBuilder()
                        .setColor("Random")
                        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                        .setTitle(`Timeout atualizado com sucesso!`)
                        .setDescription(`
                    > Usuário: ${targetUser}
                    > Tempo: ${prettyMs(msDuration, { verbose: true })}
                    > Motivo: ${reason}
                    > Moderador: ${interaction.user}`)
                    await interaction.editReply({ embeds: [embedupdated] });
                    return;
                } else {
                    await targetUser.timeout(msDuration, reason);
                    let embed = new Discord.EmbedBuilder()
                        .setColor("Random")
                        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                        .setTitle(`Timeout aplicado com sucesso!`)
                        .setDescription(`
                    > Usuário: ${targetUser}
                    > Tempo: ${prettyMs(msDuration, { verbose: true })}
                    > Motivo: ${reason}
                    > Moderador: ${interaction.user}`)
                    await interaction.editReply({ embeds: [embed] });
                    return;
                }
            } catch (error) {
                await interaction.editReply(`❌ Ops, algo deu errado. Eu preciso ter a permissão **"Membros de castigo"**!`)
            }
        }
    },
};
