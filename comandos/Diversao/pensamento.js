const Discord = require("discord.js");

const pensamentos = [
  "O homem é a medida de todas as coisas. - Protágoras",
  "A arte existe para que a verdade não nos destrua. - Friedrich Nietzsche",
  "O silêncio é o grito mais forte. - Confúcio",
  "O homem não é nada além daquilo que a educação faz dele. - Immanuel Kant",
  "O homem é livre, mas está aprisionado em redes de significado que ele próprio teceu. - Clifford Geertz",
  "Só sei que nada sei. - Sócrates",
  "A realidade é algo que se constrói com a imaginação. - Jean Paul Sartre",
  "A vida é uma tragédia quando vista de perto, mas uma comédia quando vista de longe. - Charlie Chaplin",
  "O homem é um ser em busca de sentido. - Viktor Frankl",
  "A verdadeira sabedoria está em reconhecer a própria ignorância. - Sócrates",
  "A consciência é a luz pela qual tudo é visto. - René Descartes",
  "Não podemos escolher as circunstâncias em que nascemos, mas podemos escolher a maneira como as enfrentamos. - Aristóteles",
  "A vida é um sonho, o despertar é o que nos mata. - Virginia Woolf",
  "A felicidade é a finalidade da vida, mas não pode ser alcançada diretamente. - Arthur Schopenhauer",
  "A existência precede a essência. - Jean Paul Sartre",
  "O medo é a prisão do coração. - Lao Tsé",
  "A mente é tudo. O que você pensa, você se torna. - Buda",
  "A dúvida é o princípio da sabedoria. - Aristóteles",
  "A linguagem é a fonte dos mal-entendidos. - Antoine de Saint-Exupéry",
  "O que não provoca minha morte faz com que eu fique mais forte. - Friedrich Nietzsche",
  "Não é a consciência do homem que lhe determina o ser, mas, ao contrário, o seu ser social que lhe determina a consciência. - Karl Marx",
  "A vida é como uma caixa de chocolates, você nunca sabe o que vai encontrar dentro. - Forrest Gump",
  "A beleza é a eternidade contemplando a si mesma no espelho. - Khalil Gibran",
  "Não há caminho para a felicidade, a felicidade é o caminho. - Buda",
  "Nunca faça aos outros o que você não quer que seja feito a você. - Confúcio",
  "A verdade é como o sol. Você pode escondê-la por algum tempo, mas ela não vai desaparecer. - Elvis Presley",
  "A vida é uma peça de teatro que não permite ensaios. Por isso, cante, chore, dance, ria e viva intensamente cada momento da sua vida, antes que a cortina se feche e a peça termine sem aplausos. - Charles Chaplin",
  "A sabedoria é a única riqueza que os tiranos não podem expropriar. - Demócrito"
];


module.exports = {
  name: "pensamento",
  description: "｢Diversão｣ Exibe um pensamento filosófico aleatório.",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    const pensamento = pensamentos[Math.floor(Math.random() * pensamentos.length)];

    const embed = new Discord.EmbedBuilder()
      .setColor("#0099ff")
      .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
      .setTitle("Pensamento Filosófico")
      .setDescription(`"${pensamento}"`);

    interaction.reply({ embeds: [embed] });
  },
};
