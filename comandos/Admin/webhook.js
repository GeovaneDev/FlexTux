const Discord = require("discord.js");
const axios = require("axios");

module.exports = {
    name: "webhook",
    description: "｢Admin｣ Envia uma mensagem através de um webhook",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "embed",
            description: "｢Utilidade｣ Envia uma mensagem simples através de um webhook",
            type: Discord.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "link",
                    description: "Link do webhook",
                    type: Discord.ApplicationCommandOptionType.String,
                    required: true,
                },
                {
                    name: "titulo",
                    description: "Título do embed",
                    type: Discord.ApplicationCommandOptionType.String,
                    required: true,
                },
                {
                    name: "descricao",
                    description: 'Descrição do embed. (Use /webhook-docs para a docs de como usar os webhook.)',
                    type: Discord.ApplicationCommandOptionType.String,
                    required: true,
                },
                {
                    name: "cor",
                    description: "Cor do embed",
                    type: Discord.ApplicationCommandOptionType.String,
                    required: false,
                    choices: [
                        { name: "Aleatório", value: "Random" },
                        { name: "Azul", value: "Blue" },
                        { name: "Azul Escuro", value: "DarkBlue" },
                        { name: "Verde", value: "Green" },
                        { name: "Verde Escuro", value: "DarkGreen" },
                        { name: "Vermelho", value: "Red" },
                        { name: "Vermelho Escuro", value: "DarkRed" },
                        { name: "Lilás", value: "Purple" },
                        { name: "Laranja", value: "Orange" },
                        { name: "Amarelo", value: "Yellow" },
                        { name: "Cinza Claro", value: "LightGrey" },
                        { name: "Cinza Escuro", value: "DarkGrey" },
                        { name: "Ouro", value: "Gold" },
                        { name: "Branco", value: "White" },
                        { name: "Preto", value: "Black" }
                    ],
                },
                {
                    name: "imagem",
                    description: "URL da imagem do embed",
                    type: Discord.ApplicationCommandOptionType.String,
                    required: false,
                },
                {
                    name: "thumbnail",
                    description: "URL da thumbnail do embed",
                    type: Discord.ApplicationCommandOptionType.String,
                    required: false,
                },
                {
                    name: "footer",
                    description: "Texto do rodapé do embed",
                    type: Discord.ApplicationCommandOptionType.String,
                    required: false,
                },
                {
                    name: "nome",
                    description: "Nome do webhook",
                    type: Discord.ApplicationCommandOptionType.String,
                    required: false,
                },
                {
                    name: "avatar",
                    description: "URL da imagem do avatar do webhook",
                    type: Discord.ApplicationCommandOptionType.String,
                    required: false,
                },
            ],
        },
        {
            name: "simples",
            description: "｢Utilidade｣ Envia uma mensagem simples através de um webhook",
            type: Discord.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "link",
                    description: "Link do webhook",
                    type: Discord.ApplicationCommandOptionType.String,
                    required: true,
                },
                {
                    name: "mensagem",
                    description: "Mensagem do webhook. (Use /webhook-docs para a docs de como usar os webhook.)",
                    type: Discord.ApplicationCommandOptionType.String,
                    required: true,
                },
                {
                    name: "nome",
                    description: "Nome do webhook",
                    type: Discord.ApplicationCommandOptionType.String,
                    required: false,
                },
                {
                    name: "avatar",
                    description: "URL da imagem do avatar do webhook",
                    type: Discord.ApplicationCommandOptionType.String,
                    required: false,
                },
            ],
        },
        {
            name: "docs",
            description: "｢Utilidade｣ Documentação de como usar os comandos de webhook!",
            type: Discord.ApplicationCommandOptionType.Subcommand,
        },
    ],

    run: async (client, interaction) => {
        if (interaction.options.getSubcommand() === 'embed') {
            const nomeWebhook = interaction.options.getString("nome");
            const avatarWebhook = interaction.options.getString("avatar");
            const linkWebhook = interaction.options.getString("link");
            const titulo = interaction.options.getString("titulo");
            const descricao = interaction.options.getString("descricao");
            const cor = interaction.options.getString("cor");
            const imagem = interaction.options.getString("imagem");
            const thumbnail = interaction.options.getString("thumbnail");
            const footer = interaction.options.getString("footer");

            let linkValida = false;

            if (linkWebhook) {
                if (!linkWebhook.startsWith("https://discord.com/api/webhooks/")) {
                    await interaction.reply({
                        content: "> O link do Webhook parece não é válido. Você pode copiar o link do webhook na aba itegração no seu canal de texto!\n> **O link deve começar com discord.com**",
                        ephemeral: true,
                    });
                    return;
                }

                try {
                    await axios.get(linkWebhook);
                    linkValida = true;
                } catch (error) {
                    await interaction.reply({
                        content: "> O link do Webhook parece não ser válido. Você pode copiar o link do webhook na aba integração no seu canal de texto!",
                        ephemeral: true,
                    });
                    return;
                }
            }

            await interaction.deferReply({ ephemeral: true });

            try {
                const webhookClient = new Discord.WebhookClient({ url: linkWebhook });

                const descricaoComTags = descricao.replace(/<personalizar_comunidade>/g, '<id:customize>').replace(/<canais_cargos>/g, '<id:browse>');
                const descricaoComQuebrasDeLinha = descricaoComTags.replace(/\\n/g, '\n');
                const embed = new Discord.EmbedBuilder()
                    .setTitle(titulo)
                    .setDescription(descricaoComQuebrasDeLinha)
                    .setColor(cor ? cor : "Random");


                if (imagem) {
                    embed.setImage(imagem);
                }

                if (thumbnail) {
                    embed.setThumbnail(thumbnail);
                }

                if (footer) {
                    embed.setFooter({ text: `${footer}` });
                }

                await webhookClient.send({
                    embeds: [embed],
                    username: nomeWebhook,
                    avatarURL: avatarWebhook,
                });

                await interaction.editReply(":white_check_mark:  Webhook enviado com sucesso!");
            } catch (error) {
                await interaction.editReply(
                    ":x:  Ocorreu um erro ao enviar o webhook. Verifique os links e tente novamente!"
                );
            }
        } else if (interaction.options.getSubcommand() === 'simples') {
            const linkWebhook = interaction.options.getString("link");
            const mensagem = interaction.options.getString("mensagem");
            const nomeWebhook = interaction.options.getString("nome");
            const avatarWebhook = interaction.options.getString("avatar");

            let linkValida = false;

            if (linkWebhook) {
                if (!linkWebhook.startsWith("https://discord.com/api/webhooks/")) {
                    await interaction.reply({
                        content: "> O link do Webhook parece não é válido. Você pode copiar o link do webhook na aba itegração no seu canal de texto!\n> **O link deve começar com discord.com**",
                        ephemeral: true,
                    });
                    return;
                }

                try {
                    await axios.get(linkWebhook);
                    linkValida = true;
                } catch (error) {
                    await interaction.reply({
                        content: "> O link do Webhook parece não ser válido. Você pode copiar o link do webhook na aba integração no seu canal de texto!",
                        ephemeral: true,
                    });
                    return;
                }
            }

            await interaction.deferReply({ ephemeral: true });

            try {
                const webhookClient = new Discord.WebhookClient({ url: linkWebhook });
                const mensagemComTags = mensagem.replace(/<personalizar_comunidade>/g, '<id:customize>').replace(/<canais_cargos>/g, '<id:browse>');
                const mensagemComQuebrasDeLinha = mensagemComTags.replace(/\\n/g, '\n');

                await webhookClient.send({
                    content: mensagemComQuebrasDeLinha,
                    username: nomeWebhook,
                    avatarURL: avatarWebhook,
                });
                await interaction.editReply(":white_check_mark:  Webhook enviado com sucesso!");
            } catch (error) {
                await interaction.editReply(
                    ":x:  Ocorreu um erro ao enviar o webhook. Verifique os links e tente novamente!"
                );
            }
        } else if (interaction.options.getSubcommand() === 'docs') {
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
    },
};