const { EmbedBuilder, MessageType } = require('discord.js');
const { default: axios } = require('axios');
const url = require('url');

/**
 * @param {import('../../Bot')} client
 * @param {import('discord.js').Message} message
 */

module.exports = async (client, message) => {
  if (message.channelId === '786343076389847040' && message.author.id !== client.user.id) {
    const translationText = await axios.get(`https://script.google.com/macros/s/AKfycbweJFfBqKUs5gGNnkV2xwTZtZPptI6ebEhcCU2_JvOmHwM2TCk/exec?text=${encodeURIComponent(message.content)}&source=en&target=ja`);
    await message.reply(translationText.data);
  }
  else if (message.type === MessageType.UserJoin && message.guildId === '706452606918066237') {
    client.channels.cache.get('706459931351711775').send(`${message.author}さん、ようこそおうち鯖へ！\nまずは<#872501771254263829>を読みましょう。`);
  }

  if (!message.guild || message.system || message.author.bot) return;

  if (message.channel.id === '706469264638345227') {
    await message.react('👍');
    await message.react('👎');
  }
  else if (message.channel.id === '950611526274941018') {
    await message.react('👍');
    await message.react('👎');
  }
  else if (message.channel.id === '964715827842670612') {
    await message.react('👍');
    await message.react('👎');
  }
  else if (message.channel.id === '870145872762126437') {
    const thread = await message.channel.threads.create({
      name: message.content,
    });
    const msg = await thread.send({
      content: `${message.author}`,
      embeds: [
        new EmbedBuilder()
          .setTitle('スレッドを作成しました！')
          .setDescription(message.content)

          .setTimestamp(),
      ],
    });
    await msg.pin();
  }
  else if (message.channel.id === '794203640054153237') {
    if (message.attachments.size > 0 || message.content.match(new RegExp('https://')) || message.content.match(new RegExp('http://'))) {
      if (Math.random() < 0.1) {
        const reactions = ['847969092271079425', '917044998065750097', '861635410480463893', '880859874496491540', '917045021662912522'];
        const random = Math.floor(Math.random() * reactions.length);
        await message.react(reactions[random]);
      }
      else {
        await message.react('♥️');
      }
    }
  }
  else if (message.channel.id === '714404103224164423') {
    if (message.attachments.size > 0 || message.content.match(new RegExp('https://')) || message.content.match(new RegExp('http://'))) {
      await message.react('👮');
    }
  }
  else if (message.channelId === '1009760907028607056') {
    if (message.content.match(new RegExp('https://twitter.com'))) {
      const tweetId = url.parse(message.content).pathname.split('/')[3];
      client.twitter.get('statuses/show', { id: tweetId, include_entities: true }, function (err, data) {
        if (!err) {
          for (const d in data.extended_entities) {
            if (data.extended_entities[d][0].type === 'video') {
              message.reply(data.extended_entities[d][0].video_info.variants[0].url).catch();
            }
          }
        }
      });
    }
  }

  const EMOJI_PATTERN = /((?<!\\)<:[^:]+:(\d+)>)/gmu;
  const emojis = message.content.match(EMOJI_PATTERN);
  if (emojis) {
    for (const emoji of emojis) {
      const emojiId = emoji.substring(2, emoji.length).split(':')[1].split('>')[0];
      client.database.addEmojiUseCount(emojiId, 1);
    }
  }

  const URL_PATTERN = /http(?:s)?:\/\/(?:.*)?discord(?:app)?\.com\/channels\/(?:\d{17,19})\/(?<channelId>\d{17,19})\/(?<messageId>\d{17,19})/g;
  let result;
  while ((result = URL_PATTERN.exec(message.content)) !== null) {
    const group = result.groups;
    const channel = await client.channels.fetch(group.channelId);
    const msg = await channel.messages.fetch(group.messageId);
    message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`${msg.author.username}のメッセージを展開します`)
          .setDescription(msg.cleanContent)

          .setTimestamp(),
      ],
    });
  }

  let speaker = client.database.getSpeaker(message.author.id);
  if (!speaker) {
    client.database.setSpeaker(message.author.id, 2);
    speaker = client.database.getSpeaker(message.author.id);
  }

  if (client.speakers.get(message.guildId)) {
    if (client.speakers.get(message.guildId).speakerChannelIds.includes(message.channelId)) {
      if (message.content.length < 1 && message.attachments.size >= 1) client.speakers.get(message.guildId).addSpearkQueue(`ファイルが${message.attachments.size}個送信されました`, message.id, speaker.speaker_id);
      else client.speakers.get(message.guildId).addSpearkQueue(message.content, message.id, speaker.speaker_id);
    }
  }
};