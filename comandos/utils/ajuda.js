const Discord = require("discord.js")

module.exports = {
    name: "ajuda",
    description: "Painel dos meus comandos. 😄",
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {

        let embed_painel = new Discord.EmbedBuilder()
            .setColor("Aqua")
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynmiac: true }) })
            .setDescription(`Olá ${interaction.user}, veja meus comandos interagindo com o painel abaixo:`);

        let embed_utilidade = new Discord.EmbedBuilder()
            .setColor("Aqua")
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynmiac: true }) })
            .setDescription(`Olá ${interaction.user}, veja meus comandos de **utilidade** abaixo:
            /starnick-info -- Fornece informações sobre mim.
            /ping -- Veja o meu ping.
            /ajuda -- Mostra essa mensagem.
            /userinfo -- Veja informações de um usuário.
            /uptime -- Quanto tempo estou operando.
            /serverinfo -- Veja as informações do servidor.
            /traduzir -- Traduzir um texto para outro idioma.`);

        let embed_diversao = new Discord.EmbedBuilder()
            .setColor("Aqua")
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynmiac: true }) })
            .setDescription(`Olá ${interaction.user}, veja meus comandos de **diversão** abaixo:
            /beijar -- Beije um membro.
            /abraço -- Abrace um membro.
            /tapa -- Dê um tapa em uma pessoa.
            /coinflip -- Jogue cara ou coroa.
            /coinflip2 -- Jogue cara ou coroa contra mim.
            /mcsrvstat -- Veja as informações de um servidor de Minecraft.
            /sus -- Mostra uma imagem mt sus.
            /rps -- Jogue pedra, papel ou tesoura contra min.
            /tocaaqui -- Mande um toca aqui para uma pessoa.
            /dado -- Jogue um dado de seis lados. (BETA)
            /cachorro -- Envia uma imagem aleatória de cachorro fofinho.
            /gato -- Mostra uma imagem aleatória de um gato fofinho.
            /roleta-russa -- Jogar roleta-russa comigo.
            /parouimpar -- Jogue par ou ímpar contra mim.
	    /panda -- Mostra uma imagem aleatória de um panda fofinho.`);

            let embed_economia = new Discord.EmbedBuilder()
            .setColor("Aqua")
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynmiac: true }) })
            .setDescription(`Olá ${interaction.user}, veja meus comandos de **economia** abaixo:
            /atm -- Veja sua quantidade de moedas em sua carteira.
            /daily -- Resgate seu dinheiro diário.
            /pay -- Pague uma quantia de moedas para um usuário.`);

        let embed_adm = new Discord.EmbedBuilder()
            .setColor("Aqua")
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynmiac: true }) })
            .setDescription(`Olá ${interaction.user}, veja meus comandos de **administração** abaixo:
            /ban -- Banir um usuário.
            /unban -- Desbanir um usuário.
            /slowmode -- Configure o modo lento em um canal de texto.
            /clear -- Limpe o canal de texto.
            /setnick -- Configura o nickname do usuário no servidor.
            /lock -- Bloqueie um canal.
            /unlock -- Desbloqueie um canal.
            /kick -- Expulse um membro do servidor.
            /sorteio -- Crie um sorteio no servidor.
            /tickets -- tive o sistema de ticket no servidor.
            /embed -- Criar embed.
            /admin-list -- Mostrar lista de membros com permissão do Administrador.
            /mute --Silencia um usuário por um determinado tempo.
            /unmute -- Remover o silenciamento de um usuário.`);

        let painel = new Discord.ActionRowBuilder().addComponents(
            new Discord.StringSelectMenuBuilder()
                .setCustomId("painel_help")
                .setPlaceholder("Clique aqui!")
                .addOptions(
                    {
                        label: "Painel Inicial",
                        //description: "",
                        emoji: "📖",
                        value: "painel"
                    },
                    {
                        label: "Utilidade",
                        description: "Veja meus comandos de utilidade.",
                        emoji: "✨",
                        value: "utilidade"
                    },
                    {
                        label: "Diversão",
                        description: "Veja meus comandos de diversão.",
                        emoji: "😅",
                        value: "diversao"
                    },
                    {
                        label: "Economia",
                        description: "Veja meus comandos de economia.",
                        emoji: "💰",
                        value: "economia"
                    },
                    {
                        label: "Administração",
                        description: "Veja meus comandos de administração.",
                        emoji: "🔨",
                        value: "adm"
                    }
                )
        )

        interaction.reply({ embeds: [embed_painel], components: [painel], ephemeral: true }).then(() => {
            interaction.channel.createMessageComponentCollector().on("collect", (c) => {
                let valor = c.values[0];

                if (valor === "painel") {
                    c.deferUpdate()
                    interaction.editReply({ embeds: [embed_painel] })
                } else if (valor === "utilidade") {
                    c.deferUpdate()
                    interaction.editReply({ embeds: [embed_utilidade] })
                } else if (valor === "diversao") {
                    c.deferUpdate()
                    interaction.editReply({ embeds: [embed_diversao] })
                } else if (valor === "economia") {
                    c.deferUpdate()
                    interaction.editReply({ embeds: [embed_economia] })
                } else if (valor === "adm") {
                    c.deferUpdate()
                    interaction.editReply({ embeds: [embed_adm] })
                }
            })
        })



    }
}