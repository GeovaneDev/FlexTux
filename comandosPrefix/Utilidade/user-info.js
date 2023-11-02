const Discord = require("discord.js");

module.exports = {
  name: "user-info",
  aliases: ["userinfo"],

  run: async (client, message, args) => {
    let user;
    if (!args[0]) {
      user = message.author;
    } else if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else if (!isNaN(args[0])) {
      user = await client.users.fetch(args[0]).catch(() => null);
    }

    if (!user) {
      const embedUsage = new Discord.EmbedBuilder()
        .setColor("Random")
        .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        .setTitle("Uso incorreto do comando")
        .setDescription("Por favor, use o comando da seguinte maneira:\n\n`!userinfo <@usuário/Id do Usuário/Vazio>`\n\nExemplo: `!userinfo 691279644468445274`");

      return message.reply({ embeds: [embedUsage] });
    }

    const member = message.guild.members.cache.get(user.id);
    let data_conta = `<t:${~~(new Date(user.createdAt) / 1000)}:R>`;
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

    if (!member) {
      const embed2 = new Discord.EmbedBuilder()
        .setDescription(`**Olá \`${message.author}\`, aqui estão informações do usuário:**\n ﾠ`)
        .setTitle('Informações de Usuário')
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .setColor("Random")
        .addFields(
          { name: '**🔌Usuário:**', value: `\`\`\`${user.username}\`\`\``, inline: true },
          { name: '**🆔 Usuário ID:**', value: `\`\`\`${user.id}\`\`\``, inline: true },
          { name: 'ﾠ', value: 'ﾠ', inline: true },
          { name: '**🤖 Bot:**', value: `\`\`\`${user.bot ? "é um bot" : "Não é um bot"}\`\`\``, inline: true },
          { name: '**📅 Data da Conta:**', value: `${data_conta}`, inline: true },
          { name: '**🏅 Badges:**', value: badges.join("\n") || 'Nenhuma badge', inline: false },
        )
        .setFooter({ text: `Comando usado por ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        .setThumbnail(user.displayAvatarURL({ dynamyc: true }))

      let botao2 = new Discord.ActionRowBuilder()
        .addComponents(
          new Discord.ButtonBuilder()
            .setURL(user.displayAvatarURL({ dynamic: true }))
            .setLabel(`Avatar de ${user.username}`)
            .setStyle(Discord.ButtonStyle.Link),
        );

      message.reply({ content: `${message.author}`, embeds: [embed2], components: [botao2] });
      return;
    } else {
      let servidor = `**<t:${~~(new Date(member.joinedAt) / 1000)}:R>**`;
      let boosts = message.guild.premiumSubscriptionCount;
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
        .setDescription(`**Olá \`${message.author}\`, aqui estão informações do usuário:**\n ﾠ`)
        .setTitle('Informações de Usuário')
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .setColor("Random")
        .addFields(
          { name: '**🔌Usuário:**', value: `\`\`\`${user.username}\`\`\``, inline: true },
          { name: '**🆔 Usuário ID:**', value: `\`\`\`${user.id}\`\`\``, inline: true },
          { name: 'ﾠ', value: 'ﾠ', inline: true },
          { name: '**🤖 Bot:**', value: `\`\`\`${user.bot ? "é um bot" : "Não é um bot"}\`\`\``, inline: true },
          { name: `**🚀 Total de Boosts:**`, value: `\`\`\`${boosts} boosts\`\`\``, inline: true },
          { name: 'ﾠ', value: 'ﾠ', inline: true },
          { name: '**📅 Data da Conta:**', value: `${data_conta}`, inline: true },
          { name: '**📅 Entrou no Servidor:**', value: `${servidor}`, inline: false },
          { name: '**🏅 Badges:**', value: badges.join("\n") || 'Nenhuma badge', inline: false },
        )
        .setFooter({ text: `Comando usado por ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        .setThumbnail(user.displayAvatarURL({ dynamyc: true }))

      let botao = new Discord.ActionRowBuilder()
        .addComponents(
          new Discord.ButtonBuilder()
            .setURL(user.displayAvatarURL({ dynamic: true }))
            .setLabel(`Avatar de ${user.username}`)
            .setStyle(Discord.ButtonStyle.Link),
        );

      message.reply({ content: `${message.author}`, embeds: [embed], components: [botao] })
    }
  }
}