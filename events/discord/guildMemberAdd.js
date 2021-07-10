const { GuildMember, MessageEmbed } = require('discord.js');
const bot = require('../../bot');
const { clienterrorlog } = require('../../functions/logs/error');

/**
 * @param {bot} client
 * @param {GuildMember} member
 */

module.exports = async (client, member) => {
    try {
        if (member.user.bot || member.guild.id !== '706452606918066237') return;

        await client.channels.cache.get('797008715646500865').send(`${member}さん、よろしくお願いします。`);
        const invites = await member.guild.fetchInvites();
        const oldInvites = client.invites;
        client.invites = invites;
        const invite = invites.find(i => oldInvites.get(i.code).uses < i.uses);
        await client.channels.cache.get('834728413804888094').send(
            new MessageEmbed()
                .setTitle(`${member.user.tag}が使用した招待`)
                .addField('招待コード', invite.code)
                .addField('招待した人', invite.inviter.tag)
                .addField('使用回数', invite.uses)
                .setColor('RANDOM')
                .setTimestamp()
        );

    } catch (error) {
        clienterrorlog(error);
    }
};