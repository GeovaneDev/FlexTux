const Discord = require("discord.js")

module.exports = {
    name: "cargo-botao",
    description: "｢Admin｣ Ganhe cargos clicando nos botões.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "cargo",
            description: "Mencione o cargo que deseja ser adicionado no botão.",
            type: Discord.ApplicationCommandOptionType.Role,
            required: true,
        }
    ],

    run: async (client, interaction) => {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageRoles)) {
            interaction.reply({ content: `❌ - Você não tem permissão para utilizar este comando. Você precisa ter a permissão "**Gerenciar Cargos**".`, ephemeral: true })
        } else {
            let cargo = interaction.options.getRole("cargo");

            let embed = new Discord.EmbedBuilder()
                .setColor("Random")
                .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                .setDescription(`Clique no botão abaixo para resgatar o cargo **${cargo.name}**.`);

            let botao = new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId("cargo_b" + interaction.id)
                    .setLabel("Clique Aqui!")
                    .setStyle(Discord.ButtonStyle.Secondary)
            );

            interaction.reply({ embeds: [embed], components: [botao] }).then(() => {

                let coletor = interaction.channel.createMessageComponentCollector();

                coletor.on("collect", (c) => {
                    if (!c.member.roles.cache.get(cargo.id)) {
                        c.member.roles.add(cargo.id)
                        c.reply({ content: `Olá **${c.user.username}**, você resgatou o cargo **${cargo.name}**.`, ephemeral: true })
                    } else if (c.member.roles.cache.get(cargo.id)) {
                        c.member.roles.remove(cargo.id)
                        c.reply({ content: `Olá **${c.user.username}**, você perdeu o cargo **${cargo.name}**.`, ephemeral: true })
                    }

                })
            })
        }
    }
}