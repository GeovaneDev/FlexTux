const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'animalfofo',
    description: 'Receba uma foto aleatória de um animal fofo para alegrar o dia!',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'animal',
            description: 'O animal que você deseja ver',
            type: Discord.ApplicationCommandOptionType.String,
            choices: [
                { name: 'Cachorro', value: 'https://dog.ceo/api/breeds/image/random' },
                { name: 'Gato', value: 'https://api.thecatapi.com/v1/images/search' },
                { name: 'Panda', value: 'https://some-random-api.ml/animal/panda' },
                { name: 'Pássaro', value: 'https://some-random-api.ml/animal/bird' },
                { name: 'Raposa', value: 'https://some-random-api.ml/animal/fox' },
                { name: 'Canguru', value: 'https://some-random-api.ml/animal/kangaroo' },
                { name: 'Coala', value: 'https://some-random-api.ml/animal/koala' },
                { name: 'Guaxinim', value: 'https://some-random-api.ml/animal/raccoon' }
            ]
        },
        {
            name: 'aleatório',
            description: 'Obter um animal aleatório?',
            type: Discord.ApplicationCommandOptionType.Boolean,
            required: false
        }
    ],

    run: async (client, interaction) => {
        const animalChoice = interaction.options.getString('animal');
        const isRandom = interaction.options.getBoolean('aleatório');
        let api;

        if (!animalChoice && !isRandom) {
            const erroEmbed = new Discord.EmbedBuilder()
                .setColor("Random")
                .setDescription(`Olá ${interaction.user}, Você precisa escolher um animal ou selecionar aleatório.`)
            await interaction.reply({ embeds: [erroEmbed], ephemeral: true });
            return;
        }

        if (animalChoice && isRandom) {
            const erroEmbed = new Discord.EmbedBuilder()
                .setColor("Random")
                .setDescription(`Olá ${interaction.user}, Você não pode escolher um animal e um animal aleatório ao mesmo tempo.`)
            await interaction.reply({ embeds: [erroEmbed], ephemeral: true });
            return;
        }

        if (isRandom === false && !animalChoice) {
            const erroEmbed = new Discord.EmbedBuilder()
                .setColor("Random")
                .setDescription(`Olá ${interaction.user}, Você precisa escolher um animal ou selecionar aleatório.`)
            await interaction.reply({ embeds: [erroEmbed], ephemeral: true });
            return;
        }

        if (isRandom) {
            const apis = [
                "https://some-random-api.ml/animal/panda",
                "https://dog.ceo/api/breeds/image/random",
                "https://api.thecatapi.com/v1/images/search",
                "https://some-random-api.ml/animal/bird",
                "https://some-random-api.ml/animal/fox",
                "https://some-random-api.ml/animal/kangaroo",
                "https://some-random-api.ml/animal/koala",
                "https://some-random-api.ml/animal/raccoon"
            ];
            api = apis[Math.floor(Math.random() * apis.length)];
        } else {
            api = animalChoice;
        }

        const response = await fetch(api);
        const data = await response.json();

        let imageUrl, animalName;

        switch (api) {
            case "https://some-random-api.ml/animal/panda":
                const pandaImageUrl = data.image;
                const pandaEmbed = new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setFooter({ text: "Fonte: some-random-api.ml" })
                    .setDescription(`Olá ${interaction.user}, Awww, aqui está uma foto de um panda fofinho!`)
                    .setImage(pandaImageUrl);
                await interaction.reply({ embeds: [pandaEmbed] });
                break;

            case "https://dog.ceo/api/breeds/image/random":
                const dogImageUrl = data.message;
                const dogEmbed = new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setFooter({ text: "Fonte: dog.ceo" })
                    .setDescription(`Olá ${interaction.user}, Awww, aqui está uma foto de um cachorrinho fofinho!`)
                    .setImage(dogImageUrl);
                await interaction.reply({ embeds: [dogEmbed] });
                break;

            case "https://api.thecatapi.com/v1/images/search":
                const catImageUrl = data[0].url;
                const catEmbed = new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setFooter({ text: "Fonte: thecatapi.com" })
                    .setDescription(`Olá ${interaction.user}, Awww, aqui está uma foto de um gatinho fofinho!`)
                    .setImage(catImageUrl);
                await interaction.reply({ embeds: [catEmbed] });
                break;
            case "https://some-random-api.ml/animal/bird":
                const birdImageUrl = data.image;
                const birdEmbed = new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setFooter({ text: "Fonte: some-random-api.ml" })
                    .setDescription(`Olá ${interaction.user}, Awww, aqui está uma foto de um pássaro fofinho!`)
                    .setImage(birdImageUrl);
                await interaction.reply({ embeds: [birdEmbed] });
                break;
            case "https://some-random-api.ml/animal/fox":
                const foxImageUrl = data.image;
                const foxEmbed = new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setFooter({ text: "Fonte: some-random-api.ml" })
                    .setDescription(`Olá ${interaction.user}, Awww, aqui está uma foto de um raposa fofinho!`)
                    .setImage(foxImageUrl);
                await interaction.reply({ embeds: [foxEmbed] });
                break;
            case "https://some-random-api.ml/animal/kangaroo":
                const kangarooImageUrl = data.image;
                const kangarooEmbed = new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setFooter({ text: "Fonte: some-random-api.ml" })
                    .setDescription(`Olá ${interaction.user}, Awww, aqui está uma foto de um canguru fofinho!`)
                    .setImage(kangarooImageUrl);
                await interaction.reply({ embeds: [kangarooEmbed] });
                break;
            case "https://some-random-api.ml/animal/koala":
                const koalaImageUrl = data.image;
                const koalaEmbed = new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setFooter({ text: "Fonte: some-random-api.ml" })
                    .setDescription(`Olá ${interaction.user}, Awww, aqui está uma foto de um coala fofinho!`)
                    .setImage(koalaImageUrl);
                await interaction.reply({ embeds: [koalaEmbed] });
                break;
            case "https://some-random-api.ml/animal/raccoon":
                const raccoonImageUrl = data.image;
                const raccoonEmbed = new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setFooter({ text: "Fonte: some-random-api.ml" })
                    .setDescription(`Olá ${interaction.user}, Awww, aqui está uma foto de um guaxinim fofinho!`)
                    .setImage(raccoonImageUrl);
                await interaction.reply({ embeds: [raccoonEmbed] });
                break;
            case "https://some-random-api.ml/animal/red_panda":
                const redpandaImageUrl = data.image;
                const redpandaEmbed = new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setFooter({ text: "Fonte: some-random-api.ml" })
                    .setDescription(`Olá ${interaction.user}, Awww, aqui está uma foto de um Panda vermelho fofinho!`)
                    .setImage(redpandaImageUrl);
                await interaction.reply({ embeds: [redpandaEmbed] });
                break;
        }
    }
};
