const { Client } = require('discord.js');
const SQLite = require("better-sqlite3");
const sql = new SQLite('unkoserver.db');
const { Database } = require('../../unko/index');
const db = new Database('unkoserver.db');

/**
 * @param {Client} client
 */

module.exports = (client) => {
    db.backup(client);
    db.dailyreset();
    const all = sql.prepare("SELECT * FROM moneys WHERE guild = ? ORDER BY money DESC;").all('706452606918066237');
    for (let data of all) {
        if (data.money > 1) {
            const zeikin = Math.ceil(data.money / 1.15);
            data.money -= zeikin;
            db.MoneySet(data);
        }
    }
};