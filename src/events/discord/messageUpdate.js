const { EmbedBuilder } = require('discord.js');

/**
 * @param {import('../../Bot')} client
 * @param {import('discord.js').Message} oldMessage
 * @param {import('discord.js').Message} newMessage
 */

module.exports = async (client, oldMessage, newMessage) => {
    if (oldMessage.partial) {
        oldMessage = await oldMessage.fetch();
    }
    if (newMessage.partial) {
        newMessage = await newMessage.fetch();
    }

    if (oldMessage.author.bot || oldMessage.system || oldMessage.guildId !== '706452606918066237') return;
    const embed = new EmbedBuilder()
        .setTitle('メッセージが編集されました')
        .setURL(`https://discord.com/channels/${oldMessage.guildId}/${oldMessage.channelId}/${oldMessage.id}`)
        .addFields([
            { name: 'メッセージが編集されたチャンネル', value: `${oldMessage.channel.name} (<#${oldMessage.channelId}>)` },
            { name: 'メッセージを送信したユーザー', value: `${oldMessage.author.tag} (<@${oldMessage.author.id}>) [${oldMessage.author.id}]` },
        ])
        .setThumbnail(oldMessage.author.avatarURL({ format: 'webp' }))
        .setFooter({ text: `messageId: ${oldMessage.id}`, iconURL: oldMessage.author.avatarURL({ format: 'webp' }) })
        .setTimestamp();

    // content が空の場合は画像
    if (!oldMessage.content) {
        embed
            .addFields([
                { name: '編集される前の画像URL', value: newMessage.attachments.map(attachment => attachment.url).join('\n') },
            ])
            .setImage(oldMessage.attachments.first().url);
    }
    // 画像がからの場合
    else if (oldMessage.attachments.size < 1) {
        embed.addFields([
            { name: '編集される前のメッセージ', value: oldMessage.content },
        ]);
    }
    else {
        embed
            .addFields([
                { name: '編集される前のメッセージ', value: oldMessage.content },
                { name: '編集される前の画像URL', value: oldMessage.attachments.map(attachment => attachment.url).join('\n') },
            ]);
    }

    if (!newMessage.content) {
        embed.addFields([
            { name: '編集された後の画像URL', value: newMessage.attachments.map(attachment => attachment.url).join('\n') },
        ]);
    }
    else if (newMessage.attachments.size < 1) {
        embed.addFields([
            { name: '編集された後のメッセージ', value: newMessage.content },
        ]);
    }
    else {
        embed.addFields([
            { name: '編集された後のメッセージ', value: newMessage.content },
            { name: '編集された後の画像URL', value: newMessage.attachments.map(attachment => attachment.url).join('\n') },
        ]);
    }

    await client.channels.cache.get('825394905572573184').send({ embeds: [embed] });
};