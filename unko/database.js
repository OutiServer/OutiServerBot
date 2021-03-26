const { Client, MessageAttachment } = require('discord.js');
const SQLite = require("better-sqlite3");
const fs = require('fs');

class Database {

    /**
     * @param {string} database_filename
     */

    constructor(database_filename) {
        this.sql = new SQLite(`${database_filename}`);
    }

    Initialize() {
        const Leveltable = this.sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'levels';").get();
        if (!Leveltable['count(*)']) {
            this.sql.prepare("CREATE TABLE levels (id TEXT PRIMARY KEY, user TEXT, guild TEXT, level INTEGER, xp INTEGER, allxp INTEGER);").run();
            this.sql.prepare("CREATE UNIQUE INDEX idx_levels_id ON levels (id);").run();
            this.sql.pragma("synchronous = 1");
            this.sql.pragma("journal_mode = wal");
        }

        const ServerSettingtable = this.sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'serversettings';").get();
        if (!ServerSettingtable['count(*)']) {
            this.sql.prepare("CREATE TABLE serversettings (id TEXT PRIMARY KEY, guild TEXT, ticketid INTEGER, serverjoindedcase INTEGER);").run();
            this.sql.prepare("CREATE UNIQUE INDEX idx_serversettings_id ON serversettings (id);").run();
            this.sql.pragma("synchronous = 1");
            this.sql.pragma("journal_mode = wal");
        }

        const Serverjoindedtable = this.sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'serverjoindeds';").get();
        if (!Serverjoindedtable['count(*)']) {
            this.sql.prepare("CREATE TABLE serverjoindeds (id TEXT PRIMARY KEY, case INTEGER, time TEXT, joinded INTEGER);").run();
            this.sql.prepare("CREATE UNIQUE INDEX idx_serverjoindeds_id ON serverjoindeds (id);").run();
            this.sql.pragma("synchronous = 1");
            this.sql.pragma("journal_mode = wal");
        }
    }

    /**
     * @param {string} userid
     * @param {string} guildid
     */

    levelget(userid, guildid) {
        let data = this.sql.prepare('SELECT * FROM levels WHERE user = ? AND guild = ?').get(userid, guildid);
        if (!data) {
            data = { id: `${guildid}-${userid}`, user: userid, guild: guildid, level: 0, xp: 0, allxp: 0 }
            this.levelset(data);
        }

        return data;
    }

    /**
     * @param {object} data 
     */

    levelset(data) {
        this.sql.prepare('INSERT OR REPLACE INTO levels (id, user, guild, level, xp, allxp) VALUES (@id, @user, @guild, @level, @xp, @allxp);').run(data);
    }

    /**
     * @param {string} guildid
     */

    levelallget(guildid) {
        return this.sql.prepare("SELECT * FROM levels WHERE guild = ? ORDER BY allxp DESC;").all(guildid);
    }

    /**
     * @param {string} guildid
     */

    ServerSettingGet(guildid) {
        let data = this.sql.prepare('SELECT * FROM serversettings WHERE guild = ?').get(guildid);
        if (!data) {
            data = { id: `${guildid}`, guild: guildid, ticketid: 0, serverjoindedcase: 0 }
            this.TicketSet(data);
        }

        return data;
    }

    ServerSettingSet(data) {
        this.sql.prepare('INSERT OR REPLACE INTO serversettings (id, guild, ticketid, serverjoindedcase) VALUES (@id, @guild, @ticketid, serverjoindedcase);').run(data);
    }

    Serverjoindedallget() {
        return this.sql.prepare('SELECT * FROM serverjoindeds ORDER BY case ASC;').all();
    }

    Serverjoindedset(data) {
        this.sql.prepare('INSERT OR REPLACE INTO serverjoindeds (id, case, time, joinded) VALUES (@id, @case, @time, @joinded;').run(data);
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