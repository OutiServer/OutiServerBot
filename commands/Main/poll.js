const { Message, MessageEmbed } = require("discord.js");
const bot = require('../../Utils/Bot');
const { errorlog } = require("../../functions/logs/error");

module.exports = {
  info: {
    name: "poll",
    description: "投票を作る",
    usage: "[タイトル] [選択肢]",
    aliases: [""],
    owneronly: false,
    adminonly: false,
    category: 'Main'
  },

  /**
   * @param {bot} client
   * @param {Message} message
   * @param {string[]} args
   */

  run: async function (client, message, args) {
    try {
      const [title, ...choices] = args;
      if (!title) return message.channel.send('タイトルを指定してください').catch(error => errorlog(message, error));

      const emojis = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱', '🇲', '🇳', '🇴', '🇵', '🇶', '🇷', '🇸', '🇹', '🇺', '🇻', '🇼', '🇽', '🇾', '🇿'];
      if (choices.length < 2 || choices.length > emojis.length) return message.channel.send(`選択肢は2から${emojis.length}つを指定してください`).catch(error => errorlog(message, error));

      const poll = await message.channel.send(
        {
          embeds: [
            new MessageEmbed()
              .setDescription('投票作成中')
              .setColor('RANDOM')
              .setTimestamp()
          ]
        }
      );
      emojis.slice(0, choices.length).forEach(emoji => poll.react(emoji));
      poll.edit(
        {
          content: `${message.author.tag}が作成した投票です`,
          embeds: [
            new MessageEmbed()
              .setTitle(title)
              .setDescription(choices.map((c, i) => `${emojis[i]} ${c}`).join('\n'))
              .setFooter(`${process.env.PREFIX}sumpoll ${poll.id} で集計します`)
              .setColor('RANDOM')
          ]
        }
      ).catch(error => errorlog(message, error));
    } catch (error) {
      errorlog(interaction, error);
    }
    finally {
      client.cooldown.delete(message.author.id);
    }
  },
};