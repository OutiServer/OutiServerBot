const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder, time } = require('@discordjs/builders');

module.exports = {
  info: {
    name: 'poll',
    description: '投票を作る',
    category: 'main',
    deferReply: true,
  },

  data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('投票を作る')
    .addStringOption(option => {
      return option
        .setName('title')
        .setDescription('投票タイトル')
        .setRequired(true);
    })
    .addIntegerOption(option => {
      return option
        .setName('seconds')
        .setDescription('投票時間 秒')
        .setRequired(true);
    })
    .addIntegerOption(option => {
      return option
        .setName('minutes')
        .setDescription('投票時間 分')
        .setRequired(true);
    })
    .addIntegerOption(option => {
      return option
        .setName('hours')
        .setDescription('投票時間 時')
        .setRequired(true);
    })
    .addIntegerOption(option => {
      return option
        .setName('days')
        .setDescription('投票時間 日')
        .setRequired(true);
    })
    .addStringOption(option => {
      return option
        .setName('select_1')
        .setDescription('選択項目1')
        .setRequired(true);
    })
    .addStringOption(option => {
      return option
        .setName('select_2')
        .setDescription('選択項目2')
        .setRequired(true);
    })
    .addStringOption(option => {
      return option
        .setName('select_3')
        .setDescription('選択項目3')
        .setRequired(false);
    })
    .addStringOption(option => {
      return option
        .setName('select_4')
        .setDescription('選択項目4')
        .setRequired(false);
    })
    .addStringOption(option => {
      return option
        .setName('select_5')
        .setDescription('選択項目5')
        .setRequired(false);
    })
    .addStringOption(option => {
      return option
        .setName('select_6')
        .setDescription('選択項目6')
        .setRequired(false);
    })
    .addStringOption(option => {
      return option
        .setName('select_7')
        .setDescription('選択項目7')
        .setRequired(false);
    })
    .addStringOption(option => {
      return option
        .setName('select_8')
        .setDescription('選択項目8')
        .setRequired(false);
    })
    .addStringOption(option => {
      return option
        .setName('select_9')
        .setDescription('選択項目9')
        .setRequired(false);
    })
    .addStringOption(option => {
      return option
        .setName('select_10')
        .setDescription('選択項目10')
        .setRequired(false);
    })
    .addStringOption(option => {
      return option
        .setName('select_11')
        .setDescription('選択項目11')
        .setRequired(false);
    })
    .addStringOption(option => {
      return option
        .setName('select_12')
        .setDescription('選択項目12')
        .setRequired(false);
    })
    .addStringOption(option => {
      return option
        .setName('select_13')
        .setDescription('選択項目13')
        .setRequired(false);
    })
    .addStringOption(option => {
      return option
        .setName('select_14')
        .setDescription('選択項目14')
        .setRequired(false);
    })
    .addStringOption(option => {
      return option
        .setName('select_15')
        .setDescription('選択項目15')
        .setRequired(false);
    })
    .addStringOption(option => {
      return option
        .setName('select_16')
        .setDescription('選択項目16')
        .setRequired(false);
    })
    .addStringOption(option => {
      return option
        .setName('select_17')
        .setDescription('選択項目17')
        .setRequired(false);
    })
    .addStringOption(option => {
      return option
        .setName('select_18')
        .setDescription('選択項目18')
        .setRequired(false);
    })
    .addStringOption(option => {
      return option
        .setName('select_19')
        .setDescription('選択項目19')
        .setRequired(false);
    })
    .addStringOption(option => {
      return option
        .setName('select_20')
        .setDescription('選択項目20')
        .setRequired(false);
    }),

  /**
     * @param {import('../../Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */
  run: async function (client, interaction) {
    if (interaction.options.getInteger('seconds') < 0 || interaction.options.getInteger('seconds') > 59) return await interaction.followUp('オプション `seconds` は0以上59以下で指定する必要があります。');
    else if (interaction.options.getInteger('minutes') < 0 || interaction.options.getInteger('minutes') > 59) return await interaction.followUp('オプション `minutes` は0以上59以下で指定する必要があります。');
    else if (interaction.options.getInteger('hours') < 0 || interaction.options.getInteger('hours') > 23) return await interaction.followUp('オプション `hours` は0以上23以下で指定する必要があります。');
    else if (interaction.options.getInteger('days') < 0 || interaction.options.getInteger('days') > 364) return await interaction.followUp('オプション `days` は0以上364以下で指定する必要があります。');

    const msg = await interaction.followUp('投票作成中');
    const selects = interaction.options.data.slice(5);
    const endTime = ((interaction.options.getInteger('days') * 86400000) + (interaction.options.getInteger('hours') * 3600000) + (interaction.options.getInteger('minutes') * 60000) + (interaction.options.getInteger('seconds') * 1000)) + Date.now();

    const emojis = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱', '🇲', '🇳', '🇴', '🇵', '🇶', '🇷', '🇸', '🇹'];
    emojis.slice(0, selects.length).forEach(async emoji => await msg.react(emoji));
    const pollId = client.database.addPoll(interaction.user.id, interaction.channelId, msg.id, ((interaction.options.getInteger('days') * 86400000) + (interaction.options.getInteger('hours') * 3600000) + (interaction.options.getInteger('minutes') * 60000) + (interaction.options.getInteger('seconds') * 1000)) > 0 ? endTime : null);

    interaction.editReply({
      content: `${interaction.user.tag}が作成した投票です`,
      embeds: [
        new EmbedBuilder()
          .setTitle(interaction.options.getString('title', true))
          .setDescription(`${((interaction.options.getInteger('days') * 86400000) + (interaction.options.getInteger('hours') * 3600000) + (interaction.options.getInteger('minutes') * 60000) + (interaction.options.getInteger('seconds') * 1000)) > 0 ? `投票終了まであと${time(Math.floor(endTime / 1000), 'R')}\n\n` : ''}${selects.map((select, index) => `${emojis[index]} ${select.value}`).join('\n')}`)
          .setFooter({ text: `/endpoll ${pollId} で集計します` })
          .setTimestamp(),
      ],
    });
  },
};