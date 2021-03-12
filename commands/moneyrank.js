const { Client, Message, MessageEmbed } = require('discord.js');
const SQLite = require("better-sqlite3");
const sql = new SQLite('unkoserver.db');

module.exports = {
  info: {
    name: "moneyrank",
    description: "うんコイン所持金ランキング",
    usage: "",
    aliases: ["mr"],
    botownercommand: false,
    botadmincommand: false,
    category: 'Money'
  },

  /**
   * @param {Client} client
   * @param {Message} message
   */

  run: async function (client, message, args) {
    let rank = 1
    let embed = [];
    let embednumber = 0;
    let ranknumber1 = 1;
    let ranknumber2 = 10;
    while (embednumber < 10) {
      embed[embednumber] = new MessageEmbed()
        .setTitle(`うんこ鯖所持金ランキング${ranknumber1}〜${ranknumber2}位`)
        .setFooter(`コマンド実行者 ${message.author.tag}`, message.author.avatarURL())
        .setColor('RANDOM')
        .setTimestamp();
      embednumber++;
      ranknumber1 += 10;
      ranknumber2 += 10;
    }
    const top100 = sql.prepare("SELECT * FROM moneys WHERE guild = ? ORDER BY money DESC;").all(message.guild.id);
    for (const data of top100) {
      const user = message.guild.member(data.user);
      let usertag = ''
      if (!user) {
        usertag = '取得できないユーザー';
      }
      else {
        usertag = user.user.tag;
      }
      embednumber = Math.ceil(rank / 10) - 1;
      embed[embednumber].addFields({ name: `${rank}位: ${usertag}`, value: `${data.money}うんコイン` });
      rank++;
    }
    const msg = await message.channel.send('```' + `1/${embed.length}ページ目を表示中\nみたいページ番号を発言してください\n0を送信するか30秒経つと処理が止まります` + '```', embed[0]);
    while (true) {
      const filter = msg => msg.author.id === message.author.id;
      const collected = await message.channel.awaitMessages(filter, { max: 1, time: 30000 });
      const response = collected.first();
      if (!response) {
        msg.edit('');
        break;
      }
      if (response.content === '0') {
        msg.edit('');
        break;
      }
      else {
        const selectembed = Number(response.content);
        if (selectembed > 0 && selectembed < embed.length + 1)
          msg.edit('```' + `${selectembed}/${embed.length}ページ目を表示中\nみたいページ番号を発言してください\n0を送信するか30秒経つと処理が止まります` + '```', embed[selectembed - 1]);
      }
    }
  },
};