const { Guild, User } = require('discord.js');
const bot = require('../../bot');
const { clienterrorlog } = require('../../functions/logs/error');

/**
 * @param {bot} client
 * @param {Guild} guild
 * @param {User} user
 */

module.exports = async (client, guild, user) => {
    try {
        if (user.bot || guild.id !== '706452606918066237') return;

        const replys = ['がBANされましたwwwwwwwwwwwww', 'はシベリア旅行に行った', 'は BABANBABANBANBA BABANBABANBANBAN された', 'は下水処理場へ流れていった。', 'は豚箱に送られた', 'は粛清された', 'は北に拉致された', 'は自粛した'];
        const random = Math.floor(Math.random() * replys.length);

        await client.channels.cache.get('706459931351711775').send(user.tag + replys[random]);
        await client.channels.cache.get('825231334657884161').send(`${user.tag}は反逆者だ！ <:kokohaunkosabadazo:844941571044278282>`);
    } catch (error) {
        clienterrorlog(error);
    }
};