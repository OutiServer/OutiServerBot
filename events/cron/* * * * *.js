const { Collection } = require('discord.js');
const bot = require('../../bot');
const { clienterrorlog } = require('../../functions/logs/error');

/**
 * @param {bot} client
 */

module.exports = async (client) => {
    try {
        client.levelcooldown = new Collection();
    } catch (error) {
        clienterrorlog(error);
    }
};