const Discord = require("discord.js")

module.exports = {

    name: "f",
    description: '｢Diversão｣ Digite F para um usuário!',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'usuário',
            description: 'Mencione o usuário',
            type: Discord.ApplicationCommandOptionType.User,
            required: true,
        },
    ],

    run: async (client, interaction) => {

        let user = interaction.options.getUser('usuário');
       
        const embed = new Discord.EmbedBuilder()
        .setAuthor({ name: `${user.username}`, iconURL: `${user.displayAvatarURL({ dynamic: true })}`})
        .setColor("Random")
        .setDescription(`> **Precione :regional_indicator_f: para ${user}!**`)

         interaction.reply({ embeds: [embed] })

    }
}
