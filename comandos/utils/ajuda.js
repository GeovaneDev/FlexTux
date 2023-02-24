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
            .setDescription(`Olá ${interaction.user}, Aqui estão alguns comandos **úteis**:
            /ajuda -- Mostra essa mensagem.
            /ping -- Descubra o meu tempo de resposta.
            /serverinfo -- Veja as informações do servidor.
            /starnick-info -- Fornece informações sobre mim.
            /traduzir -- Traduzir um texto para outro idioma.
            /uptime -- Quanto tempo estou online.
            /userinfo -- Veja informações de um usuário.`);

        let embed_diversao = new Discord.EmbedBuilder()
            .setColor("Aqua")
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynmiac: true }) })
            .setDescription(`Oli, ${interaction.user}! Aqui estão alguns comandos de **diversão** para você:
            /abraço -- Abraça alguém para mostrar carinho!
            /animalfofo -- Receba uma foto aleatória de um animal fofo para alegrar o dia!
            /beijar -- Dê um beijinho em alguém!
            /coinflip -- Jogue cara ou coroa para ver quem vence!
            /coinflip2 -- Jogue cara ou coroa comigo, eu amo um bom desafio!
            /dado -- Role um dado virtual para ver qual número sai!
            /facepalm -- Dê um tapinha na própria testa ou mande para alguém que mereça!
            /mcsrvstat -- Veja as informações de um servidor de Minecraft para saber se seus amigos estão online!
            /parouimpar -- Jogue par ou ímpar comigo e teste sua sorte!
            /piscar -- Pisque para alguém e mostre que você tá pensando nele(a)!
            /roleta-russa -- Aposte em um número e veja se você é sortudo(a)!
            /rps -- Jogue pedra, papel ou tesoura comigo, eu adoro esse jogo!
            /tapa -- Dê um tapa em alguém (virtualmente, claro!) que mereça!
            /tocaaqui -- Mande um "toca aqui" para alguém e demonstre carinho!`);

        let embed_adm = new Discord.EmbedBuilder()
            .setColor("Aqua")
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynmiac: true }) })
            .setDescription(`Olá ${interaction.user}, aqui estão meus comandos de **administração**:
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
            /tickets -- Gerenciar tickets de suporte.
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