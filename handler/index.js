const fs = require("fs");

module.exports = async (client) => {
  const SlashsArray = [];

  fs.readdir(`./comandos`, (error, folder) => {
    folder.forEach((subfolder) => {
      fs.readdir(`./comandos/${subfolder}/`, (error, files) => {
        files.forEach((file) => {
          if (!file?.endsWith(".js")) return;
          const command = require(`../comandos/${subfolder}/${file}`);
          if (!command?.name) return;
          client.slashCommands.set(command?.name, command);
          SlashsArray.push(command);
        });
      });
    });
  });

  client.on("ready", async () => {
    client.guilds.cache.forEach((guild) => guild.commands.set(SlashsArray));
  });

  client.on("guildCreate", async (guild) => {
    await guild.commands.set(SlashsArray);
  });
};