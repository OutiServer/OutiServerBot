const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    info: {
        name: "money",
        description: "うんコイン",
        usage: "[ユーザーをメンションまたはid]",
        aliases: ["m"],
        botownercommand: false,
        botadmincommand: false
    },
/**
 * @param {Message} message
 * @param {Client} client
 */
    run: async function(client, message, args) {
       const user = message.mentions.users.first() || client.users.cache.get(args[0]);
       if(!user){
        let usermoneydata = client.getMoney.get(message.author.id, message.guild.id);
        if (!usermoneydata) {
           usermoneydata　= { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, money: 0, dailylogin: 0 }
        }
        message.channel.send(
            new MessageEmbed()
            .setDescription(`<@${message.author.id}>のうんコイン\n<:image0:798159753611575296>: ${usermoneydata.money}`)
        );
        client.setMoney.run(usermoneydata);
       }
       else{
        let usermoneydata = client.getMoney.get(user.id, message.guild.id);
        if (!usermoneydata) {
           usermoneydata　= { id: `${message.guild.id}-${user.id}`, user: user.id, guild: message.guild.id, money: 0, dailylogin: 0 }
        }
        message.channel.send(
            new MessageEmbed()
            .setDescription(`<@${user.id}>のうんコイン\n<:image0:798159753611575296>: ${usermoneydata.money}`)
        );
        client.setMoney.run(usermoneydata);
       }
    },
};