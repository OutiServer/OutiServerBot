const { GuildMember, MessageEmbed } = require('discord.js');
const bot = require('../../Utils/Bot');
const { clienterrorlog } = require('../../functions/logs/error');

/**
 * @param {bot} client
 * @param {GuildMember} member
 */

module.exports = async (client, member) => {
    try {
        if (member.user.bot || member.guild.id !== '706452606918066237') return;
        const invites = await member.guild.invites.fetch();
        client.invites = invites;
        const embed = new MessageEmbed()
            .setTitle(`${member.user.tag}がサーバーに参加しました`)
            .setColor('RANDOM')
            .setTimestamp();

        try {
            const invite = invites.find(i => client.invites.get(i.code).uses < i.uses);
            embed.addField('招待コード', invite.code)
                .addField('招待した人', invite.inviter.tag)
                .addField('使用回数', invite.uses.toString());
        }
        catch (error) {
            console.log(error);
            embed.addField('招待情報', '取得不可');
        }

        embed.addField('垢作ってから経った日数', Math.round((Date.now() - member.user.createdAt) / 86400000).toString());
        await client.channels.cache.get('834728413804888094').send({
            embeds: [
                embed
            ]
        });

    } catch (error) {
        clienterrorlog(error);
    }
};