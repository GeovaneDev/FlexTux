const Discord = require("discord.js")

module.exports = {
    name: "adivinha",
    description: "Tente adivinhar um número aleatório entre 1 e 5!",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "numero",
            description: "Escolha um número entre 1 a 5.",
            type: Discord.ApplicationCommandOptionType.Integer,
            required: true,
            choices: [
                { name: "1", value: "1" },
                { name: "2", value: "2" },
                { name: "3", value: "3" },
                { name: "4", value: "4" },
                { name: "5", value: "5" },
            ],
        }
    ],

    run: async (client, interaction) => {
        const number = interaction.options.getInteger("numero");
        const randomNum = Math.floor(Math.random() * 10) + 1;
        let embedloading = new Discord.EmbedBuilder()
            .setColor("Random")
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setDescription(`:crystal_ball: Sorteando um número entre 1 a 5.`)
       interaction.reply({ embeds: [embedloading] })

        setTimeout(() => {
            if (number === randomNum) {
                let embedcorrect = new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                    .setDescription(`:tada: Parabéns, ${interaction.user}, você acertou, o número sorteado foi \`${randomNum}\`.`)

                    interaction.editReply({ embeds: [embedcorrect] })
            } else if (number !== randomNum) {
                let embederror = new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                    .setDescription(`:pensive: Você errou, ${interaction.user}, o número sorteado foi \`${randomNum}\`. E você escolheu \`${number}\`!`)

                    interaction.editReply({ embeds: [embederror] })
            }
        }, 5000);
    }
}