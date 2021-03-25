const { Client, GuildMember } = require('discord.js');
const SQLite = require("better-sqlite3");
const sql = new SQLite('unkoserver.db');

/**
 * @param {Client} client
 * @param {GuildMember} member
 */


module.exports = async (client, member) => {
    if (member.user.bot === true || member.guild.id !== '706452606918066237') return;
    sql.prepare('DELETE FROM  levels WHERE user = ? AND guild = ?;').run(member.id, member.guild.id);
    client.channels.cache.get('706459931351711775').send(`${member.user.tag} マサラタウンにさよならばいばい`);
};