const { Client, GuildMember } = require('discord.js');

/**
 * @param {Client} client
 * @param {GuildMember} member
 */


module.exports = async (client, member) => {
    if(member.user.bot === true || member.guild.id !== '706452606918066237') return;
    client.channels.cache.get('706459931351711775').send(`${member.user.tag} マサラタウンにさよならばいばい`);
};