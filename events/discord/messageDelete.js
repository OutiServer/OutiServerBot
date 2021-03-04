const { Client, Message, MessageEmbed } = require('discord.js');

/**
 * @param {Client} client
 * @param {Message} message
 */

module.exports = async (client, message) => {
    if (message.author.bot || message.channel.id === '816289042286641153' || message.channel.id === '816291494533136424' || message.author.id === '714455926970777602') return;
    client.channels.cache.get('816236462730248233').send(
        new MessageEmbed()
            .setDescription(`送信したユーザー: <@${message.author.id}>\n削除したメッセージ: ${message.content}`)
            .setColor('RANDOM')
            .setTimestamp()
    );
};