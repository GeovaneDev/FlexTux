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
            .setTitle(`Aqui estão alguns comandinhos que podem ser úteis para você! 😊`)
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynmiac: true }) })
            .setDescription(`
            > \`/ajuda\` Mostra essa mensagem.
            > \`/ascii\` Converte um texto em ASCII
            > \`/escolher\` Escreva duas escolhas e eu vou estolher uma.
            > \`/livro\` Pesquise informações sobre um livro.
            > \`/ping\` Descubra o meu tempo de resposta.
            > \`/qr-code\` Transformar um link em QR code.
            > \`/server-info\` Veja as informações do servidor.
            > \`/starnick info\` Fornece informações sobre mim.
            > \`/traduzir\`: Traduzir um texto para outro idioma.
            > \`/uptime\` Quanto tempo estou online.
            > \`/user-avatar\` Mostra o avatar de um usuário.
            > \`/user-info\` Veja informações de um usuário.
            > \`/wiki\` Pesquise algo na Wikipedia.`);

        let embed_diversao = new Discord.EmbedBuilder()
            .setColor("Aqua")
            .setTitle(`Aqui estão alguns comandinhos para você usar e se divertir: 🎉🎮`)
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynmiac: true }) })
            .setDescription(`
            > \`/8ball\` Pergunte algo para min!
            > \`/anagrama\` Mostra quantos anagramas têm a palavra fornecida.
            > \`/animal\` Receba uma foto aleatória de um animal fofo para alegrar o dia!
            > \`/coinflip\` Jogue cara ou coroa para ver quem vence!
            > \`/coinflip2\` Jogue cara ou coroa comigo, eu amo um bom desafio!
            > \`/dado\` Role um dado virtual para ver qual número sai!
            > \`/f\` Digite F para um usuário!
            > \`/hack\` Comando para hackear alguém. (na brincadeira, claro!)
            > \`/mcsrvstat\` Veja as informações de um servidor de Minecraft!
            > \`/parouimpar\` Jogue par ou ímpar comigo e teste sua sorte!
            > \`/pensamento\` Exibe um pensamento filosófico aleatório.
            > \`/roleta russa\` Aposte em um número e veja se você é sortudo(a)!
            > \`/rps\` Jogue pedra, papel ou tesoura com alguém (BETA)
            > \`/rps2\` Jogue pedra, papel ou tesoura comigo, eu adoro esse jogo!`);

        let embed_imagem = new Discord.EmbedBuilder()
            .setColor("Aqua")
            .setTitle(`Aqui estão alguns comandinhos super divertidos de manupulação de imagem:`)
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynmiac: true }) })
            .setDescription(`
            > \`/imagem-stonks\` Cria uma imagem do meme stonks!
            > \`/imagem-xbox\` Desbloqueie uma conquista do Xbox.
            > \`/imagem-ednaldo\` Escreva algo no pano do Ednaldo Pereira.
            > \`/meme-maker\` Crie um meme personalizado! (Beta)`);

        let embed_animegifs = new Discord.EmbedBuilder()
            .setColor("Aqua")
            .setTitle(`Aqui estão alguns gifs de animes que você pode usar para alegrar seu dia:`)
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynmiac: true }) })
            .setDescription(`
            > \`/abraço\` Abraça alguém para mostrar carinho!
            > \`/beijar\` Dê um beijinho em alguém!
            > \`/cafune\` Faça cafuné em alguém para demostrar carinho!
            > \`/comemorar\` Comemore algo com alguém!
            > \`/facepalm\` Dê um tapinha na própria testa ou mande para alguém que mereça!
            > \`/palmas\` Mostre seu apoio a alguém e bata palminhas! 🎉
            > \`/piscar\` Pisque para alguém e mostre que você tá pensando nele(a)!
            > \`/tapa\` Dê um tapa em alguém (virtualmente, claro!) que mereça!
            > \`/toca aqui\` Mande um "toca aqui" para alguém e demonstre carinho!`);

        let embed_adm = new Discord.EmbedBuilder()
            .setColor("Aqua")
            .setTitle(`Aqui estão meus comandinhos de administração que podem ajudar você a cuidar do servidor com muita eficiência:`)
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynmiac: true }) })
            .setDescription(`
            > \`/admin-list\` Mostrar lista de administradores.
            > \`/ban\` Banir um usuário.
            > \`/banimentos\` Lista de banidos do servidor.
            > \`/limpar\` Limpar o canal de texto.
            > \`/embed\` Criar uma mensagem bonita. (Beta)
            > \`/kick\` Expulsar um membro.
            > \`/lock\` Bloquear um canal.
            > \`/setnick\` Mudar o apelido de um membro.
            > \`/slowmode-set\` Configurar modo lento.
            > \`/slowmode off\` Desativar modo lento.
            > \`/sorteio\` Realizar um sorteio.
            > \`/timeout\` Castigue um membro! (Beta)
            > \`/timeout-remove\` Remova o castigo de um membro! (Beta)
            > \`/unban\` Desbanir um usuário.
            > \`/unlock\` Desbloquear um canal.
            > \`/cargo-botao\` Ganhe cargos clicando no botão.`);

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
                        description: "Veja meus comandinhos que podem ser úteis para você!.",
                        emoji: "✨",
                        value: "utilidade"
                    },
                    {
                        label: "Diversão",
                        description: "Veja meus comandos para você se divertir.",
                        emoji: "😅",
                        value: "diversao"
                    },
                    {
                        label: "Animes Gifs",
                        description: "Veja meus comandinhos de gifs de animes.",
                        emoji: "🌸",
                        value: "animegifs"
                    },
                    {
                        label: "Imagens",
                        description: "Veja meus comandos de manupulação de imagem.",
                        emoji: "🏙",
                        value: "imagem"
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
                } else if (valor === "imagem") {
                    c.deferUpdate()
                    interaction.editReply({ embeds: [embed_imagem] })
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