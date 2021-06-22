const { Message, WebhookClient, MessageEmbed } = require('discord.js');
const { clienterrorlog } = require('./error');

/**
 * コマンドログ関数
 * @param {Message} message
 * @param {string} commandname
 * @param {string[]} args
 */

module.exports = async (message, commandname, args) => {
    try {
        const webhook = new WebhookClient('855242376141209610', 'teyKNpeOorWv_SGrA_uGzAbr1gU3xKZTKHO0_WmExUMHVSONygix14LAH-V-LlI1MiVx');
        const embed = new MessageEmbed()
            .addField('コマンド実行者', message.author.tag)
            .addField('コマンド実行者ID', message.author.id)
            .addField('コマンド実行ギルド', message.guild.name)
            .addField('コマンド実行ギルドID', message.guild.id)
            .addField('コマンド実行チャンネル', message.channel.name)
            .addField('コマンド実行チャンネルID', message.channel.id)
            .addField('コマンド', '```' + commandname + '```')
            .setImage(message.author.avatarURL({ format: 'webp' }))
            .setColor('RANDOM')
            .setFooter(`messageid: ${message.id}`, message.author.avatarURL({ format: 'webp' }))
            .setTimestamp();
        if (args.length > 0) {
            embed.addField('引数', args.join(' '));
        }
        await webhook.send(embed);
    } catch (error) {
        clienterrorlog(error);
    }
}