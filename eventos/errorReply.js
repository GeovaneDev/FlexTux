require('../index.js')

const Discord = require("discord.js");
const client = require('../index')

client.on('interactionCreate', async (interaction) => {
  if (interaction.isCommand()) {
    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd) {
      return interaction.reply({
        content: '😭 Ocorreu um erro na execução do comando!',
        ephemeral: true
      });
    }
    try {
      interaction.member = interaction.guild.members.cache.get(interaction.user.id);
      await cmd.run(client, interaction);
    } catch (error) {
      console.error(`Erro ao executar o comando "${cmd.name}": ${error}`);
      interaction.reply({
        content: '😭 Ocorreu um erro ao executar o comando. Peço desculpa pela Incoveniência.',
        ephemeral: true
      });
    }
  }
});