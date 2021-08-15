const { Message, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const bot = require('../../Utils/Bot');
const { clienterrorlog } = require('../../functions/logs/error');
const commandlog = require('../../functions/logs/command');

/**
 * @param {bot} client
 * @param {Message} message
 */

module.exports = async (client, message) => {
  try {
    if (message.author.id === '786343397807620106') {
      fetch(`https://script.google.com/macros/s/AKfycbweJFfBqKUs5gGNnkV2xwTZtZPptI6ebEhcCU2_JvOmHwM2TCk/exec?text=${encodeURIComponent(message.content)}&source=en&target=ja`)
        .then(res => res.text())
        .then(content => message.reply(content))
        .catch(error => clienterrorlog(error));
    }
    else if (message.author.id == "302050872383242240") {
      if (message.embeds[0].url == "https://disboard.org/" && (message.embeds[0].description.match(/表示順をアップしたよ/) || message.embeds[0].description.match(/Bump done/) || message.embeds[0].description.match(/Bump effectué/) || message.embeds[0].description.match(/Bump fatto/) || message.embeds[0].description.match(/Podbito serwer/) || message.embeds[0].description.match(/Успешно поднято/) || message.embeds[0].description.match(/갱신했어/) || message.embeds[0].description.match(/Patlatma tamamlandı/))) {
        message.channel.send(
          {
            embeds: [
              new MessageEmbed()
                .setDescription(`Bumpを確認しました、二時間後にこのチャンネルで通知します`)
                .setColor('RANDOM')
                .setTimestamp()
            ]
          }
        ).catch(error => clienterrorlog(error));
        setTimeout(async () => {
          await message.channel.send(`Bumpしてから二時間経ちました\n\`!d bump\` を実行しましょう`);
        }, 7200000);
      }
      else if (message.embeds[0].url == "https://disboard.org/" && (message.embeds[0].description.match(/このサーバーを上げられるようになるまで/) || message.embeds[0].description.match(/あなたがサーバーを上げられるようになるまで/))) {
        const waittime_bump = message.embeds[0].description.split("と")[1].split("分")[0];
        message.channel.send({
          content: `Bumpに失敗したようです、${waittime_bump}分後にもう一度もう一度実行してください！`,
        }).catch(error => clienterrorlog(error));
      }
    }
    if (message.type === 'USER_PREMIUM_GUILD_SUBSCRIPTION') {
      client.channels.cache.get('825231334657884161').send(`${message.author} サーバーブーストありがとうございます！`).catch(error => clienterrorlog(error));
    }
    else if (message.type === 'USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1') {
      client.channels.cache.get('825231334657884161').send(`${message.author} サーバーブーストありがとうございます！`).catch(error => clienterrorlog(error));
    }
    else if (message.type === 'USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2') {
      client.channels.cache.get('825231334657884161').send(`${message.author} サーバーブーストありがとうございます！`).catch(error => clienterrorlog(error));
    }
    else if (message.type === 'USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3') {
      client.channels.cache.get('825231334657884161').send(`${message.author} サーバーブーストありがとうございます！`).catch(error => clienterrorlog(error));
    }
    else if (message.type === 'GUILD_MEMBER_JOIN') {
      client.channels.cache.get('706459931351711775').send(`${message.author}さん、ようこそおうち鯖へ！\n<#872501771254263829>をよく読んで、<#873767707525410867>からサーバーに参加してください！`);
    }

    if (!message.guild || message.system || message.author.bot) return;

    if (message.guild.id === '706452606918066237') {
      if (!client.levelcooldown.get(message.author.id)) {
        const random = Math.random();
        let addxp = 0;
        let levelupmessage = '';
        let levelupflag = false;
        if (random < 0.01) { // 0.01％
          addxp = Math.ceil(Math.random() * 500) + 300;
          levelupmessage = `${message.author.tag} あなたのレベルが{level}に上がりました！<:owovvv:855097168947314698>`;
        }
        else if (random < 0.11) { // 0.1%
          addxp += Math.ceil(Math.random() * 100) + 50;
          levelupmessage = `${message.author.tag} あなたのレベルが{level}に上がっりました！<:owotukkomi:810436146823561256>`;
        }
        else if (random < 0.61) { //0.5%
          addxp += Math.ceil(Math.random() * 50) + 10;
          levelupmessage = `GG ${message.author.tag}, you just advanced to level {level}!<:unkosaba:852517397020934166>`;
        }
        else {
          addxp = Math.ceil(Math.random() * 20);
          levelupmessage = `${message.author.tag} あなたのレベルが{level}に上がったで。😉`;
        }

        let userleveldata = client.db.prepare('SELECT * FROM levels WHERE user = ?').get(message.author.id);
        if (!userleveldata) {
          userleveldata = { id: `${message.author.id}`, user: message.author.id, guild: null, level: 0, xp: 0, allxp: 0 };
          client.db.prepare('INSERT INTO levels (id, user, guild, level, xp, allxp) VALUES (@id, @user, @guild, @level, @xp, @allxp);').run(userleveldata);
        }

        userleveldata.xp += addxp;
        userleveldata.allxp += addxp;

        while (userleveldata.xp >= userleveldata.level * 55) {
          userleveldata.xp -= userleveldata.level * 55;
          userleveldata.level++;
          levelupflag = true;
        }

        client.db.prepare('UPDATE levels SET level = ?, xp = ?, allxp = ? WHERE user = ?').run(userleveldata.level, userleveldata.xp, userleveldata.allxp, userleveldata.user);

        if (levelupflag) {
          message.channel.send(levelupmessage.replace('{level}', userleveldata.level)).catch(error => clienterrorlog(error));
        }

        client.levelcooldown.set(message.author.id, true);
      }
    }
    if (message.channel.id === '706469264638345227') {
      message.react('👍').catch(error => clienterrorlog(error));
      message.react('👎').catch(error => clienterrorlog(error));
    }
    // スレッドを作るー
    else if (message.channel.id === '870145872762126437') {
      message.channel.threads.create(
        {
          name: message.content,
          autoArchiveDuration: 10080
        }
      )
        .then(thread => thread.send({
          content: `${message.author}`,
          embeds: [
            new MessageEmbed()
              .setTitle('スレッドを作成しました！')
              .setDescription(message.content)
              .setColor('RANDOM')
              .setTimestamp()
          ]
        }))
        .then(msg => msg.pin())
        .catch(error => clienterrorlog(error));
    }
    else if (message.channel.id === '794203640054153237') {
      if (message.attachments.size > 0) {
        message.react('♥️').catch(error => clienterrorlog(error));
      }
    }

    const URL_PATTERN = /http(?:s)?:\/\/(?:.*)?discord(?:app)?\.com\/channels\/(?:\d{17,19})\/(?<channelId>\d{17,19})\/(?<messageId>\d{17,19})/g;
    let result;
    while ((result = URL_PATTERN.exec(message.content)) !== null) {
      const group = result.groups;
      client.channels.fetch(group.channelId)
        .then(channel => channel.messages.fetch(group.messageId))
        .then(targetMessage => message.reply(
          {
            embeds: [
              new MessageEmbed()
                .setTitle(`${targetMessage.author.username} + 'のメッセージを展開します'`)
                .setDescription(targetMessage.cleanContent)
                .setColor('RANDOM')
                .setTimestamp()
            ],
            allowedMentions: {
              repliedUser: false
            }
          }
        ))
        .catch(error => message.reply(error))
        .catch(error => clienterrorlog(error));
    }

    if (!message.member.permissions.has('ADMINISTRATOR')) return;
    if (!message.content.startsWith(process.env.PREFIX)) return;
    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (!command) return;
    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.info.aliases && cmd.info.aliases.includes(command));
    if (!cmd) return;
    else if (cmd.info.owneronly && message.author.id !== process.env.OWNERID || cmd.info.adminonly && !message.member.roles.cache.has('822852335322923060') && !message.member.roles.cache.has('771015602180587571') && !message.member.hasPermission('ADMINISTRATOR')) {
      return await message.reply({
        content: 'そのコマンドを使用するための権限が足りてないで。😉',
        allowedMentions: {
          repliedUser: false
        }
      });
    }
    else if (client.cooldown.get(message.author.id)) {
      return await message.reply({
        content: '前のコマンドがまだ実行中やで。😉',
        allowedMentions: {
          repliedUser: false
        }
      });
    }
    client.cooldown.set(message.author.id, true);
    cmd.run(client, message, args);
    commandlog(message, cmd.info.name, args);
  } catch (error) {
    clienterrorlog(error);
  }
}