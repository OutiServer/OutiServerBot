require('dotenv').config();
const fs = require("fs");
const { Client, Intents, Collection } = require('discord.js');
const cron = require('node-cron');
const { Database } = require('./unko/index');
const client = new Client({ messageCacheMaxSize: 20, messageSweepInterval: 30, fetchAllMembers: true, ws: { intents: Intents.ALL } });
client.commands = new Collection();
const db = new Database('unkoserver.db');

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
    cron.schedule(eventTime, event.bind(null, client));
    console.log("時間イベントのロード完了: " + eventTime);
  });
});

const disboarddata = db.DisboardtimerGet('706452606918066237');
const task1 = cron.schedule(`${disboarddata.second} ${disboarddata.miute} ${disboarddata.hour} * * *`, () => {
  client.channels.cache.get('706452606918066237').send('Bumpしてから二時間経ちました<:emoji_121:820198227147751474>')
  task1.destroy();
});

const dissokudata = db.DissokutimerGet('706452606918066237');
const task2 = cron.schedule(`${dissokudata.second} ${dissokudata.miute} ${dissokudata.hour} * * *`, () => {
  message.channel.send('Upしてから一時間経ちました<:emoji_121:820198227147751474>');
  task2.destroy();
});

client.login();