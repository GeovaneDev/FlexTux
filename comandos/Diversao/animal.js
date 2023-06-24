const Discord = require('discord.js');

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
        await interaction.deferReply();
        let randomChoice;

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
        let embed = new Discord.EmbedBuilder()
        .setColor("Random")
        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
        .setFooter({ text: "Fonte: some-random-api.com" })

        if (animalChoice === "panda" || randomChoice === "panda") {
            const fetch = await import('node-fetch');
            const response = await fetch.default('https://some-random-api.com/animal/panda');
            const data = await response.json();
            const pandaImageUrl = data.image;
            embed.setDescription(`Olá ${interaction.user}, Awww, aqui está uma foto de um panda fofinho!`)
            embed.setImage(pandaImageUrl);
        } else if (animalChoice === "dog" || randomChoice === "dog") {
            const fetch = await import('node-fetch');
            const response = await fetch.default('https://dog.ceo/api/breeds/image/random');
            const data = await response.json();
            const dogImageUrl = data.message;
            embed.setFooter({ text: "Fonte: dog.ceo" })
            embed.setDescription(`Olá ${interaction.user}, Awww, aqui está uma foto de um cachorrinho fofinho!`)
            embed.setImage(dogImageUrl);
        } else if (animalChoice === "cat" || randomChoice === "cat") {
            const fetch = await import('node-fetch');
            const response = await fetch.default("https://api.thecatapi.com/v1/images/search");
            const data = await response.json();
            const catImageUrl = data[0].url;
            embed.setFooter({ text: "Fonte: thecatapi.com" })
            embed.setDescription(`Olá ${interaction.user}, Awww, aqui está uma foto de um gatinho fofinho!`)
            embed.setImage(catImageUrl);
        } else if (animalChoice === "bird" || randomChoice === "bird") {
            const fetch = await import('node-fetch');
            const response = await fetch.default("https://some-random-api.com/animal/bird");
            const data = await response.json();
            const birdImageUrl = data.image;
            embed.setDescription(`Olá ${interaction.user}, Awww, aqui está uma foto de um pássaro fofinho!`)
            embed.setImage(birdImageUrl);
        } else if (animalChoice === "fox" || randomChoice === "fox") {
            const fetch = await import('node-fetch');
            const response = await fetch.default("https://some-random-api.com/animal/fox");
            const data = await response.json();
            const foxImageUrl = data.image;
            embed.setFooter({ text: "Fonte: randomfox.ca" })
            embed.setDescription(`Olá ${interaction.user}, Awww, aqui está uma foto de um raposa fofinho!`)
            embed.setImage(foxImageUrl);
        } else if (animalChoice === "kangaroo" || randomChoice === "kangaroo") {
            const fetch = await import('node-fetch');
            const response = await fetch.default("https://some-random-api.com/animal/kangaroo");
            const data = await response.json();
            const kangarooImageUrl = data.image;
            embed.setDescription(`Olá ${interaction.user}, Awww, aqui está uma foto de um canguru fofinho!`)
            embed.setImage(kangarooImageUrl);
        } else if (animalChoice === "koala" || randomChoice === "koala") {
            const fetch = await import('node-fetch');
            const response = await fetch.default("https://some-random-api.com/animal/koala");
            const data = await response.json();
            const koalaImageUrl = data.image;
            embed.setDescription(`Olá ${interaction.user}, Awww, aqui está uma foto de um coala fofinho!`)
            embed.setImage(koalaImageUrl);
        } else if (animalChoice === "raccoon" || randomChoice === "raccoon") {
            const fetch = await import('node-fetch');
            const response = await fetch.default("https://some-random-api.com/animal/raccoon");
            const data = await response.json();
            const raccoonImageUrl = data.image;
            embed.setDescription(`Olá ${interaction.user}, Awww, aqui está uma foto de um guaxinim fofinho!`)
            embed.setImage(raccoonImageUrl);
        } else if (animalChoice === "red_panda" || randomChoice === "red_panda") {
            const fetch = await import('node-fetch');
            const response = await fetch.default("https://some-random-api.com/animal/red_panda");
            const data = await response.json();
            const redpandaImageUrl = data.image;
            embed.setDescription(`Olá ${interaction.user}, Awww, aqui está uma foto de um Panda vermelho fofinho!`)
            embed.setImage(redpandaImageUrl);
        }
        await interaction.editReply({ embeds: [embed] });
    }
}