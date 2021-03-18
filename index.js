require('dotenv').config();
const fs = require("fs");
const { Client, Intents, Collection } = require('discord.js');
const cron = require('node-cron');
const client = new Client({ messageCacheMaxSize: 20, messageSweepInterval: 30, fetchAllMembers: true, ws: { intents: Intents.ALL } });
client.commands = new Collection();

fs.readdir(__dirname + "/events/process/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(__dirname + `/events/process/${file}`);
    let eventName = file.split(".")[0];
    process.on(eventName, event.bind(null, client))
    console.log("Processイベントのロード完了: " + eventName);
  });
});

fs.readdir(__dirname + "/events/discord/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(__dirname + `/events/discord/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    console.log("Discordイベントのロード完了: " + eventName);
  });
});

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
    console.log("コマンドファイルのロード完了: " + commandName);
  });
});

fs.readdir(__dirname + "/events/cron/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(__dirname + `/events/cron/${file}`);
    let eventTime = file.split(".")[0];
    const task = cron.schedule(eventTime, event.bind(null, client, task));
    console.log("時間イベントのロード完了: " + eventTime);
  });
});

client.login();