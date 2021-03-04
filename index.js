require('dotenv').config();
const { readdir } = require("fs");
const { Client, Intents, Collection, MessageEmbed } = require('discord.js');
const cron = require('node-cron');
const client = new Client({ ws: { intents: Intents.ALL } });
client.commands = new Collection();

readdir(__dirname + "/events/discord/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(__dirname + `/events/discord/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    console.log("イベントのロード完了: " + eventName);
  });
});

readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
    console.log("コマンドファイルのロード完了: " + commandName);
  });
});

readdir(__dirname + "/events/cron/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(__dirname + `/events/cron/${file}`);
    let eventTime = file.split(".")[0];
    cron.schedule(eventTime, event.bind(null, client))
    console.log("時間イベントのロード完了: " + eventName);
  });
});

process.on('unhandledRejection', (reason, promise) => {
  console.error(reason);
  client.users.cache.get('714455926970777602').send(
    new MessageEmbed()
      .setDescription('エラー内容:\n```' + reason + '```')
      .setColor('RANDOM')
      .setTimestamp()
  );
});

client.login();