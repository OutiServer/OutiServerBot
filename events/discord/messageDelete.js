const { Client, Message, MessageEmbed } = require("discord.js");

/**
 * @param {Client} client 
 * @param {Message} message 
 */

module.exports = (client, message) => {
    client.channels.cache.get('825394905572573184').send(
        new MessageEmbed()
            .setTitle('メッセージが削除されました')
            .setDescription(`User: ${message.author.tag}\nMessage: ${message.content}`)
            .setColor('RANDOM')
            .setThumbnail()
    );
}