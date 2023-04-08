const Discord  = require("discord.js");
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    name: "setstatus",
    description: "｢Developer｣ Configure meu status. - Somente o criador pode usar 😉.",
    options: [
        {
            type: Discord.ApplicationCommandOptionType.String,
            name: "status",
            description: "Qual estilo você deseja aplicar (online, dnd, idle, invisible)?",
            required: true,
            choices: [
                { name: "Online", value: "online", },
                { name: "dnd", value: "dnd" },
                { name: "Idle", value: "idle" },
                { name: "Invisible", value: "Invisible" },
            ],
        },
        {
            type: Discord.ApplicationCommandOptionType.String,
            name: "descrição",
            description: "Qual será a descrição do status?",
            required: true,
        }
    ],

    run: async (client, interaction) => {

        if (interaction.user.id !== process.env.DONO_ID) return interaction.reply({ content: `Apenas o meu dono pode utilizar este comando!`, ephemeral: true })

        try {

            let status = interaction.options.getString("status");
            let desc = interaction.options.getString("descrição");

            client.user.setStatus(`${status}`);

            client.user.setPresence({
                activities: [{
                    name: desc
                }],
            });

            let embed = new Discord.EmbedBuilder()
                .setColor("Green")
                .setTitle("Status atualizado!")
                .addFields(
                    {
                        name: `🔮 Mudei meu status para:`,
                        value: `\`${status}\`.`,
                        inline: false
                    },
                    {
                        name: `📝 Mudei minha descrição para:`,
                        value: `\`${desc}\`.`,
                        inline: false
                    }
                )

            await interaction.reply({ embeds: [embed], ephemeral: true });

        } catch (error) {
            return console.log(`Ops ${interaction.user}, algo deu errado ao executar este comando.`)
        }
    }
}