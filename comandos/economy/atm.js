const Discord = require("discord.js")
const { QuickDB } = require('quick.db')
const db = new QuickDB()

module.exports = {
    name: "atm",
    description: "Veja sua quantidade de moedas em sua carteira.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "usuário",
            type: Discord.ApplicationCommandOptionType.User,
            description: "Veja a carteira de um usuário.",
            required: false
        }
    ],

    run: async (client, interaction, args) => {

        let user = interaction.options.getUser("usuário");
        if (!user) user = interaction.user;

        let carteira = await db.get(`carteira_${user.id}`)
        if (carteira === null) carteira = 0;

        if (user.id === interaction.user.id) {
            interaction.reply(`${interaction.user} Você possui ${carteira} Coins 🪙 em sua carteira.`)
        } else {
            interaction.reply(`O usuário ${user.tag} possui ${carteira} Coins 🪙 em sua carteira.`)
        }

    }
}