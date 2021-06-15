const { Client, GuildMember } = require('discord.js');
const { clienterrorlog } = require('../../functions/logs/error');

/**
 * @param {Client} client
 * @param {GuildMember} member
 */


module.exports = async (client, member) => {
    try {
        if (member.user.bot || member.guild.id !== '706452606918066237') return;
        client.channels.cache.get('706459931351711775').send(`${member.user.tag} マサラタウンにさよならばいばい`);
    } catch (error) {
        clienterrorlog(error);
    }
};