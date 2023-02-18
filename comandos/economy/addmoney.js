const { QuickDB } = require('quick.db')
const db = new QuickDB()
const Discord = require("discord.js")
const DONO = "691279644468445274";

module.exports = {
    name: "addmoney",
    description: "Adicione uma quantia de moedas para um usuário.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "usuário",
            type: Discord.ApplicationCommandOptionType.User,
            description: "Mencione um usuário para adcionar.",
            required: true
        },
        {
            name: "quantia",
            type: Discord.ApplicationCommandOptionType.Number,
            description: "Coloque uma quantia para adcionar.",
            required: true
        }

    ],

    run: async (client, interaction, args) => {
        if (interaction.user.id !== DONO) {
            return interaction.reply(`Você não possui permissão para utilizar este comando.`);
         }
          else {
        let user = interaction.options.getUser("usuário");
        let quantia = interaction.options.getNumber("quantia");

        db.add(`carteira_${user.id}`, quantia)

            interaction.reply(`Você adicionou \`${quantia}\` coins para ${user} com sucesso.`)
    }
}
}