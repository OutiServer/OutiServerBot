const { Client, Message } = require('discord.js');

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
    run: async function(client, message, args) {
            const user = message.mentions.users.first() || client.users.cache.get(args[0]);
            if(!user || user.bot){
              return message.reply("あなたは誰かに言及するか、彼らのIDを与える必要があります！");
            } 
            const moneysToAdd = Number(args[1]);
            if(!moneysToAdd || moneysToAdd < 1) {
             return message.reply("付与するうんコインを第二引数に入れてください");
            }
            let giveusermoneydata = client.getMoney.get(user.id, message.guild.id);
            if (!giveusermoneydata) {
              giveusermoneydata　= { id: `${message.guild.id}-${user.id}`, user: user.id, guild: message.guild.id, money: 0, dailylogin: 0 }
            }
            giveusermoneydata.money += moneysToAdd;
            client.setMoney.run(giveusermoneydata);
            message.channel.send(`${user}に${moneysToAdd}うんコイン付与しました`); 
    },
};