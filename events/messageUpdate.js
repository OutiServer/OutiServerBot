const { Client, Message, MessageEmbed } = require('discord.js');

/**
 * @param {Client} client
 * @param {Message} oldMessage
 * @param {Message} newMessage
 */

module.exports = async (client, oldMessage, newMessage) => {
    if (oldMessage.author.bot || oldMessage.author.id === '714455926970777602') return;
    client.channels.cache.get('816236462730248233').send(
        new MessageEmbed()
            .setDescription(`送信したユーザー: <@${oldMessage.author.id}>\n編集前のメッセージ: ${oldMessage.content}\n編集後のメッセージ: ${newMessage.content}`)
            .setColor('RANDOM')
            .setTimestamp()
    );
}