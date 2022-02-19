const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder, codeBlock, time } = require('@discordjs/builders');
const ms = require('ms');
const { errorlog, commanderror_message } = require('../../functions/error');

module.exports = {
  info: {
    name: 'poll',
    description: '投票を作る',
    usage: '[タイトル] [選択肢]',
    aliases: [],
    category: 'main',
  },

  data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('投票を作る')
    .addStringOption(option => {
      return option
        .setName('title')
        .setDescription('投票名')
        .setRequired(true);
    })
    .addStringOption(option => {
      return option
        .setName('time')
        .setDescription('投票時間')
        .setRequired(true);
    })
    .addStringOption(option => {
      return option
        .setName('polls')
        .setDescription('選択肢')
        .setRequired(true);
    }),

  /**
     * @param {import('../../utils/Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

  run: async function (client, interaction) {
    try {
      return await interaction.followUp('`poll`コマンドは現在スラッシュコマンドでは実行できません');

      // eslint-disable-next-line no-unreachable
      const title = interaction.options.getString('title', true);
      const _time = interaction.options.getString('time', true);
      const choices = interaction.options.getString('polls', true).split(/\s+/);

      const emojis = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱', '🇲', '🇳', '🇴', '🇵', '🇶', '🇷', '🇸', '🇹', '🇺', '🇻', '🇼', '🇽', '🇾', '🇿'];
      if (choices.length < 2 || choices.length > emojis.length) return await interaction.followUp(`選択肢は2から${emojis.length}つを指定してください`);

      const endtimeformat = RegExp(/(\d+(s|m|h|d|w))/).test(_time) ? RegExp(/(\d+(s|m|h|d|w))/).exec(_time)[1] : null;
      if (!endtimeformat) return await interaction.followUp(`不正な投票時間フォーマット形式です\n\n以下のフォーマット形式の中から1つだけ指定できます${codeBlock('1s - 1秒\n1m - 1分\n1h - 1時間\n1d - 1日\n1w - 一週間')}`);

      const endtime = (ms(endtimeformat) + Date.now());
      const poll = await interaction.followUp(
        {
          embeds: [
            new MessageEmbed()
              .setDescription('投票作成中')
              .setColor('RANDOM')
              .setTimestamp(),
          ],
        },
      );

      emojis.slice(0, choices.length).forEach(emoji => poll.react(emoji));
      client.db.prepare('INSERT INTO polls (guildid, userid, channelid, messageid, endtime) VALUES (?, ?, ?, ?, ?)').run(interaction.guildId, interaction.user.id, interaction.channelId, poll.id, endtime);
      const pollid = client.db.prepare('SELECT * FROM sqlite_sequence WHERE name = ?').get('polls');
      await interaction.editReply(
        {
          content: `${interaction.user.tag}が作成した投票です`,
          embeds: [
            new MessageEmbed()
              .setTitle(title)
              .setDescription(`${choices.map((c, i) => `${emojis[i]} ${c}`).join('\n')}\n\n投票終了まであと${time(Math.floor(endtime / 1000), 'R')}`)
              .setFooter(`/endpoll ${pollid.seq} で集計します`)
              .setColor('RANDOM'),
          ],
        },
      );
    }
    catch (error) {
      errorlog(client, interaction, error);
    }
  },

  /**
   *
   * @param {import('../../utils/Bot')} client
   * @param {import('discord.js').Message} message
   * @param {Array<string>} args
   */
  run_message: async function (client, message, args) {
    try {
      if (args.length < 3) return await message.reply('引数は最低3つ(投票タイトル・選択肢2つ以上)必要です');

      const emojis = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱', '🇲', '🇳', '🇴', '🇵', '🇶', '🇷', '🇸', '🇹', '🇺', '🇻', '🇼', '🇽', '🇾', '🇿'];

      /*
      const endtimeformat = RegExp(/(\d+(s|m|h|d|w))/).test(_time) ? RegExp(/(\d+(s|m|h|d|w))/).exec(_time)[1] : null;
      if (!endtimeformat) return await interaction.followUp(`不正な投票時間フォーマット形式です\n\n以下のフォーマット形式の中から1つだけ指定できます${codeBlock('1s - 1秒\n1m - 1分\n1h - 1時間\n1d - 1日\n1w - 一週間')}`);
      const endtime = (ms(endtimeformat) + Date.now());
      */

      const pollMsg = await message.reply(
        {
          embeds: [
            new MessageEmbed()
              .setDescription('投票作成中')
              .setColor('RANDOM')
              .setTimestamp(),
          ],
        },
      );

      const result = [];
      let temp = '';
      let quotation = false;
      for (const poll of args) {
        if (poll.startsWith('"')) {
          quotation = true;
          temp += poll.substring(1, poll.length);
          temp += ' ';
        }
        else if (poll.endsWith('"')) {
          quotation = false;
          result.push(temp + poll.substring(0, poll.length - 1));
          temp = '';
        }
        else if (quotation) {
          temp += poll;
          temp += ' ';
        }
        else {
          result.push(poll);
        }
      }

      emojis.slice(0, result.length - 1).forEach(emoji => pollMsg.react(emoji));
      client.db.prepare('INSERT INTO polls (guildid, userid, channelid, messageid, endtime) VALUES (?, ?, ?, ?, ?)').run(message.guildId, message.author.id, message.channelId, pollMsg.id, null);
      const pollid = client.db.prepare('SELECT * FROM sqlite_sequence WHERE name = ?').get('polls');
      await pollMsg.edit(
        {
          content: `${message.author.tag}が作成した投票です`,
          embeds: [
            new MessageEmbed()
              .setTitle(result.shift())
              .setDescription(`${result.map((c, i) => `${emojis[i]} ${c}`).join('\n')}`)
              .setFooter(`${process.env.PREFIX}endpoll ${pollid.seq} で集計します`)
              .setColor('RANDOM'),
          ],
        },
      );
    }
    catch (error) {
      commanderror_message(client, message, error);
    }
  },
};