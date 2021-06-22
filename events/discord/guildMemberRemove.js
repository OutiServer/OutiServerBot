const { GuildMember } = require('discord.js');
const bot = require('../../bot');
const { clienterrorlog } = require('../../functions/logs/error');

/**
 * @param {bot} client
 * @param {GuildMember} member
 */


module.exports = async (client, member) => {
    try {
        if (member.user.bot || member.guild.id !== '706452606918066237') return;
        await client.channels.cache.get('706459931351711775').send(`${member.user.tag} マサラタウンにさよならばいばい`);
    } catch (error) {
        clienterrorlog(error);
    }
};