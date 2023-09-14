const Discord = require("discord.js");

module.exports = {
  name: 'imagem-tweet',
  description: '｢Imagem｣ Cria um tweet falso',
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'displayname',
      description: 'Nome de exibição do usuário',
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: 'username',
      description: 'Nome de usuário do usuário',
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: 'avatar',
      description: 'URL do avatar do usuário',
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: 'comment',
      description: 'Texto do tweet',
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: 'replies',
      description: 'Número de respostas (opcional)',
      type: Discord.ApplicationCommandOptionType.Integer,
      required: false,
    },
    {
      name: 'retweets',
      description: 'Número de retweets (opcional)',
      type: Discord.ApplicationCommandOptionType.Integer,
      required: false,
    },
    {
      name: 'theme',
      description: 'Tema do tweet',
      type: Discord.ApplicationCommandOptionType.String,
      required: false,
      choices: [
        {
          name: 'claro',
          value: 'light',
        },
        {
          name: 'escuro',
          value: 'dark',
        },
      ],
    },
  ],

  run: async (client, interaction) => {
    const displayname = interaction.options.getString('displayname');
    const username = interaction.options.getString('username');
    const avatar = interaction.options.getString('avatar');
    const comment = interaction.options.getString('comment');
    const replies = interaction.options.getInteger('replies');
    const retweets = interaction.options.getInteger('retweets');
    const theme = interaction.options.getString('theme');
    await interaction.deferReply();

    let apiUrl = `https://some-random-api.com/canvas/misc/tweet?displayname=${displayname}&username=${username}&avatar=${avatar}&comment=${comment}`;

    if (replies !== null) {
      apiUrl += `&replies=${replies}`;
    }

    if (retweets !== null) {
      apiUrl += `&retweets=${retweets}`;
    }

    if (theme !== null) {
      apiUrl += `&theme=${theme}`;
    }

    try {
      const fetch = await import('node-fetch');
      const response = await fetch.default(apiUrl);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const attachment = new Discord.AttachmentBuilder(buffer, { name: "tweet.png" })

      const tweetEmbed = new Discord.EmbedBuilder()
        .setColor('Random')
        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setImage("attachment://tweet.png")
        .setTitle(`Aqui sua imagem de tweet falso:`)
        .setFooter({ text: "Fonte: some-random-api.com"})

      await interaction.editReply({ files: [attachment], content: `<@${interaction.user.id}>`, embeds: [tweetEmbed] });
    } catch (error) {
      console.error(error);
      await interaction.editReply('Ocorreu um erro ao criar o tweet falso.');
    }
  },
};