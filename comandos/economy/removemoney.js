const { QuickDB } = require('quick.db')
const db = new QuickDB()
const Discord = require("discord.js")
const DONO = "691279644468445274";

module.exports = {
    name: "removemoney",
    description: "Remove uma quantia de moedas de um usuário.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "usuário",
            type: Discord.ApplicationCommandOptionType.User,
            description: "Mencione um usuário para remover.",
            required: true
        },
        {
            name: "quantia",
            type: Discord.ApplicationCommandOptionType.Number,
            description: "Coloque uma quantia para remover.",
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

        db.sub(`carteira_${user.id}`, quantia)

            interaction.reply(`Você remover \`${quantia}\` coins de ${user} com sucesso.`)
    }
}
}