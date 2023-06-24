require('../index.js')
const Discord = require("discord.js");
const client = require('../index')

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

    const user = await usersCollection.findOne({ discordId: userId });
    if (user && user.lastVote) {
      const lastVoteTime = moment(user.lastVote);
      const currentTime = moment();
      const elapsedTime = currentTime.diff(lastVoteTime, 'hours');

      if (elapsedTime < 11) {
        return;
      }
    }

    const result = await usersCollection.updateOne(
      { discordId: userId },
      { $inc: { balance: +amount }, $set: { lastVote: moment().toDate() } },
      { upsert: true }
    );

    const fetchedUser = await client.users.fetch(userId);
    let embed = new Discord.EmbedBuilder()
      .setColor("Random")
      .setTitle("Obrigado por votar no top.gg!")
      .setDescription(`Obrigado por votar em mim! Cada voto me ajudar a crescer.\n\nComo forma de agradecimento, você acaba de ganhar **${amount} moedas**!\n\nContinue votando para receber recompensas!`);

    fetchedUser.send({ embeds: [embed] });
  } catch (error) {
    console.error(error);
  }
}));

//Página de Status
//app.get("/", (req, res) => {
//  res.send("Estou Online!");
//});

app.listen(8080, () => {
  console.log("🎁 Servidor do top.gg iniciado na porta 8080.");
});

async function checkAndSendReminders() {
  try {
    const db = mongoClient.db('users');
    const usersCollection = db.collection('users');
    const thresholdTime = moment().subtract(12, 'hours');
    const users = await usersCollection.find({ lastVote: { $lt: thresholdTime.toDate() } }).toArray();

    for (const user of users) {
      const userId = user.discordId;

      const fetchedUser = await client.users.fetch(userId);
      let embed = new Discord.EmbedBuilder()
        .setColor("Random")
        .setTitle("Vote na Nyssa Bot no Top.gg!")
        .setDescription(`Olá! Já se passaram 12 horas desde o seu último voto. Você pode votar novamente no top.gg para me ajudar e, além disso, receber uma recompensa especial.\n\n[Clique aqui para votar]https://top.gg/bot/944555548148375592/vote)`);

      fetchedUser.send({ embeds: [embed] });
      await usersCollection.updateOne(
        { discordId: userId },
        { $unset: { lastVote: "" } }
      );
    }
  } catch (error) {
    console.error(error);
  }
}

const interval = setInterval(checkAndSendReminders, 2 * 60 * 1000);
