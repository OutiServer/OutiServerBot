const { Client, Message, MessageEmbed } = require('discord.js');

/**
 * @param {Client} client 
 * @param {Message} oldMessage
 * @param {Message} newMessage
 */

module.exports = (client, oldMessage, newMessage) => {
    if (oldMessage.guild.id !== '706452606918066237' || oldMessage.author.bot) return;
    client.channels.cache.get('825394905572573184').send(
        new MessageEmbed()
            .setTitle('メッセージが編集されました')
            .setDescription(`User: ${oldMessage.author.tag}\noldMessage: ${oldMessage.content}\nnewMessage: ${newMessage.content}`)
            .setColor('RANDOM')
            .setThumbnail()
    );
}