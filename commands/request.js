const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    info: {
        name: "request",
        description: "rank画像リクエスト",
        usage: "",
        aliases: [""],
        owneronly: false,
        adminonly: false,
        category: 'Main'
    },

    /**
     * @param {Client} client 
     * @param {Message} message 
     */

    run: async function (client, message, args) {
        if (message.attachments.size <= 0) return message.reply('リクエストする画像を一緒に送信してください！');
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