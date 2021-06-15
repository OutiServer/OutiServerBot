const { Client, Message, MessageEmbed } = require('discord.js');
const { clienterrorlog } = require('../../functions/logs/error');

/**
 * @param {Client} client 
 * @param {Message} oldMessage
 * @param {Message} newMessage
 */

module.exports = (client, oldMessage, newMessage) => {
    try {
        if (oldMessage.guild.id !== '706452606918066237' || oldMessage.author.bot) return;
        client.channels.cache.get('825394905572573184').send(
            new MessageEmbed()
                .setTitle('メッセージが編集されました')
                .setDescription(`User: ${oldMessage.author.tag}\noldMessage: ${oldMessage.content}\nnewMessage: ${newMessage.content}`)
                .setThumbnail(newMessage.author.avatarURL())
                .setColor('RANDOM')
                .setThumbnail()
        );
    } catch (error) {
        clienterrorlog(error);
    }
}