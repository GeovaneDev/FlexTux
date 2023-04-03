const Discord = require("discord.js")
const { QuickDB } = require('quick.db')
const db = new QuickDB()
const ms = require("ms")
const cooldowns = {}

module.exports =  {
    name: "daily",
    description: "｢Economia｣ Resgate seu dinheiro diário.",
    type: Discord.ApplicationCommandType.ChatInput,
    
    run: async (client, interaction, args) => {

       
        if(!cooldowns[interaction.user.id])cooldowns[interaction.user.id]={ lastCmd:null};let ultimoCmd=cooldowns[interaction.user.id].lastCmd;
        let timeout = ms(1000)
        if(ultimoCmd!==null&&timeout-(Date.now()-ultimoCmd)>0){let time=ms(timeout-(Date.now()-ultimoCmd));let resta=[time.seconds,'segundos'];
        if(resta[0]==0)resta=['alguns','millisegundos'];if(resta[0]==1)resta=[time.seconds,'segundo'];

        let embed = new Discord.EmbedBuilder() 
            .setTitle("💳 Pagamento Diário")
            .setColor("Random")
            .setDescription(`Espere \`${time}\` para poder resgatar seu daily novamente!`)

        interaction.reply({ embeds: [embed]});return;}else{cooldowns[interaction.user.id].lastCmd=Date.now()};

        let quantia = Math.ceil(Math.random() * 5000 );
        db.add(`carteira_${interaction.user.id}`, quantia);

        let embed = new Discord.EmbedBuilder() 
            .setTitle("💳 Pagamento Diário")
            .setColor("Random")
            .setDescription(`${interaction.user} Você Conseguiu ${quantia} moedas. 🪙`)
        
            interaction.reply({ embeds: [embed]})
    }
}