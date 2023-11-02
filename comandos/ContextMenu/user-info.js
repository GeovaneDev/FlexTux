const Discord = require("discord.js");

module.exports = {
  name: "Ver informações",
  type: Discord.ApplicationCommandType.User,

  run: async (client, interaction) => {
    const user = interaction.targetUser;
    const member = interaction.guild.members.cache.get(user.id);
    let data_conta = `<t:${~~(new Date(user.createdAt) / 1000)}:R>`;

    let servidor = `**<t:${~~(new Date(member.joinedAt) / 1000)}:R>**`;
    let boosts = interaction.guild.premiumSubscriptionCount;
    const userFlags = user.flags;
    const badges = [];

    if (userFlags & (1 << 0)) badges.push("Funcionário da Discord");
    if (userFlags & (1 << 1)) badges.push("Dono de Servidor Parceiro");
    if (userFlags & (1 << 2)) badges.push("HypeSquad Eventos");
    if (userFlags & (1 << 3)) badges.push("Caçador de Bugs - Nível 1");
    if (userFlags & (1 << 6)) badges.push("HypeSquad Bravery");
    if (userFlags & (1 << 7)) badges.push("HypeSquad Brilliance");
    if (userFlags & (1 << 8)) badges.push("HypeSquad Balance");
    if (userFlags & (1 << 9)) badges.push("Apoiador Inicial do Nitro");
    if (userFlags & (1 << 10)) badges.push("Usuário faz parte de uma equipe");
    if (userFlags & (1 << 14)) badges.push("Caçador de Bugs - Nível 2");
    if (userFlags & (1 << 16)) badges.push("Bot Verificado");
    if (userFlags & (1 << 17)) badges.push("Desenvolvedor Pioneiro de Bot Verificado");
    if (userFlags & (1 << 18)) badges.push("Programa de Moderador");
    if (userFlags & (1 << 19)) badges.push("Bot utiliza apenas interações HTTP e é exibido na lista de membros online");
    if (userFlags & (1 << 22)) badges.push("Desenvolvedor Ativo");
    let embed = new Discord.EmbedBuilder()
      .setDescription(`**Olá \`${interaction.user.username}\`, aqui estão informações do usuário:**\n ﾠ`)
      .setTitle('Informações de Usuário')
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .setColor("Random")
      .addFields(
        { name: '**🔌Usuário:**', value: `\`\`\`${user.username}\`\`\``, inline: true },
        { name: '**🆔 Usuário ID:**', value: `\`\`\`${user.id}\`\`\``, inline: true },
        { name: 'ﾠ', value: 'ﾠ', inline: true },
        { name: '**🤖 Bot:**', value: `\`\`\`${user.bot ? "✅" : "❌"}\`\`\``, inline: true },
        { name: `**🚀 Total de Boosts:**`, value: `\`\`\`${boosts} boosts\`\`\``, inline: true },
        { name: 'ﾠ', value: 'ﾠ', inline: true },
        { name: '**📅 Data da Conta:**', value: `${data_conta}`, inline: true },
        { name: '**📅 Entrou no Servidor:**', value: `${servidor}`, inline: false },
        { name: '**🏅 Badges:**', value: badges.join("\n") || 'Nenhuma badge', inline: false },
      )
      .setFooter({ text: `Comando usado por ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
      .setThumbnail(user.displayAvatarURL({ dynamic: true }));

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
            .setAuthor({ name: `${user.username}`, iconURL: user.displayAvatarURL({ dynamic: true }) })
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
};
