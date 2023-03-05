const Discord = require("discord.js");
const DONO = "691279644468445274";

module.exports = {
    name: "atualizacao",
    description: "Defina meu status para atualização. - Somente o criador pode usar 😉",
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {

        if (interaction.user.id !== DONO) return interaction.reply({ content: `Apenas o meu dono pode utilizar este comando!`, ephemeral: true })

        else {
            client.user.setStatus("dnd");

            client.user.setPresence({
                activities: [{
                    name: "Atualização. 😄",
                }],
            });
            const embed = new Discord.EmbedBuilder()
            .setColor("Random")
            .setDescription(`Olá ${interaction.user}, minha presença foi definido para "Atualização. 😄"!\nE meu status foi definido para "dnd"!`)
            .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL({ dynamic: true })})
            interaction.reply({ embeds: [embed], ephemeral: true})
        }
    }
}