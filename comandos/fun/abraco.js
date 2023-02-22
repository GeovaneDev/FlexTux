const Discord = require('discord.js') //id do seu bot no lugar do id "944555548148375592"
module.exports = {
    name: "abraço",
    description: "De um abraço em uma pessoa.",
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

        const response = await fetch("https://some-random-api.ml/animu/hug");
        const data = await response.json();
        const abracoImageUrl = data.link;

        if (user.id === interaction.user.id) {
            const userembed = new Discord.EmbedBuilder()
                .setImage(abracoImageUrl)
                .setFooter({text: `Fonte: some-random-api.ml`})
                .setColor("Random")
                .setDescription(`**Eu não acho que dar um abraço em você mesmo seja bom... Aqui, ${client.users.cache.get("944555548148375592")} Deu um abraço em ${user}.**`)
            interaction.reply({ embeds: [userembed] })
            return
        }

        if (user.id === "944555548148375592") {
            const botembed = new Discord.EmbedBuilder()
                .setDescription(`**Awww, obrigada. ${interaction.user} Deu um abraço em ${user}.**`)
                .setImage(abracoImageUrl)
                .setFooter({text: `Fonte: some-random-api.ml`})
                .setColor("Random");
            interaction.reply({ embeds: [botembed] });
            return
        }

        const embed = new Discord.EmbedBuilder()
            .setDescription(`**${interaction.user} Deu um abraço em ${user}.**`)
            .setImage(abracoImageUrl)
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
            .setDescription(`**${user} Retribuiu o abraço de ${interaction.user}.**`)
            .setColor("Random")
            .setImage(abracoImageUrl)
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