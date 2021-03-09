const { Client, Message } = require('discord.js');
const { Database } = require('../unko/index');
const db = new Database('unkoserver.db');

module.exports = {
  info: {
    name: "give",
    description: "指定したユーザーにうんコインを付与する",
    usage: "[ユーザーをメンションまたはid] [付与するうんコイン]",
    aliases: [""],
    botownercommand: false,
    botadmincommand: false
  },

  /**
   * @param {Message} message
   * @param {Client} client
   */

  run: async function (client, message, args) {
    const user = message.mentions.users.first() || client.users.cache.get(args[0]);
    if (!user || user.bot || user.id === message.author.id) {
      message.react('793460058250805259');
      return message.reply("あなたは誰かに言及するか、彼らのIDを与える必要があります！");
    }

    const moneysToAdd = Number(args[1]);
    if (!moneysToAdd || moneysToAdd < 1) {
      message.react('793460058250805259');
      return message.reply("付与するうんコインを第二引数に入れてください");
    }

    let usermoneydata = db.MoneyGet(message.author.id, message.guild.id);
    if (usermoneydata.money < moneysToAdd) return message.reply('自分の所持金以上の金を付与することはできません＾＾；');
    let giveusermoneydata = db.MoneyGet(user.id, message.guild.id);
    usermoneydata.money -= moneysToAdd;
    giveusermoneydata.money += moneysToAdd;
    db.MoneySet(usermoneydata);
    db.MoneyGet(giveusermoneydata);
    message.channel.send(`${user}に${moneysToAdd}うんコイン、${message.author}から付与しました`);
  },
};