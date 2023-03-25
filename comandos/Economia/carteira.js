const Discord = require("discord.js")
const { QuickDB } = require('quick.db')
const db = new QuickDB()

module.exports =  {
    name: "carteira",
    description: "｢Economia｣ Veja sua quantidade de moedas em sua carteira.",
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

        let embed = new Discord.EmbedBuilder() 
        .setTitle("💸 Carteira")
        .setColor("Random")
        .setDescription(`${interaction.user} Você possui ${carteira} Moedas 🪙 em sua carteira.`)
    
        let embed2 = new Discord.EmbedBuilder() 
        .setTitle(`💸 Carteira de ${user.tag}`)
        .setColor("Random")
        .setDescription(`O usuário \`${user.username}\` possui ${carteira} Moedas 🪙 em sua carteira.`)
    
        


        if (user.id === interaction.user.id) {
            interaction.reply({ embeds: [embed]})
        } else {
            interaction.reply({ embeds: [embed2]})
        }
        
    }
}