const { Client, Message } = require('discord.js');
const { Database } = require('../unko/index');
const db = new Database('unkoserver.db');

module.exports = {
  info: {
    name: "add",
    description: "指定したユーザーにうんコインを付与する",
    usage: "[ユーザーをメンションまたはid] [付与するうんコイン]",
    aliases: [""],
    botownercommand: false,
    botadmincommand: true
  },
  /**
   * @param {Message} message
   * @param {Client} client
   */
  run: async function (client, message, args) {
    const user = message.mentions.users.first() || client.users.cache.get(args[0]);
    if (!user || user.bot) {
      message.react('793460058250805259');
      return message.reply("あなたは誰かに言及するか、彼らのIDを与える必要があります！");
    }
    const moneysToAdd = Number(args[1]);
    if (!moneysToAdd || moneysToAdd < 1) {
      message.react('793460058250805259');
      return message.reply("付与するうんコインを第二引数に入れてください");
    }
    let giveusermoneydata = db.MoneyGet(user.id, message.guild.id);
    giveusermoneydata.money += moneysToAdd;
    db.MoneySet(giveusermoneydata);
    message.channel.send(`${user}に${moneysToAdd}うんコイン付与しました`);
  },
};