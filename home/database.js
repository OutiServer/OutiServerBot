const fs = require('fs');
const { Client, MessageAttachment } = require('discord.js');
const SQLite = require("better-sqlite3");

class Database {

    /**
     * データベース接続
     * @param {string} database_filename
     */

    constructor(database_filename) {
        this.sql = new SQLite(`${database_filename}`);
    }

    /**
     * データベース初期化関数
     */

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

        const UserSettingtable = this.sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'usersettings';").get();
        if (!UserSettingtable['count(*)']) {
            this.sql.prepare("CREATE TABLE usersettings (id TEXT PRIMARY KEY, user TEXT, ban INTEGER, admin INTEGER, todocount INTEGER);").run();
            this.sql.prepare("CREATE UNIQUE INDEX idx_usersettings_id ON usersettings (id);").run();
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

        const BumpUpCounttable = this.sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'bumpupcounts';").get();
        if (!BumpUpCounttable['count(*)']) {
            this.sql.prepare("CREATE TABLE bumpupcounts (id TEXT PRIMARY KEY, user TEXT, bump INTEGER, up INTEGER);").run();
            this.sql.prepare("CREATE UNIQUE INDEX idx_bumpupcounts_id ON bumpupcounts (id);").run();
            this.sql.pragma("synchronous = 1");
            this.sql.pragma("journal_mode = wal");
        }

        const Countrytable = this.sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'countrys';").get();
        if (!Countrytable['count(*)']) {
            this.sql.prepare("CREATE TABLE countrys (id TEXT PRIMARY KEY, leader TEXT, role TEXT);").run();
            this.sql.prepare("CREATE UNIQUE INDEX idx_countrys_id ON countrys (id);").run();
            this.sql.pragma("synchronous = 1");
            this.sql.pragma("journal_mode = wal");
        }

        const Gamertagtable = this.sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'gamertags';").get();
        if (!Gamertagtable['count(*)']) {
            this.sql.prepare("CREATE TABLE gamertags (id TEXT PRIMARY KEY, user TEXT, tag TEXT);").run();
            this.sql.prepare("CREATE UNIQUE INDEX idx_gamertags_id ON gamertags (id);").run();
            this.sql.pragma("synchronous = 1");
            this.sql.pragma("journal_mode = wal");
        }
    }

    /**
     * level取得関数
     * @param {string} userid
     * @param {string} guildid
     */

    levelget(userid, guildid) {
        let data = this.sql.prepare('SELECT * FROM levels WHERE user = ? AND guild = ?').get(userid, guildid);
        if (!data) {
            data = { id: `${guildid}-${userid}`, user: userid, guild: guildid, level: 0, xp: 0, allxp: 0 }
            this.levelset(data);
        }

        return { id: data.id, user: data.user, guild: data.guild, level: data.level, xp: data.xp, allxp: data.allxp };
    }

    /**
     * level保存関数
     * @param {*} data
     */

    levelset(data) {
        return this.sql.prepare('INSERT OR REPLACE INTO levels (id, user, guild, level, xp, allxp) VALUES (@id, @user, @guild, @level, @xp, @allxp);').run(data);
    }

    /**
     * 全てのlevelデータ取得関数
     * @param {string} guildid
     */

    levelallget(guildid) {
        return this.sql.prepare("SELECT * FROM levels WHERE guild = ? ORDER BY allxp DESC;").all(guildid);
    }

    /**
     * サーバーの設定取得関数
     * @param {string} guildid
     */

    ServerSettingGet(guildid) {
        let data = this.sql.prepare('SELECT * FROM serversettings WHERE guild = ?').get(guildid);
        if (!data) {
            data = { id: `${guildid}`, guild: guildid, ticketid: 0, serverjoindedcase: 0 }
            this.ServerSettingSet(data);
        }

        return { id: data.id, guild: data.guild, ticketid: data.ticketid, serverjoindedcase: data.serverjoindedcase };
    }

    /**
     * ユーザー設定取得関数
     * @param {string} userid 
     */

    UserSettingget(userid) {
        let data = this.sql.prepare('SELECT * FROM usersettings WHERE user = ?').get(userid);
        if (!data) {
            data = { id: `${userid}`, user: userid, ban: 0, admin: 0, todocount: 0 }
            this.UserSettingset(data);
        }

        return { id: data.id, user: data.user, ban: data.ban, admin: data.admin, todocount: data.todocount };
    }

    /**
     * ユーザー設定保存関数
     * @param {*} data 
     */

    UserSettingset(data) {
        return this.sql.prepare('INSERT OR REPLACE INTO usersettings (id, user, ban, admin, todocount) VALUES (@id, @user, @ban, @admin, @todocount);').run(data);
    }

    /**
     * rankimage設定取得関数
     * @param {string} userid 
     */

