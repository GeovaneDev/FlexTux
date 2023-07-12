const Discord = require("discord.js");

module.exports = {
    name: 'banimentos',
    aliases: ["bans"],

    run: async (client, message, args) => {
        if(!message.member.permissions.has(Discord.PermissionFlagsBits.BanMembers))
         return message.reply({ content: `❌ - Você não tem permissão para utilizar este comando. Você precisa ter a permissão "**Banir Membros**".`, ephemeral: true})

         let fetchBans = message.guild.bans.fetch();
         let banMembers = (await fetchBans)
          .map((member) => member.user.username)
          .join("\n")
           
         if(!banMembers) 
         return message.reply({ embeds: [new Discord.EmbedBuilder()
          .setColor("Red")
          .setDescription(`**Nenhum membro banido encontrado...**`)
        ], ephemeral: true })

         let embedBanidos = new Discord.EmbedBuilder()
          .setColor("Green")
          .setAuthor({ name: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`})
          .setTimestamp()
          .setThumbnail(message.guild.iconURL({ dynamic: true }))
          .setDescription(`${banMembers}`)
  
         message.reply({ embeds: [embedBanidos], ephemeral: true })
    }
}