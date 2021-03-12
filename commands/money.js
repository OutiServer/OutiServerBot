const { Client, Message, MessageEmbed } = require('discord.js');
const { Database } = require('../unko/index');
const db = new Database('unkoserver.db');

module.exports = {
    info: {
        name: "money",
        description: "うんコイン",
        usage: "[ユーザーをメンションまたはid]",
        aliases: ["m"],
        botownercommand: false,
        botadmincommand: false,
        category: 'Money'
    },

    /**
     * @param {Message} message
     * @param {Client} client
     */

    run: async function (client, message, args) {
        const user = message.mentions.users.first() || client.users.cache.get(args[0]);
        if (!user || user.bot) {
            let usermoneydata = db.MoneyGet(message.author.id, message.guild.id);
            message.channel.send(
                new MessageEmbed()
                    .setDescription(`<@${message.author.id}>のうんコイン\n<:image0:798159753611575296>: ${usermoneydata.money}\nうんこチケット: ${usermoneydata.ticket}枚`)
                    .setColor('RANDOM')
                    .setTimestamp()
            );
        }
        else {
            let usermoneydata = db.MoneyGet(user.id, message.guild.id);
            message.channel.send(
                new MessageEmbed()
                    .setDescription(`<@${user.id}>のうんコイン\n<:image0:798159753611575296>: ${usermoneydata.money}\nうんこチケット: ${usermoneydata.ticket}枚`)
                    .setColor('RANDOM')
                    .setTimestamp()
            );
        }
    },
};