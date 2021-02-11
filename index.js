require('dotenv').config();
const { readdir } = require("fs");
const { Client, Intents, Collection, MessageEmbed } = require('discord.js');
const textToSpeech = require('@google-cloud/text-to-speech');
const { Readable } = require('stream');
const cron = require('node-cron');
const SQLite = require("better-sqlite3");
const { kill } = require('process');
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

cron.schedule('0 0 15,23,7 * * *', () => {
  const sns10 = sql.prepare("SELECT * FROM snss WHERE guild = ? ORDER BY user DESC LIMIT 10;").all('706452606918066237');
  let content = ''
  for (let data of sns10) {
    content += `[${data.title}](${data.url})`;
    let usersnsdata = client.getSns.get(data.user, data.guild);
    usersnsdata.count++;
    client.setSns.run(usersnsdata);
  }
  client.channels.cache.get('706452607538954263').send(`匿名で参加できるアンケートを設置しています。暇なときに記入してみてください。貴重な意見を待っています。\nhttps://forms.gle/aRtBT1piAofz3vJM6\nhttps://docs.google.com/forms/d/156rdFiJkwUzNsHvx9KBNnEdoTFvJINsABn7x6hP8vzw/edit\n\n${content}`);
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
  if(timerdata.unkoserver < 1){
     for (let i = 0; i < 10; i++) {
        client.channels.cache.get('706469264638345227').send('@everyone うんこ鯖復活！');
     }
  }
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
  
client.login(process.env.DISCORD_BOT_TOKEN);