/**
 * @param {import('../../Bot')} client
 * @param {import('discord.js').GuildBan} ban
 */

module.exports = async (client, ban) => {
    client.channels.cache.get('825231334657884161').send(`**Banned ${ban.user.tag}**\nReason: ${ban.reason ?? 'なし'}`);
};