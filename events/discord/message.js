const { Client, Message, MessageEmbed } = require('discord.js');
const textToSpeech = require('@google-cloud/text-to-speech');
const { Readable } = require('stream');
const fetch = require('node-fetch');
const { Database } = require('../../home/index');
const { errorlog } = require('../../functions/error');

/**
 * @param {Client} client
 * @param {Message} message
 */

module.exports = async (client, message) => {
  try {
    const db = new Database('unkoserver.db');
    if (message.author.id === '825373463757193237') {
      message.channel.send(message.embeds[0].fields[1].value);
      const user = message.guild.members.cache.find(user => user.user.tag === message.embeds[0].fields[0].value);
      if (!user) return message.channel.send('ゲーマータグの自動追加に失敗しました、コマンドで手動追加してください。');
      db.GamertagSet(user.id, message.embeds[0].fields[1].value);
    }
    else if (message.author.id === '786343397807620106') {
      fetch(`https://script.google.com/macros/s/AKfycbweJFfBqKUs5gGNnkV2xwTZtZPptI6ebEhcCU2_JvOmHwM2TCk/exec?text=${encodeURIComponent(message.content)}&source=en&target=ja`)
        .then(res => res.text())
        .then(content => message.channel.send(content));
    }

    if (message.author.id == "302050872383242240" && message.guild.id === '706452606918066237') {
      if (message.embeds[0].url == "https://disboard.org/" && (message.embeds[0].description.match(/表示順をアップしたよ/) || message.embeds[0].description.match(/Bump done/) || message.embeds[0].description.match(/Bump effectué/) || message.embeds[0].description.match(/Bump fatto/) || message.embeds[0].description.match(/Podbito serwer/) || message.embeds[0].description.match(/Успешно поднято/) || message.embeds[0].description.match(/갱신했어/) || message.embeds[0].description.match(/Patlatma tamamlandı/))) {
        const bump_user = message.embeds[0].description.split(',')[0];
        const bumpcountdata = db.BumpUpCountGet(bump_user.split('<@')[1].split('>')[0]);
        bumpcountdata.bump++;
        message.channel.send(bump_user,
          new MessageEmbed()
            .setDescription(`${bumpcountdata.bump}回目のBumpです、二時間後にこのチャンネルで通知します`)
            .setColor('RANDOM')
            .setTimestamp()
        );
        db.BumpUpCountSet(bumpcountdata);
        setTimeout(() => {
          message.channel.send(`Bumpしてから二時間経ちました\n\`!d bump\` を実行しましょう<:emoji_121:820198227147751474>`);
        }, 7200000);
      }
      else if (message.embeds[0].url == "https://disboard.org/" && (message.embeds[0].description.match(/このサーバーを上げられるようになるまで/) || message.embeds[0].description.match(/あなたがサーバーを上げられるようになるまで/))) {
        const waittime_bump = message.embeds[0].description.split("と")[1].split("分")[0];
        const bump_user = message.embeds[0].description.split(',')[0]
        message.channel.send(`${bump_user}、Bumpに失敗したようです、${waittime_bump}分後にもう一度もう一度実行してください！<:unkooo:790538555407597590>`);
      }
    }
    else if (message.author.id == "761562078095867916" && message.guild.id === '706452606918066237') {
      if (message.embeds[0].url == "https://dissoku.net/" && message.embeds[0].fields[0].name.endsWith('をアップしたよ!')) {
        const up_user = message.embeds[0].description.split(/\s+/)[0];
        const upcountdata = db.BumpUpCountGet(up_user.split('<@')[1].split('>')[0]);
        upcountdata.up++;
        message.channel.send(up_user,
          new MessageEmbed()
            .setDescription(`${upcountdata.up}回目のupです、一時間後にこのチャンネルで通知します`)
            .setColor('RANDOM')
            .setTimestamp()
        );
        db.BumpUpCountSet(upcountdata);
        setTimeout(() => {
          message.channel.send(`Upしてから一時間経ちました\n\`/dissoku up!\` を実行しましょう<:emoji_121:820198227147751474>`);
        }, 3600000);
      }
      else if (message.embeds[0].url == "https://dissoku.net/" && message.embeds[0].fields[0].value.startsWith('間隔をあけてください')) {
        const waittime_up = message.embeds[0].fields[0].value.split("間隔をあけてください")[1].split('(')[1].split(')')[0];
        const up_user = message.embeds[0].description.split(/\s+/)[0];
        message.channel.send(`${up_user}、Upに失敗したようです、${waittime_up}後にもう一度もう一度実行してください！<:unkooo:790538555407597590>`);
      }
    }


    if (message.channel.id === '833626570270572584' && message.author.id === '784043588426006548') {
      const content = message.content.split(/\s+/);
      if (content[2] === '[Guest]') {
        client.channels.cache.get('834317763769925632').send(`**${content[3]}** >> ${content[5]}`);
      }
      else if (content[3] === 'がゲームに参加しました') {
        client.channels.cache.get('834317763769925632').send(`**${content[2]}** がサーバーに参加しました。`)
      }
      else if (content[11] === 'によってログアウトされました') {
        client.channels.cache.get('834317763769925632').send(`**${content[3]}** がサーバーから退出しました。`);
      }
    }

    const usersettingdata = db.UserSettingget(message.author.id);

    if (!message.guild || message.system || message.author.bot || usersettingdata.ban === 1) return;

    yomiage(client, message);

    if (message.channel.id === '834317763769925632') {
      if (message.content.startsWith('/')) {
        if (usersettingdata.admin !== 1) return;
        client.channels.cache.get('833626570270572584').send(message.content);
      }
      client.channels.cache.get('833626570270572584').send(`/say ${message.author.tag} ${message.content}`);
    }

    if (message.channel.id === '706469264638345227') {
      message.react('👍');
      message.react('👎');
    }

    if (message.channel.parentID === '801057223139917884') {
      message.member.roles.add('801796340057112589');
    }

    if (message.channel.id === '828267048807039037') {
      message.delete();
      message.guild.channels.create(message.content, { type: 'text', topic: `${message.author.tag}さんのスレッドです。\n${message.content}`, parent: '828266382277345310' })
        .then(channel => {
          channel.send(message.author,
            new MessageEmbed()
              .setTitle('スレッドを作成しました！')
              .setDescription(message.content)
              .setColor('RANDOM')
              .setTimestamp()
          )
            .then(msg => msg.pin());
        });
    }

    const userleveldata = db.levelget(message.author.id, message.guild.id);

    if (message.guild.id === '706452606918066237') {
      if (userleveldata.level >= 10) message.member.roles.add('824554360699879455');
      if (userleveldata.level >= 20) message.member.roles.add('825245951295225896');
      if (userleveldata.level >= 30) message.member.roles.add('830368022916104203');

      if (!client.levelcooldown.get(message.author.id)) {
        let xp = Math.ceil(Math.random() * 25);
        userleveldata.xp += xp
        userleveldata.allxp += xp;
        client.levelcooldown.set(message.author.id, true);
      }

      if (userleveldata.xp >= userleveldata.level * 55) {
        userleveldata.xp -= userleveldata.level * 55;
        userleveldata.level++;
        const levelup = [`${message.author}、あなたのレベルが${userleveldata.level}に上がりました！<:owoxv:816282137065947136>`, `${message.author}、あなたのレベルが${userleveldata.level}に上がっりました！<:owotukkomi:778507729517412402>`, `GG ${message.author}, you just advanced to level ${userleveldata.level}!<:emoji_106:790546684710223882>`, `${message.author} あなたのレベルが${userleveldata.level}に上がったで。😉`];
        let random = Math.floor(Math.random() * levelup.length);
        message.channel.send(levelup[random]);
      }
    }

    db.levelset(userleveldata);

    const URL_PATTERN = /http(?:s)?:\/\/(?:.*)?discord(?:app)?\.com\/channels\/(?:\d{17,19})\/(?<channelId>\d{17,19})\/(?<messageId>\d{17,19})/g;
    let result;
    while ((result = URL_PATTERN.exec(message.content)) !== null) {
      const group = result.groups;
      client.channels.fetch(group.channelId)
        .then(channel => channel.messages.fetch(group.messageId))
        .then(targetMessage => message.channel.send(targetMessage.author.username + 'のメッセージを展開します\n\n',
          new MessageEmbed()
            .setDescription(targetMessage.cleanContent)
            .setColor('RANDOM')
            .setTimestamp()))
        .catch(error => message.reply(error)
          .then(message => message.delete({ timeout: 10000 }))
          .catch(console.error)
        );
    }

    if (!message.content.startsWith(process.env.PREFIX)) return;
    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (!command) return;
    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.info.aliases && cmd.info.aliases.includes(command));
    if (!cmd || cmd.info.owneronly && message.author.id !== process.env.OWNERID || cmd.info.adminonly && usersettingdata.admin !== 1) {
      return message.reply('そんなコマンドないで。😉');
    }
    else if (client.cooldown.get(message.author.id)) return message.reply('前のコマンドがまだ実行中やで。😉')
    client.cooldown.set(message.author.id, true);
    cmd.run(client, message, args);
  } catch (error) {
    errorlog(client, message, error);
  }
};

async function textToSpeechReadableStream(text) {
  const request = {
    input: { text },
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
  const stream = new Readable({ read() { } });
  stream.push(response.audioContent);

  return stream;
}
const textclient = new textToSpeech.TextToSpeechClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
  }
});

/**
 * @param {Client} client
 * @param {Message} message
 */

async function yomiage(client, message) {
  const guild = message.guild;
  const channel = message.member.voice.channel;
  if (!message.member.voice.selfMute || guild.id !== process.env.DISCORD_GUILD_ID || !channel || message.channel.id !== '706458716320432198' && message.channel.id !== '825674456470519809') {
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
  if (!text) { return; }
  if (channel.members.array().length < 1) { return; }
  const currentConnection = client.voice.connections.get(process.env.DISCORD_GUILD_ID);
  const shouldMove = !currentConnection || currentConnection.channel.id !== channel.id;
  const conn = shouldMove ? await channel.join() : currentConnection;
  conn.play(await textToSpeechReadableStream(text), { highWaterMark: 6, bitrate: 'auto' })
}