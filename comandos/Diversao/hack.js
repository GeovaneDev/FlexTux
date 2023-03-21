let Discord = require('discord.js')
const { incrementMaxListeners } = require('../..')

module.exports = {
    name: "hack",
    description: "｢Diversão｣ Comando para hackear alguém. (na brincadeira, claro)",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "pessoa",
            description: "Mensione o usuário.",
            type: Discord.ApplicationCommandOptionType.User,
            required: true,
        }
    ],

    run: async (client, interaction) => {
        let email = [
            'ilovenaruto@hotmail.com',
            'unicornlover69@gmail.com',
            'batmanrocks@yahoo.com',
            'sushilover666@outlook.com',
            'banana@split.com',
            'gatopreto@sorte.com',
            'fulano_de_tal@seudominio.com.br',
            'pimenta@ardida.com',
            'sacola@cheia.com',
            'aviao@semasa.com',
            'abacaxi@roxo.com',
            'zebra@listrada.com', ,
            'pizza@quatroqueijos.com',
            'unicornio@arcoiris.com',
            'batatinhasfritas@fastfood.com',
            'gatinhofofinho@miau.com',
            'princesasofia@castelo.com',
            'joao.silva@naoexiste.com',
            'maria.jose@dominiofalso.net',
            'batman@gothamcity.org',
            'homer.simpson@springfield.com',
            'harry.potter@hogwarts.edu',
            'frodo.baggins@shiremail.net',
            'tonystark@starkindustries.io',
            'donald.duck@disneyworld.com',
        ]

        let senha = [
            'pikachu123',
            'harrypotter4ever',
            'scoobydoo2',
            'gokuisthebest',
            's3nh4s3nh4',
            'abcd1234',
            '1234567890',
            'senhasupersegura',
            'minhasenhasecreta',
            'senha123456',
            'voupormaiscaminhos',
            'senhamegaforte',
            '1234abcd',
            'qwertyuiop',
            'senhasecreta123',
            '1234abcd',
            'qwertyuiop',
            'senha123456789',
            'pudimdeleitecondensado123',
            'meupasswordehsecreto456',
            'ilovepizza789',
            'senhasecreta42',
            'senhafacil1234',
            'coracaopartido777',
            'senha123senha',
            'abcde12345',
        ]


        let mail = email[Math.floor(Math.random() * email.length)]
        let password = senha[Math.floor(Math.random() * senha.length)]
        let pessoa = interaction.options.getUser('pessoa')
        let foto = pessoa.displayAvatarURL()

        if (pessoa.id === client.user.id) {
            const embedbot = new Discord.EmbedBuilder()
            .setColor("Random")
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`})
            .setDescription(`> Tá querendo me hackear, ${interaction.user}?`)

            interaction.reply({ embeds: [embedbot]})
            return
        }
        if (pessoa.id === interaction.user.id) {
            const embedself = new Discord.EmbedBuilder()
            .setColor("Random")
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`})
            .setDescription(`> Você não pode hackear você mesmo, ${interaction.user}`)

            interaction.reply({ embeds: [embedself]})
            return
        }

        let aguarde = new Discord.EmbedBuilder()
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            .setDescription(`> **Vítima:** \`Hackeando...\`
        > **ID:** \`Hackeando...\`
        > **Email:** \`Hackeando...\`
        > **Senha:** \`Hackeando...\`
        \n> **Não se esqueça isso é apenas uma brincadeira.**`)
            .setTimestamp()
            .setThumbnail(pessoa.displayAvatarURL())
            .setColor('#f54eea')

        let embed = new Discord.EmbedBuilder()
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            .setDescription(`> **Vítima:** ${pessoa}
        > **ID:** \`${pessoa.id}\`
        > **Email:** \`${mail}\`
        > **Senha:** \`${password}\`
        \n> **Não se esqueça isso é apenas uma brincadeira.**`)
            .setTimestamp()
            .setThumbnail(pessoa.displayAvatarURL())
            .setColor('#f54eea')

        interaction.reply({ embeds: [aguarde] }).then(() => {
            setTimeout(() => {
                interaction.editReply({ embeds: [embed] })
            }, 4000)
        })



    }
}