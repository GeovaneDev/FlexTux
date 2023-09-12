const Discord = require("discord.js")

module.exports = {
  name: "imagem-passed",
  aliases: ["passed"],

  run: async(client, message, args) => {
    let user;
    if (!args[0]) {
      user = message.author;
    } else if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else if (!isNaN(args[0])) {
      user = await client.users.fetch(args[0]).catch(() => null);
    }
    if (!user) {
      user = message.author;
    }
    let useravatar = user.displayAvatarURL();
    useravatar = useravatar.replace(/\.(jpg|jpeg|gif|png|webp)$/i, ".png");
    const fetch = await import('node-fetch');
    const response = await fetch.default(`https://some-random-api.com/canvas/overlay/passed?avatar=${useravatar}`);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const attachment = new Discord.AttachmentBuilder(buffer, { name: "passed.png" })

    let embed = new Discord.EmbedBuilder()
    .setColor("Random")
    .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
    .setImage("attachment://passed.png")
    .setTitle(`Aqui sua imagem de passed do GTA SA:`)
    .setFooter({ text: "Fonte: some-random-api.com"})

    await message.reply({ files: [attachment], content: `<@${message.author.id}>`,embeds: [embed] })
  }
}