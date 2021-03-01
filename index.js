require('dotenv').config();
const { readdir } = require("fs");
const { Client, Intents, Collection, MessageEmbed, MessageAttachment, WebhookClient } = require('discord.js');
const cron = require('node-cron');
const util = require('minecraft-server-util');
const status = require('./dat/status.json');
const SQLite = require("better-sqlite3");
const sql = new SQLite('unkoserver.db');
const client = new Client({ ws: { intents: Intents.ALL } });
client.commands = new Collection();

readdir(__dirname + "/events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(__dirname + `/events/${file}`);
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

cron.schedule('0 0 15,23,7 * * *', () => {
  const sns10 = sql.prepare("SELECT * FROM snss WHERE guild = ? ORDER BY user DESC;").all('706452606918066237');
  let content = ''
  for (let data of sns10) {
    content += `[${data.title}](${data.url})\n`;
    data.count++;
    client.setSns.run(data);
    if (data.count > 8) {
      sql.prepare(`DELETE FROM snss WHERE user = ${data.user} AND guild = ${data.guild}`).run();
    }
  }
  client.channels.cache.get('706452607538954263').send(`これは宣伝です！`,
    new MessageEmbed()
      .setDescription(`匿名で参加できるアンケートを設置しています。暇なときに記入してみてください。貴重な意見を待っています。\n[うんこ鯖アンケート](https://forms.gle/aRtBT1piAofz3vJM6)\n[みんなが遊びたい理想の鯖とは](https://docs.google.com/forms/d/156rdFiJkwUzNsHvx9KBNnEdoTFvJINsABn7x6hP8vzw/edit)\n${content}`)
      .setColor('RANDOM')
      .setTimestamp()
  );
});

cron.schedule('0 0 15 * * *', () => {
  const time = new Date();
  sql.backup(`${time}.db`)
    .then(() => {
      client.guilds.cache.get('775952658779209770').channels.create(time, { parent: '815547487506137129', position: 0, type: 'text' })
        .then(channel => {
          channel.send(new MessageAttachment(`${time}.db`));
        });
    });
  sql.prepare("DROP TABLE dailys;").run();
  const testtable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'dailys';").get();
  if (!testtable['count(*)']) {
    sql.prepare("CREATE TABLE dailys (id TEXT PRIMARY KEY, user TEXT, guild TEXT, login INTEGER);").run();
    sql.prepare("CREATE UNIQUE INDEX idx_dailys_id ON dailys (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }
  let servermoneydata = client.getServerMoney.get('706452606918066237');
  const all = sql.prepare("SELECT * FROM moneys WHERE guild = ? ORDER BY money DESC;").all('706452606918066237');
  for (let data of all) {
    if (data.money > 1) {
      const zeikin = Math.ceil(data.money / 1.15);
      data.money -= zeikin;
      servermoneydata.money += zeikin;
      client.setMoney.run(data);
    }
    else if (data.money < 0) {
      let userdebtdata = client.getDebt.get(data.user, '706452606918066237');
      if (!userdebtdata) {
        userdebtdata = { id: `706452606918066237-${data.user}`, user: data.user, guild: '706452606918066237', Tuna: 0, Shoulder: null }
      }
      if (userdebtdata.Tuna === 0) {
        client.guilds.cache.get('706452606918066237').member(data.user).roles.add('798570033235755029');
        userdebtdata.Tuna = 1;
        const webhook = new WebhookClient('798186603235246111', 'Rf6vyUbm7GuwLOmmHseu-QZp7bV7QOYykwEoqzrSLX3Rjkza_7ipOsbJQGe9BKoGNiHn');
        webhook.send(`<@${data.user}>、開けろごらああ！てめえ自分が何シてんのかわかってるのか！！？\n${usermoneydata.money * -1}円、しっかり払ってもらうで`);
      }

      client.setDebt.run(userdebtdata);
    }
  }
  client.setServerMoney.run(servermoneydata);
});

cron.schedule('* * * * *', () => {
  client.channels.cache.get('798479605764718592').messages.fetch('799635530882744372')
    .then(msg => {
      const Win = client.getSlotsettings.get('706452606918066237').Jackpot;
      const money = client.getServerMoney.get('706452606918066237').money;
      const embed = new MessageEmbed()
        .setDescription(`現在のジャックポット: ${Win}うんコイン\n現在のうんこサーバーのお金: ${money}うんコイン`)
        .setColor('RANDOM')
        .setTimestamp();
      const top10 = sql.prepare("SELECT * FROM moneys WHERE guild = ? ORDER BY money DESC LIMIT 10;").all('706452606918066237');
      let rank = 1;
      for (const data of top10) {
        const user = client.guilds.cache.get('706452606918066237').member(data.user);
        let usertag = ''
        if (!user) {
          usertag = '取得できないユーザー';
        }
        else {
          usertag = user.user.tag;
        }
        embed.addFields({ name: `${rank}位: ${usertag}`, value: `${data.money}うんコイン` });
        rank++;
      }
      msg.edit(embed);
    })
  client.channels.cache.get('780012050163302420').messages.fetch('800279738509426728')
    .then(msg => {
      util.statusBedrock('126.235.33.140')
        .then((result) => {
          msg.edit(
            new MessageEmbed()
              .setTitle('💩うんこサーバーの現在の状態💩')
              .addField('IPアドレス', result.host)
              .addField('ポート', result.port)
              .addField('サーバーのバージョン', result.version)
              .addField('現在参加中のメンバー', `${result.onlinePlayers}/${result.maxPlayers}人`)
              .setImage('https://media.discordapp.net/attachments/800317829962399795/800317877168373760/UnkoServerkoiyo.png')
              .setColor('RANDOM')
              .setTimestamp()
          );
        })
        .catch((error) => {
          msg.edit(
            new MessageEmbed()
              .setTitle('💩うんこサーバーの現在の状態💩')
              .setDescription('うんこサーバーは現在落ちてます')
              .setImage('https://media.discordapp.net/attachments/800317829962399795/800317874614829086/setumeisitekudasai.jpg')
              .setColor('RANDOM')
              .setTimestamp()
          );
          console.error(error);
        });
    })
});

cron.schedule('0,15,30,45 * * * *', () => {
  let random = Math.floor(Math.random() * status.length);
  client.user.setPresence({ activity: { name: status[random].name, type: status[random].playingtype }, status: 'online' });
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