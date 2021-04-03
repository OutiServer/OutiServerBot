const fs = require('fs');
const { Client, MessageAttachment } = require('discord.js');
const SQLite = require("better-sqlite3");

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
            this.sql.prepare("CREATE TABLE serverjoindeds (id TEXT PRIMARY KEY, serverjoindedcase INTEGER, time TEXT, joinded INTEGER);").run();
            this.sql.prepare("CREATE UNIQUE INDEX idx_serverjoindeds_id ON serverjoindeds (id);").run();
            this.sql.pragma("synchronous = 1");
            this.sql.pragma("journal_mode = wal");
        }

        const UserSettingtable = this.sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'usersettings';").get();
        if (!UserSettingtable['count(*)']) {
            this.sql.prepare("CREATE TABLE usersettings (id TEXT PRIMARY KEY, user TEXT, ban INTEGER, admin INTEGER, todocount INTEGER);").run();
            this.sql.prepare("CREATE UNIQUE INDEX idx_usersettings_id ON usersettings (id);").run();
            this.sql.pragma("synchronous = 1");
            this.sql.pragma("journal_mode = wal");
        }

        const Ngwordtable = this.sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'ngwords';").get();
        if (!Ngwordtable['count(*)']) {
            this.sql.prepare("CREATE TABLE ngwords (id TEXT PRIMARY KEY, word TEXT);").run();
            this.sql.prepare("CREATE UNIQUE INDEX idx_ngwords_id ON ngwords (id);").run();
            this.sql.pragma("synchronous = 1");
            this.sql.pragma("journal_mode = wal");
        }

        const Rankimagetable = this.sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'rankimages';").get();
        if (!Rankimagetable['count(*)']) {
            this.sql.prepare("CREATE TABLE rankimages (id TEXT PRIMARY KEY, user TEXT, font INTEGER, fillStyle TEXT, imagex INTEGER, imagey INTEGER, icon INTEGER);").run();
            this.sql.prepare("CREATE UNIQUE INDEX idx_rankimages_id ON rankimages (id);").run();
            this.sql.pragma("synchronous = 1");
            this.sql.pragma("journal_mode = wal");
        }

        const Todolisttable = this.sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'todolists';").get();
        if (!Todolisttable['count(*)']) {
            this.sql.prepare("CREATE TABLE todolists (id TEXT PRIMARY KEY, user TEXT, count INTEGER, title TEXT, description TEXT, completion INTEGER);").run();
            this.sql.prepare("CREATE UNIQUE INDEX idx_todolists_id ON todolists (id);").run();
            this.sql.pragma("synchronous = 1");
            this.sql.pragma("journal_mode = wal");
        }

        const GlobalChattable = this.sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'globalchats';").get();
        if (!GlobalChattable['count(*)']) {
            this.sql.prepare("CREATE TABLE globalchats (id TEXT PRIMARY KEY, channel TEXT);").run();
            this.sql.prepare("CREATE UNIQUE INDEX idx_globalchats_id ON globalchats (id);").run();
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
            this.ServerSettingSet(data);
        }

        return data;
    }

    ServerSettingSet(data) {
        this.sql.prepare('INSERT OR REPLACE INTO serversettings (id, guild, ticketid, serverjoindedcase) VALUES (@id, @guild, @ticketid, @serverjoindedcase);').run(data);
    }

    Serverjoindedallget() {
        return this.sql.prepare('SELECT * FROM serverjoindeds ORDER BY case ASC;').all();
    }

    Serverjoindedset(data) {
        this.sql.prepare('INSERT OR REPLACE INTO serverjoindeds (id, serverjoindedcase, time, joinded) VALUES (@id, @serverjoindedcase, @time, @joinded);').run(data);
    }

    /**
     * @param {string} userid 
     */

    UserSettingget(userid) {
        let data = this.sql.prepare('SELECT * FROM usersettings WHERE user = ?').get(userid);
        if (!data) {
            data = { id: `${userid}`, user: userid, ban: 0, admin: 0, todocount: 0 }
            this.UserSettingset(data);
        }

        return data;
    }

    UserSettingset(data) {
        this.sql.prepare('INSERT OR REPLACE INTO usersettings (id, user, ban, admin, todocount) VALUES (@id, @user, @ban, @admin, @todocount);').run(data);
    }

    ngwordset(data) {
        this.sql.prepare('INSERT OR REPLACE INTO ngwords (id, word) VALUES (@id, @word);').run(data);
    }

    ngwordgetall() {
        return this.sql.prepare("SELECT * FROM ngwords ORDER BY word DESC;").all();
    }

    /**
     * @param {string} word 
     */

    ngworddelete(word) {
        this.sql.prepare('DELETE FROM ngwords WHERE word = ?').run(word);
    }

    /**
     * @param {string} userid 
     */

    Rankimageget(userid) {
        let data = this.sql.prepare('SELECT * FROM rankimages WHERE user = ?').get(userid);

        return data;
    }

    Rankimageset(data) {
        this.sql.prepare('INSERT OR REPLACE INTO rankimages (id, user, font, fillStyle, imagex, imagey, icon) VALUES (@id, @user, @font, @fillStyle, @imagex, @imagey, @icon);').run(data);
    }

    /**
     * @param {string} userid 
     * @param {number} count 
     */

    Todolistget(userid, count) {
        let data = this.sql.prepare('SELECT * FROM todolists WHERE user = ? AND count = ?').get(userid, count);

        return data;
    }

    Todolistset(data) {
        this.sql.prepare('INSERT OR REPLACE INTO todolists (id, user, count, title, description, completion) VALUES (@id, @user, @count, @title, @description, @completion);').run(data);
    }

    /**
     * @param {string} userid
     * @param {number} count
     */

    Todoremove(userid, count) {
        this.sql.prepare('DELETE FROM todolists WHERE user = ? AND count = ?').run(userid, count);
    }

    /**
     * @param {string} userid 
     */

    Todolistgetall(userid) {
        return this.sql.prepare("SELECT * FROM todolists WHERE user = ? ORDER BY count ASC;").all(userid);
    }

    /**
     * @param {string} userid 
     */

    Todolistremoveall(userid) {
        this.sql.prepare('DELETE FROM todolists WHERE user = ?').run(userid);
    }

    /**
     * グローバルチャットチャンネル設定関数
     * @param {string} channelid 
     */

    globalchatset(channelid) {
        let data = { id: `${channelid}`, channel: channelid };

        this.sql.prepare('INSERT OR REPLACE INTO globalchats (id, channel) VALUES (@id, @channel);').run(data);
    }

    /**
     * グローバルチャットチャンネル削除関数
     * @param {string} channelid
     */

    globalchatdelete(channelid) {
        this.sql.prepare('DELETE FROM globalchats WHERE channel = ?').run(guildid, channelid);
    }

    /**
     * グローバルチャットチャンネル取得関数
     * @returns 
     */

    globalchatall() {
        return this.sql.prepare("SELECT * FROM globalchats ORDER BY guild DESC;").all();
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