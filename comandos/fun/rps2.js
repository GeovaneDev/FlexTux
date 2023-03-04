const Discord = require("discord.js");

module.exports = {
    name: "rps2",
    description: "Jogue pedra, papel ou tesoura comigo, eu adoro esse jogo!",
    type: Discord.ApplicationCommandType.ChatInput,

    options: [
        {
            name: "jogo",
            type: Discord.ApplicationCommandOptionType.String,
            description: "Selecione Pedra, Papel ou Tesoura.",
            required: true,
            choices: [
                {
                    name: "Pedra",
                    value: "pedra"
                },
                {
                    name: "Papel",
                    value: "papel"
                },
                {
                    name: "Tesoura",
                    value: "tesoura"
                },
            ]
        }

    ],

    run: async (client, interaction) => {
        let escolha = interaction.options.getString("jogo");
        let opcoes = ["pedra", "papel", "tesoura"];

        if (!escolha || !opcoes.includes(escolha)) {
            let embed = new Discord.EmbedBuilder()
            .setColor("Red")
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynmiac: true }) })
            .setDescription(`/rps [pedra/papel/tesoura].`);
            interaction.reply({ embeds: [embed] })
            return;
        }

        let jogadaMaquina = opcoes[Math.floor(Math.random() * opcoes.length)];

        let embed = new Discord.EmbedBuilder()
                .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                .setDescription(`💱 **Jogando pedra, papel e tesoura...**`)
                .setColor("Green");
            interaction.reply({ embeds: [embed] }).then(msg => {

                setTimeout(() => {

        let resultado = new Discord.EmbedBuilder()
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            resultado.setColor("Random")

        if (escolha === jogadaMaquina) {
            resultado.setDescription(`🤔 Ambos escolheram **${escolha}**! Deu empate!`);
        } else if (escolha === "pedra") {
            if (jogadaMaquina === "papel") {
                resultado.setDescription(`:scissors: Eu escolhei **papel**, então você perdeu!`);
            } else {
                resultado.setDescription(`✊ Você escolheu **pedra** e eu escolhi **tesoura**, então você ganhou!`);
            }
        } else if (escolha === "papel") {
            if (jogadaMaquina === "tesoura") {
                resultado.setDescription(`:scissors: Eu escolhi **tesoura**, então você perdeu!`);
            } else {
                resultado.setDescription(`📄 Você escolheu **papel** e eu escolhi **pedra**, então você ganhou!`);
            }
        } else if (escolha === "tesoura") {
            if (jogadaMaquina === "pedra") {
                resultado.setDescription(`:rock: Eu escolhi **pedra**, então você perdeu!`);
            } else {
                resultado.setDescription(`:scissors: Você escolheu **tesoura** e eu escolhi **papel**, então você ganhou!`);
            }
        }

        interaction.editReply({ embeds: [resultado] });
        }, 3000)
    })
    }
};
