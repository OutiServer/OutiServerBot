const { Client, GuildMember } = require('discord.js');
const { clienterrorlog } = require('../../functions/error');
const { Database } = require('../../home/index');

/**
 * @param {Client} client
 * @param {GuildMember} member
 */


module.exports = async (client, member) => {
    try {
        const db = new Database('unkoserver.db');
        if (member.user.bot || member.guild.id !== '706452606918066237') return;

        db.sql.prepare('DELETE FROM levels WHERE user = ? AND guild = ?').run(member.id, member.guild.id);

        client.channels.cache.get('706459931351711775').send(`${member.user.tag} マサラタウンにさよならばいばい`);
    } catch (error) {
        clienterrorlog(client, error);
    }
};