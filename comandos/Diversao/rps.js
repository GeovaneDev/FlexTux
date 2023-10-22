const { RockPaperScissors } = require("discord-gamecord")
const Discord = require("discord.js")

module.exports = {
    name: "rps",
    description: "｢Diversão｣ Jogue pedra, papel ou tesoura (BETA)",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "usuario",
            type: Discord.ApplicationCommandOptionType.Subcommand,
            description: "｢Diversão｣ Jogue pedra, papel ou tesoura contra outro usuário. (BETA)",
            options: [
                {
                    name: "oponente",
                    type: Discord.ApplicationCommandOptionType.User,
                    description: "Selecione o usuário para jogar contra.",
                    required: true
                }
            ],
        },
        {
            name: "bot",
            type: Discord.ApplicationCommandOptionType.Subcommand,
            description: "｢Diversão｣ Jogue pedra, papel ou tesoura contra min. (BETA)",
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
        },
    ],

    run: async (client, interaction, args) => {
        if (interaction.options.getSubcommand() === 'usuario') {
            let user = interaction.options.getUser('oponente');
            if (user.id === interaction.user.id) {
                interaction.reply({ content: "Você não pode jogar pedra, papel e tesoura com você mesmo!", ephemeral: true })
                return
            }
            if (user.id === client.user.id) {
                interaction.reply({ content: 'Para jogar pedra, papel e tesoura comigo use o comando **/rps bot**, eu amo um desafio em!', ephemeral: true })
                return
            }

            new RockPaperScissors({
                message: interaction,
                slash_command: true,
                opponent: user,

                embed: {
                    title: '[PEDRA | PAPEL | TESOURA]',
                    description: 'Clique em um botão para jogar.',
                    color: "Random",
                },

                buttons: {
                    pedra: 'Pedra',
                    papel: 'Papel',
                    tesoura: 'Tesoura',
                },

                emojis: {
                    pedra: '🗿',
                    papel: '📃',
                    tesoura: '✂️',
                },

                othersMessage: 'Você não possui permissão para utilizar este botão!',
                mentionUser: true,
                timeoutTime: 30000,
                chooseMessage: 'Você escolheu {emoji}!',
                noChangeMessage: 'Você não pode alterar sua escolha! ✋',
                askMessage: 'Eii {opponent}, {challenger} desafiou você para jogar pedra, papel ou tesoura! 🤜🤛',
                cancelMessage: 'Parece que o pedido foi recusado. 😔',
                timeEndMessage: 'O jogo foi cancelado, pois não obtive uma resposta! 🤷‍♀️',
                drawMessage: 'Foi um empate! 😱',
                winMessage: '{player} Venceu o jogo! 🏆',
                gameEndMessage: 'O jogo não pode ser encerrado! 😢',
                timeoutMessage: "O tempo para esse jogo acabou! 😢",
                playerOnlyMessage: 'Somente o {player} e {opponent} podem usar esse botão.',
            }).startGame();
        } else if (interaction.options.getSubcommand() === 'bot') {
            let escolha = interaction.options.getString("jogo");
            let opcoes = ["pedra", "papel", "tesoura"];
            if (!escolha || !opcoes.includes(escolha)) {
                let embed = new Discord.EmbedBuilder()
                    .setColor("Red")
                    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynmiac: true }) })
                    .setDescription(`/rps bot [pedra/papel/tesoura].`);
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

    }
};