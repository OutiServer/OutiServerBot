const { Client } = require('discord.js');
const { Database } = require('../../home/index');

/**
 * @param {Client} client
 */

module.exports = (client) => {
    const db = new Database('unkoserver.db');
    db.backup(client);
};