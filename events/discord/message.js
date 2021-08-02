const { Message, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const bot = require('../../bot');
const { clienterrorlog } = require('../../functions/logs/error');
const level = require('../../functions/level');
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
        .then(content => message.channel.send(content))
        .catch(error => clienterrorlog(error));
    }
    if (message.author.id == "302050872383242240") {
      if (message.embeds[0].url == "https://disboard.org/" && (message.embeds[0].description.match(/表示順をアップしたよ/) || message.embeds[0].description.match(/Bump done/) || message.embeds[0].description.match(/Bump effectué/) || message.embeds[0].description.match(/Bump fatto/) || message.embeds[0].description.match(/Podbito serwer/) || message.embeds[0].description.match(/Успешно поднято/) || message.embeds[0].description.match(/갱신했어/) || message.embeds[0].description.match(/Patlatma tamamlandı/))) {
        const bump_user = message.embeds[0].description.split(',')[0];
        await message.channel.send(bump_user,
          new MessageEmbed()
            .setDescription(`Bumpを確認しました、二時間後にこのチャンネルで通知します`)
            .setColor('RANDOM')
            .setTimestamp()
        );
        setTimeout(async () => {
          await message.channel.send(`Bumpしてから二時間経ちました\n\`!d bump\` を実行しましょう`);
        }, 7200000);
      }
      else if (message.embeds[0].url == "https://disboard.org/" && (message.embeds[0].description.match(/このサーバーを上げられるようになるまで/) || message.embeds[0].description.match(/あなたがサーバーを上げられるようになるまで/))) {
        const waittime_bump = message.embeds[0].description.split("と")[1].split("分")[0];
        const bump_user = message.embeds[0].description.split(',')[0]
        await message.channel.send(`${bump_user}、Bumpに失敗したようです、${waittime_bump}分後にもう一度もう一度実行してください！`);
      }
    }
    if (message.type === 'USER_PREMIUM_GUILD_SUBSCRIPTION') {
      await client.channels.cache.get('825231334657884161').send(`${message.author} サーバーブーストありがとうございます！`);
    }
    else if (message.type === 'USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1') {
      await client.channels.cache.get('825231334657884161').send(`${message.author} サーバーブーストありがとうございます！`);
    }
    else if (message.type === 'USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2') {
      await client.channels.cache.get('825231334657884161').send(`${message.author} サーバーブーストありがとうございます！`);
    }
    else if (message.type === 'USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3') {
      await client.channels.cache.get('825231334657884161').send(`${message.author} サーバーブーストありがとうございます！`);
    }

    if (!message.guild || message.system || message.author.bot) return;

    if (message.guild.id === '706452606918066237') {
      level(client, message);
    }
    if (message.channel.id === '706469264638345227') {
      await message.react('👍');
      await message.react('👎');
    }
    if (message.channel.id === '828267048807039037') {
      const threadchannel = await message.guild.channels.create(message.content, { type: 'text', topic: `${message.author.tag}さんのスレッドです。\n${message.content}`, parent: '828266382277345310' });
      const threadmsg = await threadchannel.send(message.author,
        new MessageEmbed()
          .setTitle('スレッドを作成しました！')
          .setDescription(message.content)
          .setColor('RANDOM')
          .setTimestamp()
      );
      await threadmsg.pin();
      await message.delete();
    }
    if (message.channel.id === '794203640054153237') {
      if (message.attachments.size < 1) return;
      await message.react('♥️');
    }

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
    if (!cmd) return;
    else if (cmd.info.owneronly && message.author.id !== process.env.OWNERID || cmd.info.adminonly && !message.member.roles.cache.has('822852335322923060') && !message.member.roles.cache.has('771015602180587571') && !message.member.hasPermission('ADMINISTRATOR')) {
      return message.reply('そのコマンドを使用するための権限が足りてないで。😉');
    }
    else if (client.cooldown.get(message.author.id)) {
      return message.reply('前のコマンドがまだ実行中やで。😉');
    }
    client.cooldown.set(message.author.id, true);
    cmd.run(client, message, args);
    commandlog(message, cmd.info.name, args);
  } catch (error) {
    clienterrorlog(error);
  }
}