const { Client, Guild, User } = require('discord.js');
const { clienterrorlog } = require('../../functions/logs/error');

/**
 * @param {Client} client
 * @param {Guild} guild
 * @param {User} user
 */

module.exports = async (client, guild, user) => {
    try {
        if (user.bot || guild.id !== '706452606918066237') return;

        const replys = ['がBANされましたwwwwwwwwwwwww', 'はシベリア旅行に行った', 'は BABANBABANBANBA BABANBABANBANBAN された', 'は下水処理場へ流れていった。', 'は豚箱に送られた', 'は粛清された', 'は北に拉致された', 'は自粛した'];
        const random = Math.floor(Math.random() * replys.length);

        client.channels.cache.get('706459931351711775').send(user.tag + replys[random]);
        client.channels.cache.get('825231334657884161').send(`${user.tag}は反逆者だ！ <:outi_7:848488215043112980>`);
    } catch (error) {
        clienterrorlog(error);
    }
};