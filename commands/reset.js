const { Client, Message } = require('discord.js');

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
    run: async function(client, message, args) {
          const user = message.mentions.users.first() || client.users.cache.get(args[0]);
          if(!user || user.bot) {
          return message.reply("あなたは誰かに言及するか、彼らのIDを与える必要があります！");  
        }
        let usermoneydata = client.getMoney.get(user.id, message.guild.id);
          if (!usermoneydata) {
            usermoneydata　= { id: `${message.guild.id}-${user.id}`, user: user.id, guild: message.guild.id, money: 0, dailylogin: 0 }
          }
          usermoneydata.money = 0;
          client.setMoney.run(usermoneydata);
          message.channel.send(`${user}のデータをリセットしました`);
    },
};