const Discord = require('discord.js') //id do seu bot no lugar do id "944555548148375592"
module.exports = {
    name: "facepalm",
    description: "Dê um tapinha na própria testa ou mande para alguém que mereça!",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "membro",
            description: "Mencione um membro.",
            type: Discord.ApplicationCommandOptionType.User,
            required: true,
        }
    ],
    run: async (client, interaction, args) => {

        let user = interaction.options.getUser("membro")

        const response = await fetch("https://some-random-api.ml/animu/face-palm");
        const data = await response.json();
        const facepalmImageUrl = data.link;

        const response2 = await fetch("https://some-random-api.ml/animu/hug");
        const data2 = await response2.json();
        const abracoImageUrl2 = data2.link;

        if (user.id === interaction.user.id) {
            const userembed = new Discord.EmbedBuilder()
                .setImage(abracoImageUrl2)
                .setFooter({text: `Fonte: some-random-api.ml`})
                .setColor("Random")
                .setDescription(`**Awww, você está fazendo um facepalm em si mesmo? Não fique triste! Deixa eu te ajudar! ${client.user} deu um abraço para animar o dia de ${user}!**`)
            interaction.reply({ embeds: [userembed] })
            return
        }

        if (user.id === client.user.id) {
            const botembed = new Discord.EmbedBuilder()
                .setDescription(`**Oh não, ${interaction.user} enviou um facepalm para mim! Será que fiz algo errado?**`)
                .setImage(facepalmImageUrl)
                .setFooter({text: `Fonte: some-random-api.ml`})
                .setColor("Random");
            interaction.reply({ embeds: [botembed] });
            return
        }

        const embed = new Discord.EmbedBuilder()
            .setDescription(`**${interaction.user} mandou um facepalm para ${user}.**`)
            .setImage(facepalmImageUrl)
            .setFooter({text: `Fonte: some-random-api.ml`})
            .setColor("Random")

        const button = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId('1')
                    .setLabel('Retribuir')
                    .setStyle(Discord.ButtonStyle.Primary)
                    .setDisabled(false)
            )

        const embed1 = new Discord.EmbedBuilder()
            .setDescription(`**${user} retribuiu o facepalm de ${interaction.user}... parece que essa conversa não está indo muito bem. Vamos tentar manter a calma.**`)
            .setColor("Random")
            .setImage(facepalmImageUrl)
            .setFooter({text: `Fonte: some-random-api.ml`})

        interaction.reply({ embeds: [embed], components: [button] }).then(() => {
            const filter = i => i.customId === '1' && i.user.id === user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, max: 1 });

            collector.on('collect', async i => {
                if (i.customId === '1') {
                    i.reply({ embeds: [embed1] })
                }
            });

            collector.on("end", () => {
                interaction.editReply({
                    components: [
                        new Discord.ActionRowBuilder()
                            .addComponents(
                                new Discord.ButtonBuilder()
                                    .setCustomId('1')
                                    .setLabel('Retribuir')
                                    .setStyle(Discord.ButtonStyle.Primary)
                                    .setDisabled(true)
                            )
                    ]
                })
            })
        })
    }
}