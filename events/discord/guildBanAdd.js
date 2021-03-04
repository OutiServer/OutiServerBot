const { Client, Guild, User } = require('discord.js');
const SQLite = require("better-sqlite3");
const sql = new SQLite('unkoserver.db');

/**
 * @param {Client} client
 * @param {Guild} guild
 * @param {User} user
 */

module.exports = async (client, guild, user) => {
    sql.prepare(`DELETE FROM moneys WHERE user = ${user.id} AND guild = ${guild.id}`).run();
    sql.prepare(`DELETE FROM debts WHERE user = ${user.id} AND guild = ${guild.id}`).run();
    sql.prepare(`DELETE FROM dailys WHERE user = ${user.id} AND guild = ${guild.id}`).run();
    sql.prepare(`DELETE FROM littlewar WHERE user = ${user.id} AND guild = ${guild.id}`).run();
    const replys = ['がBANされましたwwwwwwwwwwwww', 'はシベリア旅行に行った', 'は BABANBABANBANBA BABANBABANBANBAN された', 'は下水処理場へ流れていった。', 'は豚箱に送られた', 'は粛清された', 'は北に拉致された', 'は自粛した'];
    let random = Math.ceil(Math.random() * replys.length);
    client.channels.cache.get('706459931351711775').send(user.tag + replys[random]);
    client.channels.cache.get('706452607538954263').send(`${user.tag}がゲームから追放されました <:emoji_106:790546684710223882>`);
};