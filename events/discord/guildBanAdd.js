const { Client, Guild, User } = require('discord.js');

/**
 * @param {Client} client
 * @param {Guild} guild
 * @param {User} user
 */

module.exports = async (client, guild, user) => {
    if (guild.id !== '706452606918066237') return;

    const replys = ['がBANされましたwwwwwwwwwwwww', 'はシベリア旅行に行った', 'は BABANBABANBANBA BABANBABANBANBAN された', 'は下水処理場へ流れていった。', 'は豚箱に送られた', 'は粛清された', 'は北に拉致された', 'は自粛した'];
    const random = Math.floor(Math.random() * replys.length);

    client.channels.cache.get('706459931351711775').send(user.tag + replys[random]);
    client.channels.cache.get('706452607538954263').send(`${user.tag} has been banned <:emoji_106:790546684710223882>`);
};