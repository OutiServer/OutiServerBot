const { Message, MessageEmbed } = require('discord.js');
const bot = require('../../Utils/Bot');
const { clienterrorlog } = require('../../functions/logs/error');

/**
 * @param {bot} client 
 * @param {Message} oldMessage
 * @param {Message} newMessage
 */

module.exports = async (client, oldMessage, newMessage) => {
    try {
        if (newMessage.author.id == "761562078095867916") {
            if (newMessage.embeds[0].url == "https://dissoku.net/" && newMessage.embeds[0].fields[0].name.endsWith('をアップしたよ!')) {
                await newMessage.channel.send({
                    embeds: [
                        new MessageEmbed()
                            .setDescription(`upを確認しました、一時間後にこのチャンネルで通知します`)
                            .setColor('RANDOM')
                            .setTimestamp()
                    ]
                });
                setTimeout(async () => {
                    await newMessage.channel.send(`Upしてから一時間経ちました\n\`/dissoku up\` を実行しましょう`);
                }, 3600000);
            }
            else if (newMessage.embeds[0].url == "https://dissoku.net/" && newMessage.embeds[0].fields[0].value.startsWith('間隔をあけてください')) {
                const waittime_up = newMessage.embeds[0].fields[0].value.split("間隔をあけてください")[1].split('(')[1].split(')')[0];
                await newMessage.channel.send(`Upに失敗したようです、${waittime_up}後にもう一度もう一度実行してください！`);
            }
        }
        if (oldMessage.partial) {
            oldMessage = await oldMessage.fetch();
        }
        if (newMessage.partial) {
            newMessage = await newMessage.fetch();
        }

        if (oldMessage.author.bot || oldMessage.system || oldMessage.guildId !== '706452606918066237') return;
        const embed = new MessageEmbed()
            .setTitle('メッセージが編集されました')
            .setURL(`https://discord.com/channels/${oldMessage.guildId}/${oldMessage.channelId}/${oldMessage.id}`)
            .addField('メッセージが編集されたチャンネル', `${oldMessage.channel.name} (<#${oldMessage.channelId}>)`)
            .addField('メッセージを送信したユーザー', `${oldMessage.author.tag} (<@${oldMessage.author.id}>) [${oldMessage.author.id}]`)
            .setThumbnail(oldMessage.author.avatarURL({ format: 'webp' }))
            .setColor('RANDOM')
            .setFooter(`messageid: ${oldMessage.id}`, oldMessage.author.avatarURL({ format: 'webp' }))
            .setTimestamp();

        // content が空の場合は画像
        if (!oldMessage.content) {
            embed
                .addField('編集される前の画像URL', newMessage.attachments.map(attachment => attachment.url).join('\n'))
                .setImage(oldMessage.attachments.first().url);
        }
        // 画像がからの場合
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

        await client.channels.cache.get('825394905572573184').send({ embeds: [embed] });
    } catch (error) {
        clienterrorlog(error);
    }
}