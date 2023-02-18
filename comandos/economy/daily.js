const Discord = require("discord.js")
const { QuickDB } = require('quick.db')
const db = new QuickDB()
const ms = require("ms")
const cooldowns = {}

module.exports = {
    name: "daily",
    description: "Resgate seu dinheiro diário.",
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction, args) => {

        if (!cooldowns[interaction.user.id]) cooldowns[interaction.user.id] = { lastCmd: null }; let ultimoCmd = cooldowns[interaction.user.id].lastCmd;
        let timeout = ms("1 day") // tempo de resgate
        if (ultimoCmd !== null && timeout - (Date.now() - ultimoCmd) > 0) {
            let time = ms(timeout - (Date.now() - ultimoCmd)); let resta = [time.seconds, 'segundos'];
            if (resta[0] == 0) resta = ['alguns', 'millisegundos']; if (resta[0] == 1) resta = [time.seconds, 'segundo'];

            interaction.reply({ content: `Espere \`${time}\` para poder resgatar seu daily novamente!`, ephemeral: true }); return;
        } else { cooldowns[interaction.user.id].lastCmd = Date.now() };

        let quantia = Math.ceil(Math.random() * 5000); //quantia que ele vai "dar aleatoriamente"
        db.add(`carteira_${interaction.user.id}`, quantia);

        interaction.reply(`${interaction.user} Você Conseguiu ${quantia} coins 🪙 `)


    }
}