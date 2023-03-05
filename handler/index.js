const fs = require("fs")

module.exports = async (client) => {

  const SlashsArray = []

  fs.readdir(`./comandos`, (error, folder) => {
    folder.forEach(subfolder => {
      fs.readdir(`./comandos/${subfolder}/`, (error, files) => {
        files.forEach(files => {

          if (!files?.endsWith('.js')) return;
          files = require(`../comandos/${subfolder}/${files}`);
          if (!files?.name) return;
          client.slashCommands.set(files?.name, files);

          SlashsArray.push(files)
        });
      });
    });
  });
  client.on("ready", async () => {
    client.guilds.cache.forEach(guild => guild.commands.set(SlashsArray))

  });
  client.on("guildCreate", async (guild) => {
    await guild.commands.set(SlashsArray);
  });
};