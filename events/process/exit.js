const { Client } = require('discord.js');
const { clienterrorlog } = require('../../functions/logs/error');

/**
 * @param {Client} client
 */

module.exports = (client, code) => {
    try {
        client.db.close();
        client.destroy();
    } catch (error) {
        clienterrorlog(error);
    }
};