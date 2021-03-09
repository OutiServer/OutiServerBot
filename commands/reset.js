const { Client, Message } = require('discord.js');
const SQLite = require("better-sqlite3");
const sql = new SQLite('unkoserver.db');


module.exports = {
  info: {
    name: "reset",
    description: "指定したユーザーのうんコインをリセット",
    usage: "[ユーザーをメンションまたはid]",
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
    sql.prepare(`DELETE FROM moneys WHERE user = ${user.id} AND guild = ${message.guild.id}`).run();
    sql.prepare(`DELETE FROM debts WHERE user = ${user.id} AND guild = ${message.guild.id}`).run();
    sql.prepare(`DELETE FROM dailys WHERE user = ${user.id} AND guild = ${message.guild.id}`).run();
    sql.prepare(`DELETE FROM littlewar WHERE user = ${user.id} AND guild = ${message.guild.id}`).run();
    message.channel.send(`${user}の全データをリセットしました`);
  },
};