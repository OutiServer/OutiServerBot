const { EmbedBuilder, Collection } = require('discord.js');

/**
 * @param {import('../../Bot')} client
 * @param {import('discord.js').GuildMember} member
 */

module.exports = async (client, member) => {
    await member.guild.invites.fetch();
    const oldInvites = client.invites[member.guild.id];
    client.invites[member.guild.id] = new Collection();
    member.guild.invites.cache.forEach(invite => {
        client.invites[member.guild.id].set(invite.code, { code: invite.code, uses: invite.uses });
    });
    const invite = member.guild.invites.cache.find(i => oldInvites.get(i.code).uses < i.uses);
    client.channels.cache.get('834728413804888094').send({
        embeds: [
            new EmbedBuilder()
                .setTitle(`${member.user.tag}がサーバーに参加しました`)
                .addFields([
                    { name: '使用した招待コード', value: invite.code, inline: true },
                    { name: '招待した人', value: invite.inviter ? invite.inviter.tag : '不明', inline: true },
                ]),
        ],
    });
};