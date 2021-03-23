const { Message, Client, MessageEmbed } = require("discord.js");
const { Database } = require('../unko/index');
const db = new Database('unkoserver.db');

module.exports = {
    info: {
        name: "request",
        description: "rank画像リクエスト",
        usage: "",
        aliases: [""],
        owneronly: false,
        adminonly: false,
        category: 'Level'
    },

    /**
     * @param {Client} client 
     * @param {Message} message 
     */

    run: async function (client, message, args) {
        const userleveldata = db.levelget(message.author.id, message.guild.id);
        if (userleveldata.level < 10) {
            message.react('793460058250805259');
            return message.reply('画像背景申請はLevel10以上になってから使用できます！');
        }

        if (message.attachments.size <= 0) {
            message.react('816282137065947136');
            return message.reply('リクエストする画像を一緒に送信してください！');
        }
        message.attachments.forEach(attachment => {
            client.channels.cache.get('823573179309359135').send(
                new MessageEmbed()
                    .setDescription(`${message.author.tag}の画像リクエストです`)
                    .setImage(attachment.url)
                    .setColor('RANDOM')
                    .setTimestamp()
            );
            message.channel.send('level画像をリクエストしました');
        })
    }
}