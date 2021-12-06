require('dotenv').config();
const { readdir, readdirSync } = require('fs');
const cron = require('node-cron');
const path = require('path');
const Bot = require('./utils/Bot');
const client = new Bot('outiserver.db');

// Processイベント読み込み
readdir(path.join(__dirname, '/events/process/'), (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(path.join(__dirname, `/events/process/${file}`));
    const eventName = file.split('.')[0];
    process.on(eventName, event.bind(null, client));
    console.log(`Process ${eventName} event is Loading`);
  });
});

// Discordイベント読み込み
readdir(path.join(__dirname, '/events/discord/'), (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(path.join(__dirname, `/events/discord/${file}`));
    const eventName = file.split('.')[0];
    client.on(eventName, event.bind(null, client));
    console.log(`Discord ${eventName} event is Loading`);
  });
});

// Cornイベント読み込み
readdir(path.join(__dirname, '/events/cron/'), (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(path.join(__dirname, `/events/cron/${file}`));
    const eventTime = file.split('.')[0];
    cron.schedule(eventTime, event.bind(null, client));
    console.log(`time ${eventTime} event is Loading`);
  });
});

// Command読み込み
const commandFolders = readdirSync(path.join(__dirname, '/commands'));
for (const folder of commandFolders) {
  const commandFiles = readdirSync(path.join(__dirname, `/commands/${folder}`)).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(path.join(__dirname, `/commands/${folder}/${file}`));
    client.commands.set(command.info.name, command);
    console.log(`${command.info.name} command is Loading`);
  }
}


client.login()
  .catch(error => {
    console.error(error);
    process.exit(-1);
  });