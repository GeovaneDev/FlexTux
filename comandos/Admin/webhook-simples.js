const Discord = require("discord.js")

module.exports = {
  name: "webhook-simples",
  description: "｢Admin｣ Envia uma mensagem simples através de um webhook",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "link",
        description: "Link do webhook",
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    },
    {
        name: "mensagem",
        description: "Mensagem do webhook use \\n para quebrar uma linha.",
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

  run: async (client, interaction) => {
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


            await webhookClient.send({
                content: `${mensagem.replace(/\\n/g, '\n')}`,
                username: nomeWebhook,
                avatarURL: avatarWebhook,
            });

            await interaction.editReply(":white_check_mark:  Webhook enviado com sucesso!");
        } catch (error) {
            await interaction.editReply(
                ":x:  Ocorreu um erro ao enviar o webhook. Verifique os links das imagens!"
            );
        }
  }
}