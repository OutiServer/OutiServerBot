const { Client, Message, MessageEmbed } = require("discord.js");
const { clienterrorlog } = require("../../functions/error");

/**
 * @param {Client} client 
 * @param {Message} message 
 */

module.exports = (client, message) => {
    try {
        if (message.guild.id !== '706452606918066237' || message.author.bot) return;
        if (message.author.avatar)
            client.channels.cache.get('825394905572573184').send(
                new MessageEmbed()
                    .setTitle('メッセージが削除されました')
                    .setDescription(`User: ${message.author.tag}\nMessage: ${message.content}`)
                    .setThumbnail(message.author.avatarURL())
                    .setColor('RANDOM')
                    .setThumbnail()
            );
    } catch (error) {
        clienterrorlog(client, error);
    }
}