const { Message, MessageEmbed } = require('discord.js');
const bot = require('../../bot');
const { clienterrorlog } = require('../../functions/logs/error');

/**
 * @param {bot} client 
 * @param {Message} oldMessage
 * @param {Message} newMessage
 */

module.exports = async (client, oldMessage, newMessage) => {
    try {
        if (oldMessage.guild.id !== '706452606918066237' || oldMessage.author.bot) return;
        const embed = new MessageEmbed()
            .setTitle('メッセージが編集されました')
            .addField('メッセージが編集されたチャンネル', oldMessage.channel.name)
            .addField('メッセージを送信したユーザー', oldMessage.author.tag)
            .setThumbnail(oldMessage.author.avatarURL({ format: 'webp' }))
            .setColor('RANDOM')
            .setFooter(`messageid: ${oldMessage.id}`, oldMessage.author.avatarURL({ format: 'webp' }))
            .setTimestamp();

        if (!oldMessage.content) {
            embed
                .addField('編集される前の画像URL', newMessage.attachments.map(attachment => attachment.url).join('\n'))
                .setImage(oldMessage.attachments.first().url)
        }
        else if (oldMessage.attachments.size < 1) {
            embed.addField('編集される前のメッセージ', oldMessage.content);
        }
        else {
            embed
                .addField('編集される前のメッセージ', oldMessage.content)
                .addField('編集される前の画像URL', oldMessage.attachments.map(attachment => attachment.url).join('\n'))
                .setImage(oldMessage.attachments.first().url)
        }
        if (!newMessage.content) {
            embed
                .addField('編集された後の画像URL', newMessage.attachments.map(attachment => attachment.url).join('\n'))
        }
        else if (newMessage.attachments.size < 1) {
            embed.addField('編集された後のメッセージ', newMessage.content);
        }
        else {
            embed
                .addField('編集された後のメッセージ', newMessage.content)
                .addField('編集された後の画像URL', newMessage.attachments.map(attachment => attachment.url).join('\n'))
        }

        await client.channels.cache.get('825394905572573184').send(embed);
    } catch (error) {
        clienterrorlog(error);
    }
}