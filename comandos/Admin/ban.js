const Discord = require("discord.js")

module.exports = {
    name: "ban",
    description: "｢Admin｣ Banir um usuário.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "user",
            description: "Selecione um usuário para ser banido.",
            type: Discord.ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: "motivo",
            description: "Insira um motivo.",
            type: Discord.ApplicationCommandOptionType.String,
            required: false,
        }
    ],

    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.BanMembers)) {
            interaction.reply({ content: `❌ - Você não tem permissão para utilizar este comando. Você precisa ter a permissão "**Banir Membros**".`, ephemeral: true });
        } else {
            interaction.deferReply();
            let userr = interaction.options.getUser("user");
            let user = interaction.guild.members.cache.get(userr.id)
            let motivo = interaction.options.getString("motivo");
            if (!motivo) motivo = "Não definido.";

            let embed = new Discord.EmbedBuilder()
                .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
                .setColor("Green")
                .setDescription(`> O usuário ${user} (\`${user.id}\`) foi banido com sucesso.\n> Por ${interaction.user.username}.\n> Motivo: ${motivo}.`);

            let erro = new Discord.EmbedBuilder()
                .setColor("Red")
                .setDescription(`❌ Não foi possível banir o usuário ${user} (\`${user.id}\`) do servidor!`);

            user.ban({ reason: [motivo] }).then(() => {
                interaction.editReply({ embeds: [embed] })
            }).catch(e => {
                interaction.editReply({ embeds: [erro], ephemeral: true })
            })
        }

    }
}