const { Client, MessageAttachment } = require('discord.js');
const SQLite = require("better-sqlite3");
const sql = new SQLite('unkoserver.db');
const { Database } = require('../../unko/index');
const db = new Database('unkoserver.db');

/**
 * @param {Client} client
 */

module.exports = (client) => {
    const time = new Date();
    db.backup(client);
    sql.prepare("DROP TABLE dailys;").run();
    const testtable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'dailys';").get();
    if (!testtable['count(*)']) {
        sql.prepare("CREATE TABLE dailys (id TEXT PRIMARY KEY, user TEXT, guild TEXT, login INTEGER);").run();
        sql.prepare("CREATE UNIQUE INDEX idx_dailys_id ON dailys (id);").run();
        sql.pragma("synchronous = 1");
        sql.pragma("journal_mode = wal");
    }
    let servermoneydata = client.getServerMoney.get('706452606918066237');
    const all = sql.prepare("SELECT * FROM moneys WHERE guild = ? ORDER BY money DESC;").all('706452606918066237');
    for (let data of all) {
        if (data.money > 1) {
            const zeikin = Math.ceil(data.money / 1.15);
            data.money -= zeikin;
            servermoneydata.money += zeikin;
            client.setMoney.run(data);
        }
    }
    client.setServerMoney.run(servermoneydata);
};