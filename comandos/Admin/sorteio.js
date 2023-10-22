const Discord = require("discord.js");
const ms = require("ms");

module.exports = {
    name: "sorteio",
    description: "｢Admin｣ Realizar um sorteio.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "prêmio",
            type: Discord.ApplicationCommandOptionType.String,
            description: "Qual será o prêmio?",
            required: true,
        },
        {
            name: "descrição",
            type: Discord.ApplicationCommandOptionType.String,
            description: "Descreva como participar.",
            required: true,
        },
        {
            name: "tempo",
            type: Discord.ApplicationCommandOptionType.String,
            description: "Selecione o tempo do sorteio.",
            required: true,
            choices: [
                {
                    name: "30 Segundos",
                    value: "30s",
                },
                {
                    name: "1 Minuto",
                    value: "1m",
                },
                {
                    name: "5 Minutos",
                    value: "5m",
                },
                {
                    name: "10 Minutos",
                    value: "10m",
                },
                {
                    name: "15 Minutos",
                    value: "15m",
                },
                {
                    name: "30 Minutos",
                    value: "30m",
                },
                {
                    name: "45 Minutos",
                    value: "45m",
                },
                {
                    name: "1 Hora",
                    value: "1h",
                },
                {
                    name: "2 Horas",
                    value: "2h",
                },
                {
                    name: "5 Horas",
                    value: "5h",
                },
                {
                    name: "12 Horas",
                    value: "12h",
                },
            ],
        },
    ],

    run: async (client, interaction, args) => {
        interaction.channel.sendTyping();
        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {

            interaction.reply({ content: `❌ - Você não tem permissão para utilizar este comando. Você precisa ter a permissão "**Gerenciar Servidor**".`, ephemeral: true })

        } else {
            let premio = interaction.options.getString("prêmio");
            let tempo = interaction.options.getString("tempo");
            let desc = interaction.options.getString("descrição");

            let duracao = ms(tempo);

            let button = new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId("botao")
                    .setEmoji("🎉")
                    .setStyle(Discord.ButtonStyle.Secondary)
            );

            let click = [];

            let embed = new Discord.EmbedBuilder()
                .setAuthor({ name: `${premio}`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                .setDescription(`> O que será sorteado?
                **${premio}.**

                > Como participar?
                ${desc}
                
                > Patrocinador: ${interaction.user}.

                > Tempo: \`${tempo}\`.

                Clique no botão para participar.\n**Boa sorte a todos!!!**`)
                .setTimestamp(Date.now() + ms(tempo))
                .setFooter({ text: "Data do sorteio:" })
                .setColor("Random");

            let erro = new Discord.EmbedBuilder()
                .setColor("Red")
                .setDescription(`Não foi possível promover o soteio!`);

            const msg = await interaction.reply({ embeds: [embed], components: [button] }).catch((e) => {
                interaction.reply({ embeds: [erro] });
            });

            const coletor = msg.createMessageComponentCollector({
                time: ms(tempo),
            });

            coletor.on("end", (i) => {
                interaction.editReply({
                    components: [
                        new Discord.ActionRowBuilder().addComponents(
                            new Discord.ButtonBuilder()
                                .setDisabled(true)
                                .setCustomId("botao")
                                .setEmoji("🎉")
                                .setStyle(Discord.ButtonStyle.Secondary)
                        )
                    ]
                });
            });

            coletor.on("collect", (i) => {

                if (i.customId === "botao") {

                    if (click.includes(i.user.id)) return i.reply({ content: `Olá ${interaction.user}, você ja está participando do sorteio.`, ephemeral: true });

                    click.push(i.user.id);

                    interaction.editReply({ embeds: [embed] });

                    i.reply({ content: `Olá ${interaction.user}, você entrou no sorteio.`, ephemeral: true });
                }

            });

            setTimeout(() => {
                let ganhador = click[Math.floor(Math.random() * click.length)];

                if (click.length == 0) return interaction.followUp(`\n**SORTEIO CANCELADO!**\nNão houveram participantes no sorteio \`${premio}\`.`);

                interaction.followUp(`**Parabéns <@${ganhador}> você ganhou o sorteio: \`${premio}\`.**`);

            }, duracao);
        }
    },
};
