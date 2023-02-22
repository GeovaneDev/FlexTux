const Discord = require("discord.js");

module.exports = {
    name: "coinflip2",
    description: "Jogue cara ou coroa comigo, eu amo um bom desafio!",
    type: Discord.ApplicationCommandOptionType.ChatInput,
    options: [
        {
            name: "escolha",
            type: Discord.ApplicationCommandOptionType.String,
            description: "Selecione cara ou coroa.",
            required: true,
            choices: [
                {
                    name: "Cara",
                    value: "cara"
                },
                {
                    name: "Coroa",
                    value: "coroa"
                },
            ]
        }

    ],

    run: async (client, interaction, args) => {

        let lados = ["cara", "coroa"];
        let resposta = lados[Math.floor(Math.random() * lados.length)];

        let escolha = interaction.options.getString("escolha");

        if (!escolha || escolha !== "cara" && escolha !== "coroa") {
            interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setColor("Red")
                        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                        .setDescription(`\`/coinflip2 [cara/coroa]\``)
                ]
            })
        } else {
            let embed = new Discord.EmbedBuilder()
                .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                .setDescription(`💱 **Jogando a moeda para o alto...**`)
                .setColor("Green");
            interaction.reply({ embeds: [embed] }).then(msg => {

                setTimeout(() => {

                    if (resposta === "cara") {

                        if (escolha === "cara") {
                            let cara = new Discord.EmbedBuilder()
                                .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                                .setDescription(`💱 **Cara**! Parabéns ${interaction.user}, você ganhou!`)
                                .setColor("Green");
                            interaction.editReply({ embeds: [cara] })
                        } else if (escolha === "coroa") {
                            let coroa = new Discord.EmbedBuilder()
                                .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                                .setDescription(`💱 **Cara**! ${interaction.user} Eu ganhei dessa vez!`)
                                .setColor("Green");
                            interaction.editReply({ embeds: [coroa] })
                        }

                    } else if (resposta === "coroa") {

                        if (escolha === "coroa") {
                            let coroa = new Discord.EmbedBuilder()
                                .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                                .setDescription(`💱 **Coroa**! Parabéns ${interaction.user}, você ganhou!`)
                                .setColor("Green");
                            interaction.editReply({ embeds: [coroa] })
                        } else if (escolha === "cara") {
                            let cara = new Discord.EmbedBuilder()
                                .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                                .setDescription(`💱 **Coroa**! ${interaction.user} Eu ganhei dessa vez!`)
                                .setColor("Green");
                            interaction.editReply({ embeds: [cara] })
                        }

                    }

                }, 3000)

            })

        }

    }
}