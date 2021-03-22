const { Client, MessageAttachment } = require('discord.js');
const SQLite = require("better-sqlite3");
const fs = require('fs');

class Database {

    /**
     * @param {string} database_filename
     */

    constructor(database_filename) {
        this.sql = new SQLite(`${database_filename}`); //db接続
    }

    Initialize() { //初期設定色々
        const Leveltable = this.sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'levels';").get();
        if (!Leveltable['count(*)']) {
            this.sql.prepare("CREATE TABLE levels (id TEXT PRIMARY KEY, user TEXT, guild TEXT, level INTEGER, xp INTEGER);").run();
            this.sql.prepare("CREATE UNIQUE INDEX idx_levels_id ON levels (id);").run();
            this.sql.pragma("synchronous = 1");
            this.sql.pragma("journal_mode = wal");
        }
    }

    /**
     * @param {string} userid
     * @param {string} guildid
     * @returns {object} 
     */

    levelget(userid, guildid) {
        let data = this.sql.prepare('SELECT * FROM levels WHERE user = ? AND guild = ?').get(userid, guildid);
        if (!data) {
            data = { id: `${guildid}-${userid}`, user: userid, guild: guildid, level: 0, xp: 0 }
            this.levelset(data);
        }
    }

    /**
     * @param {object} data 
     */

    levelset(data) {
        this.sql.prepare('INSERT OR REPLACE INTO levels (id, user, guild, level, xp) VALUES (@id, @user, @guild, @level, @xp);').run(data);
    }

    /**
     * @param {Client} client
     */

    backup(client) {
        this.sql.backup(`backup.db`)
            .then(() => client.channels.cache.get('816555488694108170').send(new MessageAttachment(`backup.db`)))
            .then(() => fs.unlinkSync('backup.db'));
    }
}

module.exports = Database;