const { Client } = require('discord.js');
const { clienterrorlog } = require('../../functions/error');
const { Database } = require('../../home/index');

/**
 * @param {Client} client
 */

module.exports = (client) => {
    try {
        const db = new Database('unkoserver.db');
        db.backup(client);
    } catch (error) {
        clienterrorlog(client, error);
    }
};