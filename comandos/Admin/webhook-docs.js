const Discord = require("discord.js")

module.exports = {
  name: "webhook-docs",
  description: "｢Admin｣ Documentação de como usar os comandos de webhook!",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    let embed = new Discord.EmbedBuilder()
    .setTitle("Como usar as tags nos comandos de webhook")
    .setDescription("Aqui estão as instruções para utilizar as tags **Personalizar Comunidade**, **Canais & Cargos** e **quebras de linha** no comando de webhook:")
    .addFields(
        { name: "Personalizar Comunidade", value: "Para se referir ao canal do Discord chamado 'Personalizar Comunidade', utilize `<personalizar_comunidade>`." },
        { name: "Canais & Cargos", value: "Para se referir ao canal do Discord chamado 'Canais & Cargos', utilize `<canais_cargos>`." },
        { name: "Quebras de linha", value: "Para adicionar uma quebra de linha no meio da mensagem do seu webhook, utilize o caractere especial `\\n`. Por exemplo, para adicionar uma quebra de linha entre as frases 'Primeira linha' e 'Segunda linha', utilize `Primeira linha \\n Segunda linha`." }
    )
    .setColor("Random");

    interaction.reply({ embeds: [embed], ephemeral: true })
  }
}