const Discord = require("discord.js");

module.exports = {
    name: "parouimpar",
    description: "Jogue par ou ímpar contra mim.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "numero",
            description: "Escolha um número de 1 a 10.",
            type: Discord.ApplicationCommandOptionType.Integer,
            required: true,
            choices: [
                { name: "1", value: 1 },
                { name: "2", value: 2 },
                { name: "3", value: 3 },
                { name: "4", value: 4 },
                { name: "5", value: 5 },
                { name: "6", value: 6 },
                { name: "7", value: 7 },
                { name: "8", value: 8 },
                { name: "9", value: 9 },
                { name: "10", value: 10 }
            ]
        },
        {
            name: "escolha",
            description: "Escolha entre par ou ímpar.",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
            choices: [
                { name: "Par", value: "par" },
                { name: "Ímpar", value: "impar" }
            ]
        }
    ],

    run: async (client, interaction) => {
        const numero = interaction.options.getInteger("numero");
        const escolha = interaction.options.getString("escolha");

        if (numero < 1 || numero > 10) {
            return interaction.reply("Escolha um número entre 1 e 10.");
        }

        if (escolha !== "par" && escolha !== "impar") {
            return interaction.reply("Escolha 'par' ou 'impar'.");
        }

        const botNumber = Math.floor(Math.random() * 10) + 1;
        const soma = numero + botNumber;

        const userChoice = escolha;
        const botChoice = userChoice === "par" ? "ímpar" : "par";

        const result = soma % 2 === 0 ? "par" : "ímpar";

        const vencedor =
            (result === "ímpar" && userChoice === "impar") ||
            (result === "par" && userChoice === "par")
                ? interaction.user
                : client.user;
        const perdedor =
            (result === "ímpar" && userChoice === "impar") ||
            (result === "par" && userChoice === "par")
                ? client.tag
                : interaction.user;

        const embedstart = new Discord.EmbedBuilder()
            .setColor("Random")
            .setTitle(`Par ou Ímpar`)
            .setDescription(`Olá ${interaction.user}, escolha "${escolha}" foi registrada. Aguarde enquanto eu escolho um número.`);

        interaction.reply({ embeds: [embedstart] });

        setTimeout(() => {
            const embedresult = new Discord.EmbedBuilder()
                .setColor("Random")
                .setTitle(`Par ou Ímpar`)
                .setDescription(`Olá **${interaction.user}**, você escolheu **${numero}** e eu escolhi **${botNumber}**. A soma dos nossos números é **${soma}**.
                Eu escolhi **"${botChoice}"** como a minha opção (par ou ímpar).
                O resultado foi **"${result}"** e o(a) vencedor(a) é **${vencedor}**!`);

            interaction.editReply({ embeds: [embedresult] });
        }, 3000);
    }
};
