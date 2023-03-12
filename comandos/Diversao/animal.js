const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'animal',
    description: '｢Diversão｣ Receba uma foto aleatória de um animal fofo para alegrar o dia!',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'animal',
            description: 'O animal que você deseja ver',
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
            choices: [
                { name: 'Aleatório', value: "isRandom" },
                { name: 'Cachorro', value: 'dog' },
                { name: 'Gato', value: 'cat' },
                { name: 'Panda', value: 'panda' },
                { name: 'Pássaro', value: 'bird' },
                { name: 'Raposa', value: 'fox' },
                { name: 'Canguru', value: 'kangaroo' },
                { name: 'Coala', value: 'koala' },
                { name: 'Guaxinim', value: 'raccoon' }
            ],
        },
    ],

    run: async (client, interaction) => {
        const animalChoice = interaction.options.getString('animal');
        let randomChoice;
        await interaction.deferReply();

        if (animalChoice === "isRandom") {
            const apis = [
                "panda",
                "dog",
                "cat",
                "bird",
                "fox",
                "kangaroo",
                "koala",
                "raccoon",
                "red_panda",
            ]
            randomChoice = apis[Math.floor(Math.random() * apis.length)];
        }

        if (animalChoice === "panda" || randomChoice === "panda") {
            const response = await fetch('https://some-random-api.ml/animal/panda');
            const data = await response.json();
            const pandaImageUrl = data.image;
            const pandaEmbed = new Discord.EmbedBuilder()
                .setColor("Random")
                .setFooter({ text: "Fonte: some-random-api.ml" })
                .setDescription(`Olá ${interaction.user}, Awww, aqui está uma foto de um panda fofinho!`)
                .setImage(pandaImageUrl);
            await interaction.editReply({ embeds: [pandaEmbed] });
            return
        } else if (animalChoice === "dog" || randomChoice === "dog") {
            const response = await fetch('https://dog.ceo/api/breeds/image/random');
            const data = await response.json();
            const dogImageUrl = data.message;
            const dogEmbed = new Discord.EmbedBuilder()
                .setColor("Random")
                .setFooter({ text: "Fonte: dog.ceo" })
                .setDescription(`Olá ${interaction.user}, Awww, aqui está uma foto de um cachorrinho fofinho!`)
                .setImage(dogImageUrl);
            await interaction.editReply({ embeds: [dogEmbed] });
            return
        } else if (animalChoice === "cat" || randomChoice === "cat") {
            const response = await fetch("https://api.thecatapi.com/v1/images/search");
            const data = await response.json();
            const catImageUrl = data[0].url;
            const catEmbed = new Discord.EmbedBuilder()
                .setColor("Random")
                .setFooter({ text: "Fonte: thecatapi.com" })
                .setDescription(`Olá ${interaction.user}, Awww, aqui está uma foto de um gatinho fofinho!`)
                .setImage(catImageUrl);
            await interaction.editReply({ embeds: [catEmbed] });
            return
        } else if (animalChoice === "bird" || randomChoice === "bird") {
            const response = await fetch("https://some-random-api.ml/animal/bird");
            const data = await response.json();
            const birdImageUrl = data.image;
            const birdEmbed = new Discord.EmbedBuilder()
                .setColor("Random")
                .setFooter({ text: "Fonte: some-random-api.ml" })
                .setDescription(`Olá ${interaction.user}, Awww, aqui está uma foto de um pássaro fofinho!`)
                .setImage(birdImageUrl);
            await interaction.editReply({ embeds: [birdEmbed] });
            return
        } else if (animalChoice === "fox" || randomChoice === "fox") {
            const response = await fetch("https://some-random-api.ml/animal/fox");
            const data = await response.json();
            const foxImageUrl = data.image;
            const foxEmbed = new Discord.EmbedBuilder()
                .setColor("Random")
                .setFooter({ text: "Fonte: some-random-api.ml" })
                .setDescription(`Olá ${interaction.user}, Awww, aqui está uma foto de um raposa fofinho!`)
                .setImage(foxImageUrl);
            await interaction.editReply({ embeds: [foxEmbed] });
            return
        } else if (animalChoice === "kangaroo" || randomChoice === "kangaroo") {
            const response = await fetch("https://some-random-api.ml/animal/kangaroo");
            const data = await response.json();
            const kangarooImageUrl = data.image;
            const kangarooEmbed = new Discord.EmbedBuilder()
                .setColor("Random")
                .setFooter({ text: "Fonte: some-random-api.ml" })
                .setDescription(`Olá ${interaction.user}, Awww, aqui está uma foto de um canguru fofinho!`)
                .setImage(kangarooImageUrl);
            await interaction.editReply({ embeds: [kangarooEmbed] });
            return
        } else if (animalChoice === "koala" || randomChoice === "koala") {
            const response = await fetch("https://some-random-api.ml/animal/koala");
            const data = await response.json();
            const koalaImageUrl = data.image;
            const koalaEmbed = new Discord.EmbedBuilder()
                .setColor("Random")
                .setFooter({ text: "Fonte: some-random-api.ml" })
                .setDescription(`Olá ${interaction.user}, Awww, aqui está uma foto de um coala fofinho!`)
                .setImage(koalaImageUrl);
            await interaction.editReply({ embeds: [koalaEmbed] });
            return
        } else if (animalChoice === "raccoon" || randomChoice === "raccoon") {
            const response = await fetch("https://some-random-api.ml/animal/raccoon");
            const data = await response.json();
            const raccoonImageUrl = data.image;
            const raccoonEmbed = new Discord.EmbedBuilder()
                .setColor("Random")
                .setFooter({ text: "Fonte: some-random-api.ml" })
                .setDescription(`Olá ${interaction.user}, Awww, aqui está uma foto de um guaxinim fofinho!`)
                .setImage(raccoonImageUrl);
            await interaction.editReply({ embeds: [raccoonEmbed] });
            return
        } else if (animalChoice === "red_panda" || randomChoice === "red_panda") {
            const response = await fetch("https://some-random-api.ml/animal/red_panda");
            const data = await response.json();
            const redpandaImageUrl = data.image;
            const redpandaEmbed = new Discord.EmbedBuilder()
                .setColor("Random")
                .setFooter({ text: "Fonte: some-random-api.ml" })
                .setDescription(`Olá ${interaction.user}, Awww, aqui está uma foto de um Panda vermelho fofinho!`)
                .setImage(redpandaImageUrl);
            await interaction.editReply({ embeds: [redpandaEmbed] });
            return
        }
    }
}