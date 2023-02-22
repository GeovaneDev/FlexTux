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
            /ajuda -- Mostra essa mensagem.
            /ping -- Veja o meu ping.
            /serverinfo -- Veja as informações do servidor.
            /starnick-info -- Fornece informações sobre mim.
            /traduzir -- Traduzir um texto para outro idioma.
            /uptime -- Quanto tempo estou operando.
            /userinfo -- Veja informações de um usuário.`);

        let embed_diversao = new Discord.EmbedBuilder()
            .setColor("Aqua")
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynmiac: true }) })
            .setDescription(`Olá ${interaction.user}, veja meus comandos de **diversão** abaixo:
            /abraço -- Abrace um membro.
            /beijar -- Beije um membro.
            /cachorro -- Envia uma imagem aleatória de cachorro fofinho.
            /coinflip -- Jogue cara ou coroa.
            /coinflip2 -- Jogue cara ou coroa contra mim.
            /dado -- Jogue um dado de seis lados.
            /facepalm -- Mande um facepalm(palma da mão no rosto) para uma pessoa.
            /gato -- Mostra uma imagem aleatória de um gato fofinho.
            /mcsrvstat -- Veja as informações de um servidor de Minecraft.
            /parouimpar -- Jogue par ou ímpar contra mim.
            /panda -- Mostra uma imagem aleatória de um panda fofinho.
            /piscar -- Pisque para uma pessoa.
            /roleta-russa -- Jogar roleta-russa comigo.
            /rps -- Jogue pedra, papel ou tesoura contra mim.
            /sus -- Mostra uma imagem mt sus.
            /tapa -- Dê um tapa em uma pessoa.
            /tocaaqui -- Mande um toca aqui para uma pessoa.`);

        let embed_adm = new Discord.EmbedBuilder()
            .setColor("Aqua")
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynmiac: true }) })
            .setDescription(`Olá ${interaction.user}, veja meus comandos de **administração** abaixo:
            /admin-list -- Mostrar lista de membros com permissão do Administrador.
            /ban -- Banir um usuário.
            /clear -- Limpe o canal de texto.
            /embed -- Criar embed.
            /kick -- Expulse um membro do servidor.
            /lock -- Bloqueie um canal.
            /mute --Silencia um usuário por um determinado tempo.
            /setnick -- Configura o nickname do usuário no servidor.
            /slowmode -- Configure o modo lento em um canal de texto.
            /sorteio -- Crie um sorteio no servidor.
            /tickets -- tive o sistema de ticket no servidor.
            /unban -- Desbanir um usuário.
            /unmute -- Remover o silenciamento de um usuário.
            /unlock -- Desbloqueie um canal.`);

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