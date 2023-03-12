const Discord = require('discord.js');

module.exports = {
    name: "8ball",
    description: "｢Diversão｣ Pergunte algo para min.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "pergunta",
            description: "Faça uma pergunta.",
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        },
    ],

    run: async (client, interaction) => {
        try {
            const pergunta = interaction.options.getString("pergunta").trim();
    
            let respostas = [
                'Sim',
                'Não',
                'Provavelmente sim.',
                'Provavelmente não.',
                'Não sei.',
                'Um dia te conto a resposta.',
                'Você não vai querer saber a resposta.',
                'Minhas pesquisas apontam que não.',
                'Minhas pesquisas apontam que sim.',
                'Nunca nem vi.',
                'Talvez mais tarde.',
                'Não apostaria nisso.',
                'Sem sombra de dúvidas!',
                'Não conte com isso.',
                'Minha resposta é: talvez.',
                'Pode confiar que sim!',
                'Não me pergunte agora.',
                'Melhor não te dizer...',
                'Pergunte novamente mais tarde.',
                'As perspectivas são boas.',
                'Não se pode prever agora.',
                'Siga seu coração.',
                'Não é de minha alçada responder isso.',
                'Não vou responder a isso.',
                'Preciso pensar mais sobre isso.'
            ];            
    
            const randomIndex = Math.floor(Math.random() * respostas.length);
            const random = respostas[randomIndex];
    
            const embed = new Discord.EmbedBuilder()
                .setColor("Random")
                .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
                .setDescription(`> **Pergunta:** \`${pergunta}\`
                \n> **Resposta:** \`${random}\``);
            
            interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.log(error);
            interaction.reply({ content: "Ocorreu um erro ao executar o comando.", ephemeral: true });
        }
    }    
};
