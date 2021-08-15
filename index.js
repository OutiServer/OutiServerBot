require('dotenv').config();
const fs = require("fs");
const cron = require('node-cron');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const http = require('http');
const Bot = require('./Utils/Bot');
const indexRouter = require('./routes/index');
const client = new Bot('outiserver.db');
const app = express();
const port = process.env.PORT || 3000;

// Web関係設定
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', (req, res, next) => indexRouter(client, req, res, next));
app.set('port', port);

// 404
app.use(function (req, res, next) {
  next(createError(404));
});

// エラー
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const server = http.createServer(app);
server.listen(port);

// Processイベント読み込み
fs.readdir(__dirname + "/events/process/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(__dirname + `/events/process/${file}`);
    let eventName = file.split(".")[0];
    process.on(eventName, event.bind(null, client))
    console.log(`Process ${eventName} event is Loading`);
  });
});

// Serverイベント読み込み
fs.readdir(__dirname + "/events/server/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(__dirname + `/events/server/${file}`);
    let eventName = file.split(".")[0];
    server.on(eventName, event.bind(null, client))
    console.log(`Server ${eventName} event is Loading`);
  });
});

// Discordイベント読み込み
fs.readdir(__dirname + "/events/discord/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(__dirname + `/events/discord/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    console.log(`Discord ${eventName} event is Loading`);
  });
});

// Cornイベント読み込み
fs.readdir(__dirname + "/events/cron/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(__dirname + `/events/cron/${file}`);
    let eventTime = file.split(".")[0];
    cron.schedule(eventTime, event.bind(null, client));
    console.log(`time ${eventTime} event is Loading`);
  });
});

// Command読み込み
const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.info.name, command);
    console.log(`${command.info.name} command is Loading`);
  }
}



client.login()
  .catch(error => {
    console.error(error);
    process.exit(-1);
  });