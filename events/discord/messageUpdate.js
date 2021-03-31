const { Client, Message, MessageEmbed } = require('discord.js');

/**
 * @param {Client} client 
 * @param {Message} oldMessage
 * @param {Message} newMessage
 */

module.exports = (client, oldMessage, newMessage) => {
    client.channels.cache.get('825394905572573184').send(
        new MessageEmbed()
            .setTitle('メッセージが編集されました')
            .addField('User', message.author.tag)
            .addField('oldMessage', oldMessage.content)
            .addField('newMessage', newMessage.content)
            .setColor('RANDOM')
            .setThumbnail()
    );
}