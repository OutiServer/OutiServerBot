const { codeBlock } = require('@discordjs/builders');
const { CommandInteraction, WebhookClient, MessageEmbed } = require('discord.js');
const { clienterrorlog } = require('./error');

/**
 * コマンドログ関数
 * @param {CommandInteraction} interaction
 * @param {string} commandname
 */

module.exports = async (interaction, commandname) => {
    try {
        const webhook = new WebhookClient({ url: 'https://discord.com/api/webhooks/873903295331205170/kiuj7x2uJUWkPeovgX1LrDYDXegmG5SA28gJHN6Joc9dMRgz4CIPNGHMeLA3dJKbBrZR' });
        const embed = new MessageEmbed()
            .addField('コマンド実行者', interaction.user.tag)
            .addField('コマンド実行者ID', interaction.user.id)
            .addField('コマンド実行ギルド', interaction.guild.name)
            .addField('コマンド実行ギルドID', interaction.guild.id)
            .addField('コマンド実行チャンネル', interaction.channel.name)
            .addField('コマンド実行チャンネルID', interaction.channel.id)
            .addField('コマンド', codeBlock(commandname))
            .setImage(interaction.user.avatarURL({ format: 'webp' }))
            .setColor('RANDOM')
            .setFooter(`messageid: ${interaction.id}`, interaction.user.avatarURL({ format: 'webp' }))
            .setTimestamp();

        await webhook.send({
            embeds: [
                embed
            ]
        });
    } catch (error) {
        clienterrorlog(error);
    }
}