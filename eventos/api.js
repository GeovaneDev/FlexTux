const Discord = require("discord.js");
const client = require('../index');
const Topgg = require("@top-gg/sdk");
const express = require("express");
const { mongoClient } = require('../index');
const moment = require('moment');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const webhook = new Topgg.Webhook(process.env.TOP_GG_WEBHOOK);

app.post("/dblwebhook", webhook.listener(async vote => {
  try {
    const userId = vote.user;
    const amount = 1300;

    const db = mongoClient.db('users');
    const usersCollection = db.collection('users');

    const result = await usersCollection.updateOne(
      { discordId: userId },
      { $inc: { balance: +amount }, $set: { lastVote: moment().toDate() } },
      { upsert: true }
    );

    const user = await client.users.fetch(userId);
    let embed = new Discord.EmbedBuilder()
      .setColor("Random")
      .setTitle("Obrigado por votar no top.gg!")
      .setDescription(`Obrigado por votar em mim! Cada voto me ajuda a crescer.\n\nComo forma de agradecimento, você acaba de ganhar **${amount} moedas**!\n\nContinue votando para receber recompensas!`);

    user.send({ embeds: [embed] });
  } catch (error) {
    console.error(error);
  }
}));

app.get("/", (req, res) => {
  res.send("API Online!");
});

app.get("/api/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await client.users.fetch(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json({
      avatarUrl: user.displayAvatarURL(),
      id: user.id,
      username: user.username,
      nome: user.displayName,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar informações do usuário" });
  }
});

app.get("/api/server/:serverId", async (req, res) => {
  try {
    const serverId = req.params.serverId;
    const server = client.guilds.cache.get(serverId);

    if (!server) {
      return res.status(404).json({ error: "Servidor não encontrado" });
    }

    res.json({
      avatarUrl: server.iconURL(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar informações do servidor" });
  }
});

async function checkAndSendReminders() {
  try {
    const db = mongoClient.db('users');
    const usersCollection = db.collection('users');
    const thresholdTime = moment().subtract(12, 'hours');
    const users = await usersCollection.find({ lastVote: { $lt: thresholdTime.toDate() } }).toArray();

    for (const user of users) {
      const userId = user.discordId;

      const user2 = await client.users.fetch(userId);
      let embed = new Discord.EmbedBuilder()
        .setColor("Random")
        .setTitle("Vote no FlexTux no Top.gg!")
        .setDescription(`Olá! Já se passaram 12 horas desde o seu último voto. Você pode votar novamente no top.gg para me ajudar e, além disso, receber uma recompensa.\n\n[Clique aqui para votar](https://top.gg/bot/944555548148375592/vote)`);

      user2.send({ embeds: [embed] });
      await usersCollection.updateOne(
        { discordId: userId },
        { $unset: { lastVote: "" } }
      );
    }
  } catch (error) {
    console.error(error);
  }
}

const interval = setInterval(checkAndSendReminders, 5 * 60 * 1000);

app.listen(8080, () => {
  console.log("🎁 Servidor do top.gg iniciado na porta 8080.");
});
