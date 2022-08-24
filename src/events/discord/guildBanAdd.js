/**
 * @param {import('../../Bot')} client
 * @param {import('discord.js').GuildBan} ban
 */

module.exports = async (client, ban) => {
    if (ban.guild.id !== '706452606918066237') return;
    client.channels.cache.get('825231334657884161').send(`**Banned ${ban.user.tag}**`);
};