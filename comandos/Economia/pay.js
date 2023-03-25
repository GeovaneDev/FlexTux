const { QuickDB } = require('quick.db')
const db = new QuickDB()
const Discord = require("discord.js")
module.exports =  {
    name: "pay",
    description: "｢Economia｣ Pague uma quantia de moedas para um usuário.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "usuário",
            type: Discord.ApplicationCommandOptionType.User,
            description: "Mencione um usuário para pagar.",
            required: true
        },
        {
            name: "quantia",
            type: Discord.ApplicationCommandOptionType.Number,
            description: "Coloque uma quantia para pagar.",
            required: true
        }
    
    ],
    
    run: async (client, interaction, args) => {

        let user = interaction.options.getUser("usuário");
        let quantia = interaction.options.getNumber("quantia");
        let carteira = db.get(`carteira_${interaction.user.id}`);
        if (carteira === null) carteira = 0;

        let embed = new Discord.EmbedBuilder() 
        .setTitle(`Você pagou \`${quantia}\` para \`${user.username}\``)
        .setColor("Random")
        .setDescription(`Você não possui \`${quantia}\` moedas, possui apenas \`${carteira}\` moedas.`)

        let embed2 = new Discord.EmbedBuilder() 
        .setTitle(`Você enviou dinhero para ${user.username}`)
        .setColor("Random")
        .setDescription(`Você enviou \`${quantia}\` moedas para ${user} com sucesso.`)

        if (quantia > carteira) {
            interaction.reply({ embeds: [embed] });
        } else {
            db.add(`carteira_${user.id}`, quantia)
            db.sub(`carteira_${interaction.user.id}`, quantia)

            interaction.reply({ embeds: [embed2] })
        }
        
    }
}