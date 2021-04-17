const { Client, MessageEmbed } = require('discord.js');

/**
 * @param {Client} client
 */

module.exports = (client, reason, promise) => {
    console.error(reason);
    try {
        client.channels.cache.get('832147363430006796').send(reason.stack, { code: true, split: true })
    } catch (error) { }
};