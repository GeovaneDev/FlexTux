const Discord = require("discord.js");

module.exports = {
  name: "anagrama",
  description: "｢Diversão｣ Mostra quantos anagramas têm a palavra fornecida.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "palavra",
      description: "Digite a palavra para descobrir quantos anagramas existem.",
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const text = interaction.options.getString("palavra");
    const permutations = findPermutations(text);
    const numPermutations = permutations.length;
    const message = `✍ **•** **Seu anagrama é...** \`${text}\`\n🤓 **•** A palavra \`${text}\` possui **${numPermutations}** anagramas diferentes!`;

    let embed = new Discord.EmbedBuilder()
    .setColor("Random")
    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
    .setDescription(`> **Seu anagrama é...** \`${text}\`\n> A palavra \`${text}\` possui **${numPermutations}** anagramas diferentes!`)

    interaction.reply({ embeds: [embed] });
  },
};

function findPermutations(text) {
  if (text.length === 1) {
    return [text];
  }
  const results = [];

  for (let i = 0; i < text.length; i++) {
    const firstChar = text[i];
    const charsLeft = text.substring(0, i) + text.substring(i + 1);
    const innerPermutations = findPermutations(charsLeft);

    for (let j = 0; j < innerPermutations.length; j++) {
      results.push(firstChar + innerPermutations[j]);
    }
  }
  return results;
}