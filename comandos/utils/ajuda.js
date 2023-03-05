const Discord = require("discord.js")

module.exports = {
    name: "ajuda",
    description: "Painel dos meus comandos. 😄",
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {

        let embed_painel = new Discord.EmbedBuilder()
            .setColor("Aqua")
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynmiac: true }) })
            .setDescription(`Olá ${interaction.user}, Estou aqui para ajudar, veja meus comandos abaixo interagindo com o painel:`);

        let embed_utilidade = new Discord.EmbedBuilder()
            .setColor("Aqua")
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynmiac: true }) })
            .setDescription(`Aqui estão alguns comandinhos que podem ser úteis para você, ${interaction.user}! 😊
            /ajuda -- Mostra essa mensagem.
            /livro -- Pesquise informações sobre um livro.
            /ping -- Descubra o meu tempo de resposta.
            /serverinfo -- Veja as informações do servidor.
            /starnick-info -- Fornece informações sobre mim.
            /traduzir -- Traduzir um texto para outro idioma.
            /uptime -- Quanto tempo estou online.
            /userinfo -- Veja informações de um usuário.
            /wiki -- Pesquise algo na Wikipedia.`);

        let embed_diversao = new Discord.EmbedBuilder()
            .setColor("Aqua")
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynmiac: true }) })
            .setDescription(`Oi, ${interaction.user}! Aqui estão alguns comandinhos super divertidos para você usar e se divertir: 🎉🎮
            /animalfofo -- Receba uma foto aleatória de um animal fofo para alegrar o dia!
            /coinflip -- Jogue cara ou coroa para ver quem vence!
            /coinflip2 -- Jogue cara ou coroa comigo, eu amo um bom desafio!
            /dado -- Role um dado virtual para ver qual número sai!
            /mcsrvstat -- Veja as informações de um servidor de Minecraft para saber se seus amigos estão online!
            /parouimpar -- Jogue par ou ímpar comigo e teste sua sorte!
            /roleta-russa -- Aposte em um número e veja se você é sortudo(a)!
            /rps -- Jogue pedra, papel ou tesoura com alguém (BETA)
            /rps2 -- Jogue pedra, papel ou tesoura comigo, eu adoro esse jogo!`);

        let embed_animegifs = new Discord.EmbedBuilder()
            .setColor("Aqua")
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynmiac: true }) })
            .setDescription(`Aqui estão alguns gifs de animes que você pode usar para alegrar seu dia:
            /abraço -- Abraça alguém para mostrar carinho!
            /beijar -- Dê um beijinho em alguém!
            /cafune -- Faça cafuné em alguém para demostrar carinho!
            /comemorar -- Comemore algo com alguém!
            /facepalm -- Dê um tapinha na própria testa ou mande para alguém que mereça!
            /palmas -- Mostre seu apoio a alguém e bata palminhas! 🎉
            /piscar -- Pisque para alguém e mostre que você tá pensando nele(a)!
            /tapa -- Dê um tapa em alguém (virtualmente, claro!) que mereça!
            /tocaaqui -- Mande um "toca aqui" para alguém e demonstre carinho!`);

        let embed_adm = new Discord.EmbedBuilder()
            .setColor("Aqua")
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynmiac: true }) })
            .setDescription(`Aqui estão meus comandinhos de administração que podem ajudar você a cuidar do servidor com muito carinho e eficiência:
            /admin-list -- Mostrar lista de administradores.
            /ban -- Banir um usuário.
            /limpar -- Limpar o canal de texto.
            /embed -- Criar uma mensagem bonita. (Beta)
            /kick -- Expulsar um membro.
            /lock -- Bloquear um canal.
            /mute -- Silenciar um usuário.
            /setnick -- Mudar o apelido de um membro.
            /slowmode -- Configurar modo lento.
            /sorteio -- Realizar um sorteio.
            /unban -- Desbanir um usuário.
            /unmute -- Remover silenciamento.
            /unlock -- Desbloquear um canal.
            /cargo-botao -- Ganhe cargos clicando no botão.`);

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
                        label: "Animes Gifs",
                        description: "Veja meus comandos de gifs de animes.",
                        emoji: "🌸",
                        value: "animegifs"
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
                } else if (valor === "animegifs") {
                    c.deferUpdate()
                    interaction.editReply({ embeds: [embed_animegifs] })
                } else if (valor === "adm") {
                    c.deferUpdate()
                    interaction.editReply({ embeds: [embed_adm] })
                }
            })
        })
    }
}