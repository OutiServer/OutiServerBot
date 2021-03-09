const { Client, Message } = require('discord.js');

module.exports = {
  info: {
    name: "remove",
    description: "指定したユーザーからうんコインを剥奪する",
    usage: "[ユーザーをメンションまたはid] [剥奪するうんコイン]",
    aliases: ["rm"],
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
      return message.reply("剥奪するうんコインを第二引数に入れてください");
    }
    let usermoneydata = client.getMoney.get(user.id, message.guild.id);
    if (!usermoneydata) {
      usermoneydata = { id: `${message.guild.id}-${user.id}`, user: user.id, guild: message.guild.id, money: 0, dailylogin: 0, ticket: 0 }
    }
    usermoneydata.money -= moneysToAdd;
    client.setMoney.run(usermoneydata);
    message.channel.send(`${user}から${moneysToAdd}うんコイン剥奪しました`);
  },
};