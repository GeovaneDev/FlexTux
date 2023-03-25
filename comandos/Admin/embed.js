const Discord = require(`discord.js`);

module.exports = {
    name: `embed`,
    description: `｢Admin｣ Criar uma mensagem bonita.`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "chat",
            description: "Mencione um canal.",
            type: Discord.ApplicationCommandOptionType.Channel,
            required: true,
        },
        {
            name: "title",
            description: "Insira o título da Embed.",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "description",
            description: "Insira a descrição da Embed",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "color",
            description: "Insira a cor da Embed",
            type: Discord.ApplicationCommandOptionType.String,
            required: false,
            choices: [
                { name: "Aleatório", value: "Random"},
                { name: "Azul", value: "Blue"},
                { name: "Azul Escuro", value: "DarkBlue"},
                { name: "Verde", value: "Green"},
                { name: "Verde Escuro", value: "DarkGreen"},
                { name: "Vermelho", value: "Red"},
                { name: "Vermelho Escuro", value: "DarkRed"},
                { name: "Lilás", value: "Purple"},
                { name: "Laranja", value: "Orange"},
                { name: "Amarelo", value: "Yellow"},
                { name: "Cinza Claro", value: "LightGrey"},
                { name: "Cinza Escuro", value: "DarkGrey"},
                { name: "Ouro", value: "Gold"},
                { name: "Branco", value: "White"},
                { name: "Preto", value: "Black"}
              ], 
        },
    ],
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
            return interaction.reply({
                content: `**❌ | ${interaction.user}, Você precisa da permissão \`Gerenciar Mensagens\` para usar este comando!**`,
                ephemeral: true,
            });
        }

        const chat = interaction.options.getChannel("chat");
        const title = interaction.options.getString("title");
        const description = interaction.options.getString("description");
        const color = interaction.options.getString("color");

        const embed = new Discord.EmbedBuilder()
            .setTitle(title ? title: " ")
            .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
            .setDescription(description)
            .setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setColor(color ? color: "Random");

            interaction.reply({ content: `**✅ Embed enviado com sucesso.**`, ephemeral: true })

        chat.send({
            embeds: [embed],
        }).catch((e) => {
            console.log(error)
            interaction.reply({ content: `Algo deu errado, por favor tente novamente...`, ephemeral: true });
        });
    },
};