    Rankimageget(userid) {
        let data = this.sql.prepare('SELECT * FROM rankimages WHERE user = ?').get(userid);
        if (!data) return undefined;
        return { id: data.id, user: data.user, font: data.font, fillStyle: data.fillStyle, imagex: data.imagex, imagey: data.imagey, icon: data.icon };
    }

    /**
     * rank画像保存関数
     * @param {*} data 
     */

    Rankimageset(data) {
        return this.sql.prepare('INSERT OR REPLACE INTO rankimages (id, user, font, fillStyle, imagex, imagey, icon) VALUES (@id, @user, @font, @fillStyle, @imagex, @imagey, @icon);').run(data);
    }

    /**
     * Todoリスト取得関数
     * @param {string} userid 
     * @param {number} count 
     */

    Todolistget(userid, count) {
        let data = this.sql.prepare('SELECT * FROM todolists WHERE user = ? AND count = ?').get(userid, count);
        if (!data) return undefined;
        return { id: data.id, user: data.user, count: data.count, title: data.title, description: data.description, completion: data.completion };
    }

    /**
     * Todoリスト保存関数
     * @param {*} data 
     */

    Todolistset(data) {
        return this.sql.prepare('INSERT OR REPLACE INTO todolists (id, user, count, title, description, completion) VALUES (@id, @user, @count, @title, @description, @completion);').run(data);
    }

    /**
     * Todoリスト削除関数
     * @param {string} userid
     * @param {number} count
     */

    Todoremove(userid, count) {
        return this.sql.prepare('DELETE FROM todolists WHERE user = ? AND count = ?').run(userid, count);
    }

    /**
     * Todoリスト全取得関数
     * @param {string} userid 
     */

    Todolistgetall(userid) {
        return this.sql.prepare("SELECT * FROM todolists WHERE user = ? ORDER BY count ASC;").all(userid);
    }

    /**
     * Todoリスト全削除関数
     * @param {string} userid 
     */

    Todolistremoveall(userid) {
        return this.sql.prepare('DELETE FROM todolists WHERE user = ?').run(userid);
    }

    /**
     * Bump & Upの回数を返す関数
     * @param {string} userid 
     */

    BumpUpCountGet(userid) {
        let data = this.sql.prepare('SELECT * FROM bumpupcounts WHERE user = ?').get(userid);
        if (!data) {
            data = { id: `${userid}`, user: userid, bump: 0, up: 0 };
            this.BumpUpCountSet(data);
        }

        return { id: data.id, user: data.user, bump: data.bump, up: data.up };
    }

    /**
     * Bump & Upの回数を保存する関数
     * @param {*} data 
     */

    BumpUpCountSet(data) {
        return this.sql.prepare('INSERT OR REPLACE INTO bumpupcounts (id, user, bump, up) VALUES (@id, @user, @bump, @up);').run(data);
    }

    /**
     * 国設定関数
     * @param {string} leaderid 
     * @param {string} roleid 
     */

    Countryset(leaderid, roleid) {
        let data = {
            id: `${leaderid}-${roleid}`,
            leader: leaderid,
            role: roleid
        };

        return this.sql.prepare('INSERT OR REPLACE INTO countrys (id, leader, role) VALUES (@id, @leader, @role);').run(data);
    }

    /**
     * 国全取得関数
     * @returns 
     */

    Countrygetall() {
        return this.sql.prepare("SELECT * FROM countrys ORDER BY leader DESC;").all();
    }

    /**
     * ゲーマータグ設定関数
     * @param {string} userid 
     * @param {string} gamertag 
     */

    GamertagSet(userid, gamertag) {
        let data = {
            id: `${userid}-${gamertag}`,
            user: userid,
            tag: gamertag
        };

        return this.sql.prepare('INSERT OR REPLACE INTO gamertags (id, user, tag) VALUES (@id, @user, @tag);').run(data);
    }

    /**
     * ゲーマータグユーザーIDで取得関数
     * @param {string} userid 
     */

    GamertaguserGet(userid) {
        let data = this.sql.prepare('SELECT * FROM gamertags WHERE user = ?').get(userid);
        if (!data) return undefined;
        return { id: data.id, user: data.user, tag: data.tag };
    }

    /**
     * ゲーマータグゲーマータグで取得関数
     * @param {string} gamertag
     */

    GamertagtagGet(gamertag) {
        let data = this.sql.prepare('SELECT * FROM gamertags WHERE tag = ?').get(gamertag);
        if (!data) return undefined;
        return { id: data.id, user: data.user, tag: data.tag };
    }

    /**
     * ゲーマータグ全取得関数
     * @returns 
     */

    GamertagGetall() {
        return this.sql.prepare("SELECT * FROM gamertags ORDER BY id DESC;").all();
    }

    /**
     * dbバックアップ関数
     * @param {Client} client
     */

    backup(client) {
        this.sql.backup(`backup.db`)
            .then(() => client.channels.cache.get('816555488694108170').send(new MessageAttachment(`backup.db`)))
            .then(() => fs.unlinkSync('backup.db'));
    }
}

module.exports = Database;