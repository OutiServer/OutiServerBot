const { Client, Guild, User } = require('discord.js');

/**
 * @param {Client} client
 * @param {Guild} guild
 * @param {User} user
 */

module.exports = async (client, guild, user) => {
    const replys = ['がBANされましたwwwwwwwwwwwww', 'はシベリア旅行に行った', 'は BABANBABANBANBA BABANBABANBANBAN された'];
    let random = Math.ceil( Math.random() * replys.length);
    client.channels.cache.get('706459931351711775').send(user.tag+replys[random]);
}