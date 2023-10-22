const Discord = require("discord.js")

module.exports = {
    name: "escolher",
    description: "｢Utilidade｣ Escreva duas escolhas e eu vou estolher uma.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "escolha1",
            type: Discord.ApplicationCommandOptionType.String,
            description: "Qual vai ser a primeira escolha?",
            required: true,
        },
        {
            name: "escolha2",
            type: Discord.ApplicationCommandOptionType.String,
            description: "Qual deve ser a segunda escolha?",
            required: true,
        },
        {
            name: 'secreta',
            type: Discord.ApplicationCommandOptionType.String,
            description: "É uma pergunta secreta?",
            required: true,
            choices: [
                { name: `Sim`, value: 'true' },
                { name: `Não`, value: 'false' }
            ]
        },
    ],

run: async (client, interaction) => {

    let escolha1 = interaction.options.getString('escolha1')
    let escolha2 = interaction.options.getString('escolha2')
    let msgsecreta = interaction.options.getString('secreta')

    const escolhas = [
        escolha1,
        escolha2,
        ];
      
        const randomIndex = Math.floor(Math.random() * escolhas.length);
        const escolhida = escolhas[randomIndex];

        let embed = new Discord.EmbedBuilder()
        .setColor("Random")
        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setDescription(`Olá ${interaction.user}, eu escolhi...\n||\`\`\`${escolhida}\`\`\`|| Espero que você esteja feliz com a escolha.`)

        if( msgsecreta === 'true') {
            interaction.reply({ embeds: [embed], ephemeral: true })
        } else if ( msgsecreta === 'false') {
            interaction.reply({ embeds: [embed], ephemeral: false })
        }
},
}