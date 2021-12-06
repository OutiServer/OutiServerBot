const { CommandInteraction, MessageEmbed } = require('discord.js');
const { SlashCommandBuilder, codeBlock, time } = require('@discordjs/builders');
const ms = require('ms');
const bot = require('../../utils/Bot');
const { errorlog } = require('../../functions/logs/error');

module.exports = {
  info: {
    name: 'poll',
    description: '投票を作る',
    usage: '[タイトル] [選択肢]',

    owneronly: false,
    adminonly: false,
    category: 'Main',
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
     * @param {bot} client
     * @param {CommandInteraction} interaction
     */

  run: async function (client, interaction) {
    try {
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
              .setFooter(`${process.env.PREFIX}endpoll ${pollid.seq} で集計します`)
              .setColor('RANDOM'),
          ],
        },
      );
    }
    catch (error) {
      errorlog(client, interaction, error);
    }
  },
};