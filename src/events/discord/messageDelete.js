const { MessageEmbed } = require('discord.js');
const { clienterrorlog } = require('../../functions/error');

/**
 * @param {import('../../utils/Bot')} client
 * @param {import('discord.js').Message} message
 */

module.exports = async (client, message) => {
    try {
        if (message.partial) return;
        if (message.guild.id !== '706452606918066237' || message.system || message.author.bot) return;
        const embed = new MessageEmbed()
            .setTitle('メッセージが削除されました')
            .addField('メッセージが削除されたチャンネル', `${message.channel.name} (<#${message.channelId}>)`)
            .addField('メッセージを送信したユーザー', `${message.author.tag} (<@${message.author.id}>) [${message.author.id}]`)
            .setThumbnail(message.author.avatarURL({ format: 'webp' }))
            .setColor('RANDOM')
            .setFooter(`messageid: ${message.id}`, message.author.avatarURL({ format: 'webp' }))
            .setTimestamp();

        if (!message.content) {
            embed
                .addField('削除された画像URL', message.attachments.map(attachment => attachment.url).join('\n'))
                .setImage(message.attachments.first().url);
        }
        else if (message.attachments.size < 1) {
            embed.addField('削除されたメッセージ', message.content);
        }
        else {
            embed
                .addField('削除されたメッセージ', message.content)
                .addField('削除された画像URL', message.attachments.map(attachment => attachment.url).join('\n'))
                .setImage(message.attachments.first().url);
        }

        await client.channels.cache.get('825394905572573184').send({ embeds: [embed] });
    }
    catch (error) {
        clienterrorlog(client, error);
    }
};