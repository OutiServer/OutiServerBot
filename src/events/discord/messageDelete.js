const { EmbedBuilder } = require('discord.js');

/**
 * @param {import('../../Bot')} client
 * @param {import('discord.js').Message} message
 */

module.exports = async (client, message) => {
    if (message.partial) return;
    if (message.guild.id !== '706452606918066237' || message.system || message.author.bot) return;
    const embed = new EmbedBuilder()
        .setTitle('メッセージが削除されました')
        .addFields([
            { name: 'メッセージが削除されたチャンネル', value: `${message.channel.name} (<#${message.channelId}>)` },
            { name: 'メッセージを送信したユーザー', value: `${message.author.tag} (<@${message.author.id}>) [${message.author.id}]` },
        ])
        .setThumbnail(message.author.avatarURL({ format: 'webp' }))
        .setFooter({ text: `messageId: ${message.id}`, iconURL: message.author.avatarURL({ format: 'webp' }) })
        .setTimestamp();

    if (message.attachments.size < 1) {
        embed.addFields({ name: '削除されたメッセージ', value: message.content });
    }
    else if (message.content) {
        embed.addFields({ name: '削除されたメッセージ', value: message.content });
    }

    await client.channels.cache.get('825394905572573184').send({ embeds: [embed] });
};