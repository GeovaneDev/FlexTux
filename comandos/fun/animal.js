const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'animal',
    description: 'Receba uma foto aleatória de um animal fofo para alegrar o dia!',
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {
        const apis = [
            "https://some-random-api.ml/animal/panda",
            "https://dog.ceo/api/breeds/image/random",
            "https://api.thecatapi.com/v1/images/search",
            "https://some-random-api.ml/animal/bird",
            "https://some-random-api.ml/animal/fox",
            "https://some-random-api.ml/animal/kangaroo",
            "https://some-random-api.ml/animal/koala",
            "https://some-random-api.ml/animal/raccoon",
            "https://some-random-api.ml/animal/red_panda",
        ];
        const randomApi = apis[Math.floor(Math.random() * apis.length)];
        const response = await fetch(randomApi);
        let data;

        switch (randomApi) {
            case "https://some-random-api.ml/animal/panda":
                data = await response.json();
                const panImageUrl = data.image;
                const pandaEmbed = new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setFooter({ text: "Fonte: some-random-api.ml" })
                    .setDescription(`Olá ${interaction.user}, Awww, aqui está uma foto de um panda fofinho!`)
                    .setImage(panImageUrl);
                await interaction.reply({ embeds: [pandaEmbed] });
                break;

            case "https://dog.ceo/api/breeds/image/random":
                data = await response.json();
                const dogImageUrl = data.message;
                const dogEmbed = new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setFooter({ text: "Fonte: dog.ceo" })
                    .setDescription(`Olá ${interaction.user}, Awww, aqui está uma foto de um cachorrinho fofinho!`)
                    .setImage(dogImageUrl);
                await interaction.reply({ embeds: [dogEmbed] });
                break;

            case "https://api.thecatapi.com/v1/images/search":
                data = await response.json();
                const catImageUrl = data[0].url;
                const catEmbed = new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setFooter({ text: "Fonte: thecatapi.com" })
                    .setDescription(`Olá ${interaction.user}, Awww, aqui está uma foto de um gatinho fofinho!`)
                    .setImage(catImageUrl);
                await interaction.reply({ embeds: [catEmbed] });
                break;
            case "https://some-random-api.ml/animal/bird":
                data = await response.json();
                const birdImageUrl = data.image;
                const birdEmbed = new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setFooter({ text: "Fonte: some-random-api.ml" })
                    .setDescription(`Olá ${interaction.user}, Awww, aqui está uma foto de um pássaro fofinho!`)
                    .setImage(birdImageUrl);
                await interaction.reply({ embeds: [birdEmbed] });
                break;
            case "https://some-random-api.ml/animal/fox":
                data = await response.json();
                const foxImageUrl = data.image;
                const foxEmbed = new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setFooter({ text: "Fonte: some-random-api.ml" })
                    .setDescription(`Olá ${interaction.user}, Awww, aqui está uma foto de um raposa fofinho!`)
                    .setImage(foxImageUrl);
                await interaction.reply({ embeds: [foxEmbed] });
                break;
            case "https://some-random-api.ml/animal/kangaroo":
                data = await response.json();
                const kangarooImageUrl = data.image;
                const kangarooEmbed = new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setFooter({ text: "Fonte: some-random-api.ml" })
                    .setDescription(`Olá ${interaction.user}, Awww, aqui está uma foto de um canguru fofinho!`)
                    .setImage(kangarooImageUrl);
                await interaction.reply({ embeds: [kangarooEmbed] });
                break;
            case "https://some-random-api.ml/animal/koala":
                data = await response.json();
                const koalaImageUrl = data.image;
                const koalaEmbed = new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setFooter({ text: "Fonte: some-random-api.ml" })
                    .setDescription(`Olá ${interaction.user}, Awww, aqui está uma foto de um coala fofinho!`)
                    .setImage(koalaImageUrl);
                await interaction.reply({ embeds: [koalaEmbed] });
                break;
            case "https://some-random-api.ml/animal/raccoon":
                data = await response.json();
                const raccoonImageUrl = data.image;
                const raccoonEmbed = new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setFooter({ text: "Fonte: some-random-api.ml" })
                    .setDescription(`Olá ${interaction.user}, Awww, aqui está uma foto de um guaxinim fofinho!`)
                    .setImage(raccoonImageUrl);
                await interaction.reply({ embeds: [raccoonEmbed] });
                break;
            case "https://some-random-api.ml/animal/red_panda":
                data = await response.json();
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
