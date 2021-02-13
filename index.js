require('dotenv').config();
const { readdir } = require("fs");
const { Client, Intents, Collection, MessageEmbed } = require('discord.js');
const textToSpeech = require('@google-cloud/text-to-speech');
const { Readable } = require('stream');
const cron = require('node-cron');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./unkoserver.db');
const client = new Client({ ws: { intents: Intents.ALL  } });
client.commands = new Collection();

readdir(__dirname + "/events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
      const event = require(__dirname + `/events/${file}`);
      let eventName = file.split(".")[0];
      client.on(eventName, event.bind(null, client));
      console.log("イベントのロード完了: "+eventName);
    });
});

readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
      if (!file.endsWith(".js")) return;
      let props = require(`./commands/${file}`);
      let commandName = file.split(".")[0];
      client.commands.set(commandName, props);
      console.log("コマンドファイルのロード完了: "+commandName);
    });
});

const Moneytable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'moneys';").get();
  if (!Moneytable['count(*)']) {
    sql.prepare("CREATE TABLE moneys (id TEXT PRIMARY KEY, user TEXT, guild TEXT, money INTEGER, dailylogin INTEGER, ticket INTEGER);").run();
    sql.prepare("CREATE UNIQUE INDEX idx_moneys_id ON moneys (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }
  client.getMoney = sql.prepare("SELECT * FROM moneys WHERE user = ? AND guild = ?");
  client.setMoney = sql.prepare("INSERT OR REPLACE INTO moneys (id, user, guild, money, dailylogin, ticket) VALUES (@id, @user, @guild, @money, @dailylogin, @ticket);");
  const Debttable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'debts';").get();
  if (!Debttable['count(*)']) {
    sql.prepare("CREATE TABLE debts (id TEXT PRIMARY KEY, user TEXT, guild TEXT, Tuna INTEGER, Shoulder TEXT);").run();
    sql.prepare("CREATE UNIQUE INDEX idx_debts_id ON debts (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }
  client.getDebt = sql.prepare("SELECT * FROM debts WHERE user = ? AND guild = ?");
  client.setDebt = sql.prepare("INSERT OR REPLACE INTO debts (id, user, guild, Tuna, Shoulder) VALUES (@id, @user, @guild, @Tuna, @Shoulder);");
  const Slotsettingstable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'slotsettings';").get();
  if (!Slotsettingstable['count(*)']) {
    sql.prepare("CREATE TABLE slotsettings (id TEXT PRIMARY KEY, guild TEXT, Jackpotprobability INTEGER, Jackpot INTEGER);").run();
    sql.prepare("CREATE UNIQUE INDEX idx_slotsettings_id ON slotsettings (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }
  client.getSlotsettings = sql.prepare("SELECT * FROM slotsettings WHERE guild = ?");
  client.setSlotsettings = sql.prepare("INSERT OR REPLACE INTO slotsettings (id, guild, Jackpotprobability, Jackpot) VALUES (@id, @guild, @Jackpotprobability, @Jackpot);");
  const Dailytable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'dailys';").get();
  if (!Dailytable['count(*)']) {
    sql.prepare("CREATE TABLE dailys (id TEXT PRIMARY KEY, user TEXT, guild TEXT, login INTEGER);").run();
    sql.prepare("CREATE UNIQUE INDEX idx_dailys_id ON dailys (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }
  client.getDaily = sql.prepare("SELECT * FROM dailys WHERE user = ? AND guild = ?");
  client.setDaily = sql.prepare("INSERT OR REPLACE INTO dailys (id, user, guild, login) VALUES (@id, @user, @guild, @login);");
  const Littlewartable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'littlewar';").get();
  if (!Littlewartable['count(*)']) {
    sql.prepare("CREATE TABLE littlewar (id TEXT PRIMARY KEY, user TEXT, guild TEXT, emoji1 INTEGER, emoji2 INTEGER, emoji3 INTEGER, number INTEGER);").run();
    sql.prepare("CREATE UNIQUE INDEX idx_littlewar_id ON littlewar (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }
  client.getLittlewar = sql.prepare("SELECT * FROM littlewar WHERE guild = ?");
  client.setLittlewar = sql.prepare("INSERT OR REPLACE INTO littlewar (id, user, guild, emoji1, emoji2, emoji3, number) VALUES (@id, @user, @guild, @emoji1, @emoji2, @emoji3, @number);");
  const Timertable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'timer';").get();
  if (!Timertable['count(*)']) {
    sql.prepare("CREATE TABLE timer (id TEXT PRIMARY KEY, guild TEXT, unkoserver INTEGER);").run();
    sql.prepare("CREATE UNIQUE INDEX idx_ltimer_id ON timer (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }
  client.getTimer = sql.prepare("SELECT * FROM timer WHERE guild = ?");
  client.setTimer = sql.prepare("INSERT OR REPLACE INTO timer (id, guild, unkoserver) VALUES (@id, @guild, @unkoserver);");
  const Snstable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'snss';").get();
  if (!Snstable['count(*)']) {
    sql.prepare("CREATE TABLE snss (id TEXT PRIMARY KEY, user TEXT, guild TEXT, title TEXT, url TEXT, count INTEGER);").run();
    sql.prepare("CREATE UNIQUE INDEX idx_snss_id ON snss (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }
  client.getSns = sql.prepare("SELECT * FROM snss WHERE user = ? AND guild = ?");
  client.setSns = sql.prepare("INSERT OR REPLACE INTO snss (id, user, guild, title, url, count) VALUES (@id, @user, @guild, @title, @url, @count);");
  const ServerMoneytable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'servermoney';").get();
  if (!ServerMoneytable['count(*)']) {
    sql.prepare("CREATE TABLE servermoney (id TEXT PRIMARY KEY, guild TEXT, money INTEGER);").run();
    sql.prepare("CREATE UNIQUE INDEX idx_servermoney_id ON servermoney (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }
  client.getServerMoney = sql.prepare("SELECT * FROM servermoney WHERE guild = ?");
  client.setServerMoney = sql.prepare("INSERT OR REPLACE INTO servermoney (id, guild, money) VALUES (@id, @guild, @money);");

cron.schedule('0 0 15,23,7 * * *', () => {
  const sns10 = sql.prepare("SELECT * FROM snss WHERE guild = ? ORDER BY user DESC;").all('706452606918066237');
  let content = ''
  for (let data of sns10) {
    content += `[${data.title}](${data.url})\n`;
    data.count++;
    client.setSns.run(data);
    if(data.count > 8)
    {
      sql.prepare(`DELETE FROM snss WHERE user = ${data.user} AND guild = ${data.guild}`).run();
    }
  }
  client.channels.cache.get('706452607538954263').send(`これは宣伝です！`,                                                      
  new MessageEmbed()
  .setDescription(`匿名で参加できるアンケートを設置しています。暇なときに記入してみてください。貴重な意見を待っています。\n[うんこ鯖アンケート](https://forms.gle/aRtBT1piAofz3vJM6)\n[みんなが遊びたい理想の鯖とは](https://docs.google.com/forms/d/156rdFiJkwUzNsHvx9KBNnEdoTFvJINsABn7x6hP8vzw/edit)\n${content}`)
  .setColor('RANDOM')
  .setTimestamp()
  );
})
cron.schedule('0 0 15 * * *', () => {
  sql.prepare("DROP TABLE dailys;").run();
  const testtable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'dailys';").get();
  if (!testtable['count(*)']) {
    sql.prepare("CREATE TABLE dailys (id TEXT PRIMARY KEY, user TEXT, guild TEXT, login INTEGER);").run();
    sql.prepare("CREATE UNIQUE INDEX idx_dailys_id ON dailys (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }
  let timerdata = client.getTimer.get('706452606918066237');
  timerdata.unkoserver -= 1;
  client.setTimer.run(timerdata);
  if(timerdata.unkoserver === 1){
     for (let i = 0; i < 10; i++) {
        client.channels.cache.get('706469264638345227').send('@everyone うんこ鯖復活！');
     }
  }
  let servermoneydata = client.getServerMoney.get('706452606918066237');
  const all = sql.prepare("SELECT * FROM moneys WHERE guild = ? ORDER BY money DESC;").all('706452606918066237');
  for (let data of all) {
    let zeikin = Math.ceil( data.money / 1.15 );
    data.money -= zeikin;
    servermoneydata.money += zeikin;
    client.setMoney.run(data);
  }
  client.setServerMoney.run(servermoneydata);
});
cron.schedule('* * * * *', () => {
  client.channels.cache.get('798479605764718592').messages.fetch('799635530882744372')
  .then( msg => {
    const Win = client.getSlotsettings.get('706452606918066237').Jackpot;
    const money = client.getServerMoney.get('706452606918066237').money;
    const embed = new MessageEmbed()
    .setDescription(`現在のジャックポット: ${Win}うんコイン\n現在のうんこサーバーのお金: ${money}うんコイン`)
    .setColor('RANDOM')
    .setTimestamp();
    const top10 = sql.prepare("SELECT * FROM moneys WHERE guild = ? ORDER BY money DESC LIMIT 10;").all('706452606918066237');
    let rank = 1;
    for(const data of top10)
    {
      const user = client.guilds.cache.get('706452606918066237').member(data.user);
      let usertag = ''
      if(!user){
        usertag = '取得できないユーザー';
      }
      else{
        usertag = user.user.tag;
      }
      embed.addFields({ name: `${rank}位: ${usertag}`, value: `${data.money}うんコイン` });
      rank++;
    }
    msg.edit(embed);
  })
  client.channels.cache.get('780012050163302420').messages.fetch('800279738509426728')
  .then( msg => {
    const timerdata = client.getTimer.get('706452606918066237').unkoserver;
    msg.edit(
      new MessageEmbed()
      .setTitle('💩うんこサーバーの現在の状態💩')
      .setDescription('うんこサーバーは現在落ちてます\nうんこ鯖が生き返るまで残り'+timerdata+'日')
      .setImage('https://media.discordapp.net/attachments/800317829962399795/800317874614829086/setumeisitekudasai.jpg')
      .setColor('RANDOM')
      .setTimestamp()
    );
  })
});

const handleReaction = async (channelID, messageID, callback) => {
  const channel = await client.channels.fetch(channelID);
  const message = await channel.messages.fetch(messageID);
  const collector = message.createReactionCollector(() => true);
  collector.on('collect', (reaction, user) => callback(reaction, user));
}
handleReaction('774594290679545886', '794246738881019915', async (reaction, user) => {
  if (reaction.emoji.id === '790538555407597590') {
    if(reaction.message.guild.member(user).roles.cache.has('717326376516190221')){
      reaction.message.guild.member(user).roles.remove('717326376516190221'); 
      const reply = await client.channels.cache.get('774594290679545886').send(`${user} 必殺絵文字人を剥奪しました`);
      reply.delete({ timeout: 5000 });
    }
    else{
      reaction.message.guild.member(user).roles.add('717326376516190221');
      const reply = await client.channels.cache.get('774594290679545886').send(`${user} 必殺絵文字人を付与しました`);
      reply.delete({ timeout: 5000 });
    }
 }
  else if (reaction.emoji.id === '774598967459446784') {
      if(reaction.message.guild.member(user).roles.cache.has('774593459034128395')){
        reaction.message.guild.member(user).roles.remove('774593459034128395');
        const reply = await client.channels.cache.get('774594290679545886').send(`${user} among us crewを剥奪しました`);
        reply.delete({ timeout: 5000 });
      }
      else{
        reaction.message.guild.member(user).roles.add('774593459034128395');
        const reply = await client.channels.cache.get('774594290679545886').send(`${user} among us crewを付与しました`);
        reply.delete({ timeout: 5000 });
      }
  }
  else if (reaction.emoji.id === '790546684710223882') {
    if(reaction.message.guild.member(user).roles.cache.has('780217228649562113')){
      reaction.message.guild.member(user).roles.remove('780217228649562113');
      const reply = await client.channels.cache.get('774594290679545886').send(`${user} 臨時お知らせを剥奪しました`);
      reply.delete({ timeout: 5000 });
    }
    else{
      reaction.message.guild.member(user).roles.add('780217228649562113');
      const reply = await client.channels.cache.get('774594290679545886').send(`${user} 臨時お知らせを付与しました\n10分後自動で剥奪します`);
      reply.delete({ timeout: 5000 });
      setTimeout(() => {
        reaction.message.guild.member(user).roles.remove('780217228649562113');
      }, 600000)
    }
  }
});
handleReaction('802079467739676692', '802115362526330930', async (reaction, user) => {
  let usermoneydata = client.getMoney.get(user.id, '706452606918066237');
  　 if (!usermoneydata) {
      usermoneydata　= { id: `706452606918066237-${user.id}`, user: user.id, guild: '706452606918066237', money: 0, dailylogin: 0, ticket: 0 }
    }
    let userdebtdata = client.getDebt.get(user.id, '706452606918066237');
    if (!userdebtdata) {
      userdebtdata　= { id: `706452606918066237-${user.id}`, user: user.id, guild: '706452606918066237', Tuna: 0, Shoulder: null }
    }
    if(userdebtdata.Tuna === 1){
      const reply = await client.channels.cache.get('802079467739676692').send(`${user}、お前借金返済中やん！`);
      reply.delete({ timeout: 5000 });
      return; 
    }
    if (reaction.emoji.name === '0️⃣') {
       usermoneydata.ticket++;
       usermoneydata.money -= 5000;
       const reply = await client.channels.cache.get('802079467739676692').send(`${user}、うんこチケットを5000うんコインで購入しました。`);
       reply.delete({ timeout: 5000 });
    }
    client.setMoney.run(usermoneydata);
    client.setDebt.run(userdebtdata);
});

async function textToSpeechReadableStream(text) {
    const request = {
      input: {text},
      voice: {
        languageCode: 'ja-JP',
        name: 'ja-JP-Wavenet-A'
      },
      audioConfig: {
        audioEncoding: 'OGG_OPUS',
        speakingRate: 1.2
      }
    };
  
    const [response] = await textclient.synthesizeSpeech(request);
    const stream = new Readable({ read() {} });
    stream.push(response.audioContent);
  
    return stream;
  }
  const textclient = new textToSpeech.TextToSpeechClient({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
    }
  });
  (async function main() {
    const discordClient = new Client({
      messageCacheMaxSize: 20,
      messageSweepInterval: 30
    });
    discordClient.on('voiceStateUpdate', () => {
      const conn = discordClient.voice.connections.get(process.env.DISCORD_GUILD_ID);
      if(conn && conn.channel && conn.channel.members.array().length < 2) {
        conn.disconnect();
      }
    });
    discordClient.on('message', async (message) => {
      if(message.author.bot || !message.guild) return
      const guild = message.guild;
      const channel = message.member.voice.channel;
      if(
        !message.member.voice.selfMute || guild.id !== process.env.DISCORD_GUILD_ID || 
        !channel || message.channel.id !== process.env.DISCORD_SOURCE_CHANNEL_ID
      ) {
        return;
      }
      const text = message
          .content
          .replace(/https?:\/\/\S+/g, 'URL省略')
          .replace(/<a?:.*?:\d+>/g, '絵文字省略') 
          .replace(/<@!?.*?>/g, 'メンション省略')
          .replace(/<#.*?>/g, 'メンション省略')
          .replace(/<@&.*?>/g, 'メンション省略')
          .slice(0, 50);
      if(!text) { return; }
      if(channel.members.array().length < 1) { return; }
      const currentConnection = discordClient.voice.connections.get(process.env.DISCORD_GUILD_ID);
      const shouldMove = !currentConnection || currentConnection.channel.id !== channel.id;
      const conn = shouldMove ? await channel.join() : currentConnection;
      conn.play(await textToSpeechReadableStream(text), {highWaterMark: 6, bitrate: 'auto'})
    });
    discordClient.once('ready', () => {
      console.log('[INFO] Connected to Discord successfully!');
    });
    discordClient.login(process.env.DISCORD_BOT_TOKEN);
  })().catch((e) => console.error(e));

process.on('unhandledRejection', error => {
    client.users.cache.get('714455926970777602').send(
      new MessageEmbed()
      .setDescription('エラー内容\n```'+error+'```')
      .setColor('RANDOM')
      .setTimestamp()
    );
    console.error(`[ERROR!]\n${error}`);
});
  
client.login();