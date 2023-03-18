const Discord = require("discord.js");

module.exports = {
  name: "user-info",
  description: "｢Utilidade｣ Veja informações de um usuário.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "user",
      description: "Mencione o usuário.",
      type: Discord.ApplicationCommandOptionType.User,
      required: false,
    },
  ],

  run: async (client, interaction) => {
    const user = interaction.options.getUser('user') || interaction.user;
    const member = interaction.guild.members.cache.get(user.id);

    let data_conta = `<t:${~~(new Date(user.createdAt) / 1000)}:R>`;
    let servidor = `**<t:${~~(new Date(member.joinedAt) / 1000)}:R>**`;
    let boosts = interaction.guild.premiumSubscriptionCount;
    let embed = new Discord.EmbedBuilder()
      .setDescription(`**Olá \`${interaction.user.username}\`, aqui estão informações do usuário:**\n ﾠ`)
      .setTitle('Informações de Usuário')
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .setColor("Random")
      .addFields(
        { name: '**🔌Usuário:**', value: `\`\`\`${user.tag}\`\`\``, inline: true },
        { name: '**🆔 Usuário ID:**', value: `\`\`\`${user.id}\`\`\``, inline: true },
        { name: 'ﾠ', value: 'ﾠ', inline: true },
        { name: '**🤖 Bot:**', value: `\`\`\`${user.bot ? "é um bot" : "Não é um bot"}\`\`\``, inline: true },
        { name: `**🚀 Total de Boosts:**`, value: `\`\`\`${boosts} boosts\`\`\``, inline: true },
        { name: 'ﾠ', value: 'ﾠ', inline: true },
        { name: '**📅 Data da Conta:**', value: `${data_conta}`, inline: true },
        { name: '**📅 Entrou no Servidor:**', value: `${servidor}`, inline: false },
      )
      .setFooter({ text: `Comando usado por ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
      .setThumbnail(user.displayAvatarURL({ dynamyc: true }))

    let botao = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
          .setURL(user.displayAvatarURL({ dynamic: true }))
          .setLabel(`Avatar de ${user.username}`)
          .setStyle(Discord.ButtonStyle.Link),
        new Discord.ButtonBuilder()
          .setLabel(`Cargos`)
          .setCustomId('roles')
          .setEmoji('📚')
          .setStyle(Discord.ButtonStyle.Primary),
      );

    interaction.reply({ content: `${interaction.user}`, embeds: [embed], components: [botao] })

    const filter = (i) => {
      return i.customId === 'roles' && i.user.id === interaction.user.id && i.message.interaction.id === interaction.id
    };

    const collector = interaction.channel.createMessageComponentCollector({ filter, time: null });

    collector.on('collect', async (i) => {
      if (i.customId === 'roles') {


        collector.stop();


        const member = interaction.guild.members.cache.get(user.id);
        if (member) {
          const roles = member.roles.cache
            .sort((a, b) => b.position - a.position)
            .filter((role) => role != interaction.guild.roles.everyone)
            .map((role) => role)
            .join('\n') || `Não possui cargos.`;

          let embed = new Discord.EmbedBuilder()
            .setColor('Red')
            .setThumbnail(member.displayAvatarURL({ dynamic: true }))
            .setFooter({ text: `${user.username}`, iconURL: user.displayAvatarURL({ dynamic: true }) })
            .setAuthor({ name: `${user.tag}`, iconURL: user.displayAvatarURL({ dynamic: true }) })
            .addFields({ name: '📚| Cargos', value: `\n${roles}`, inline: true });
          i.reply({ content: `${interaction.user}`, ephemeral: true, embeds: [embed] });
        }
      }
    });

    collector.on('end', async (collected) => {
      botao.components[1].setDisabled(true);
      interaction.editReply({ components: [botao] });
    });
  }
}