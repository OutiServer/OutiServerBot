const { GuildBan } = require('discord.js');
const bot = require('../../Utils/Bot');
const { clienterrorlog } = require('../../functions/logs/error');

/**
 * @param {bot} client
 * @param {GuildBan} ban
 */

module.exports = async (client, ban) => {
    try {
        if (ban.user.bot || ban.guild.id !== '706452606918066237') return;
        const replys = ['がBANされましたwwwwwwwwwwwww', 'はシベリア旅行に行った', 'は BABANBABANBANBA BABANBABANBANBAN された', 'は下水処理場へ流れていった。', 'は豚箱に送られた', 'は粛清された', 'は北に拉致された', 'は自粛した', 'がサーバーから退出しました。\nまたのお越しを心よりお待ちしておりません。'];
        const random = Math.floor(Math.random() * replys.length);
        await client.channels.cache.get('706459931351711775').send(ban.user.tag + replys[random]);
        await client.channels.cache.get('825231334657884161').send(`Banned **${ban.user.tag}**`);
    } catch (error) {
        clienterrorlog(client, error);
    }
};