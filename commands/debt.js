const { Client, Message, MessageEmbed, WebhookClient } = require('discord.js');
const { Menu } = require('discord.js-menu');

module.exports = {
    info: {
        name: "debt",
        description: "借金取り",
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
        if(!user || user.bot){
          return message.reply("あなたは誰かに言及するか、彼らのIDを与える必要があります！");
        } 
        let usermoneydata = client.getMoney.get(user.id, message.guild.id);
        if (!usermoneydata) {
           usermoneydata　= { id: `${message.guild.id}-${user.id}`, user: user.id, guild: message.guild.id, money: 0, dailylogin: 0, ticket: 0 }
        }
        client.setMoney.run(usermoneydata);
        if(usermoneydata.money > -1) return message.reply('そのユーザーは借金をしていない！');
        let userdebtdata = client.getDebt.get(user.id, message.guild.id);
        if (!userdebtdata) {
          userdebtdata　= { id: `${message.guild.id}-${user.id}`, user: user.id, guild: message.guild.id, Tuna: 0, Shoulder: null }
        }
        if(userdebtdata.Tuna === 1) return message.reply('彼は既に借金返済モードです！');
        let debtMenu = new Menu(message.channel, message.author.id, [
            {
                name: 'main',
                content: new MessageEmbed()
                .setDescription(`${user}を借金返済モードにしますか？`)
                .setColor('RANDOM')
                .setTimestamp(),
                reactions: {
                    '793460057932038145': 'yes',
                    '793460058250805259': 'delete'
                }
            },
            {
                name: 'yes',
                content: new MessageEmbed()
                .setDescription(`${user}を借金返済モードにしました。`)
                .setColor('RANDOM')
                .setTimestamp(),
                reactions: {
                    '⏹': 'delete'
                }
            }
        ], 60000)
        debtMenu.start()
        debtMenu.on('pageChange', async destination => {
          if (destination.name === "yes") {
            message.member.roles.add('798570033235755029');
            userdebtdata.Tuna = 1;
            const webhook = new WebhookClient('798186603235246111', 'Rf6vyUbm7GuwLOmmHseu-QZp7bV7QOYykwEoqzrSLX3Rjkza_7ipOsbJQGe9BKoGNiHn');
            webhook.send(`${user}、開けろごらああ！てめえ自分が何シてんのかわかってるのか！！？\n${usermoneydata.money * -1}円、しっかり払ってもらうで`)
          }
          client.setDebt.run(userdebtdata);
        })
    },
};