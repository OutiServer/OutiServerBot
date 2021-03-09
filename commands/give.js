const { Client, Message } = require('discord.js');

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
    if (!user || user.bot) {
      message.react('793460058250805259');
      return message.reply("あなたは誰かに言及するか、彼らのIDを与える必要があります！");
    }
    const moneysToAdd = Number(args[1]);
    if (!moneysToAdd || moneysToAdd < 1) {
      message.react('793460058250805259');
      return message.reply("付与するうんコインを第二引数に入れてください");
    }
    let usermoneydata = client.getMoney.get(message.author.id, message.guild.id);
    if (!usermoneydata) {
      usermoneydata = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, money: 0, dailylogin: 0, ticket: 0 }
    }
    if (usermoneydata.money < moneysToAdd) return message.reply('自分の所持金以上の金を付与することはできません＾＾；');
    let giveusermoneydata = client.getMoney.get(user.id, message.guild.id);
    if (!giveusermoneydata) {
      giveusermoneydata = { id: `${message.guild.id}-${user.id}`, user: user.id, guild: message.guild.id, money: 0, dailylogin: 0, ticket: 0 }
    }
    giveusermoneydata.money += moneysToAdd;
    usermoneydata.money -= moneysToAdd;
    client.setMoney.run(giveusermoneydata);
    client.setMoney.run(usermoneydata);
    message.channel.send(`${user}に${moneysToAdd}うんコイン、${message.author}から付与しました`);
  },
};