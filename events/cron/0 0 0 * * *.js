const { Client } = require('discord.js');
const SQLite = require("better-sqlite3");
const sql = new SQLite('unkoserver.db');
const { Database } = require('../../home/index');
const db = new Database('unkoserver.db');

/**
 * @param {Client} client
 */

module.exports = (client) => {
    db.backup(client);
};