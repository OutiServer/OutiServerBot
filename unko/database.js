const { Client, MessageAttachment } = require('discord.js');
const SQLite = require("better-sqlite3");

class Database {

    /**
     * @param {string} database_filename
     */

    constructor(database_filename) {
        this.sql = new SQLite(`${database_filename}`); //db接続
    }

    Initialize() { //初期設定色々
        const Moneytable = this.sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'moneys';").get();
        if (!Moneytable['count(*)']) {
            this.sql.prepare("CREATE TABLE moneys (id TEXT PRIMARY KEY, user TEXT, guild TEXT, money INTEGER, dailylogin INTEGER, ticket INTEGER, tuna INTEGER);").run();
            this.sql.prepare("CREATE UNIQUE INDEX idx_moneys_id ON moneys (id);").run();
            this.sql.pragma("synchronous = 1");
            this.sql.pragma("journal_mode = wal");
        }

        const SlotSettingstable = this.sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'slotsettings';").get();
        if (!SlotSettingstable['count(*)']) {
            this.sql.prepare("CREATE TABLE slotsettings (id TEXT PRIMARY KEY, guild TEXT, Jackpotprobability INTEGER, Jackpot INTEGER);").run();
            this.sql.prepare("CREATE UNIQUE INDEX idx_slotsettings_id ON slotsettings (id);").run();
            this.sql.pragma("synchronous = 1");
            this.sql.pragma("journal_mode = wal");
        }

        const Dailytable = this.sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'dailys';").get();
        if (!Dailytable['count(*)']) {
            this.sql.prepare("CREATE TABLE dailys (id TEXT PRIMARY KEY, user TEXT, guild TEXT, login INTEGER);").run();
            this.sql.prepare("CREATE UNIQUE INDEX idx_dailys_id ON dailys (id);").run();
            this.sql.pragma("synchronous = 1");
            this.sql.pragma("journal_mode = wal");
        }

        const Littlewartable = this.sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'littlewar';").get();
        if (!Littlewartable['count(*)']) {
            this.sql.prepare("CREATE TABLE littlewar (id TEXT PRIMARY KEY, user TEXT, guild TEXT, emoji1 INTEGER, emoji2 INTEGER, emoji3 INTEGER, number INTEGER);").run();
            this.sql.prepare("CREATE UNIQUE INDEX idx_littlewar_id ON littlewar (id);").run();
            this.sql.pragma("synchronous = 1");
            this.sql.pragma("journal_mode = wal");
        }

        const Snstable = this.sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'snss';").get();
        if (!Snstable['count(*)']) {
            this.sql.prepare("CREATE TABLE snss (id TEXT PRIMARY KEY, user TEXT, guild TEXT, title TEXT, url TEXT, count INTEGER);").run();
            this.sql.prepare("CREATE UNIQUE INDEX idx_snss_id ON snss (id);").run();
            this.sql.pragma("synchronous = 1");
            this.sql.pragma("journal_mode = wal");
        }

        const Tickettable = this.sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'tickets';").get();
        if (!Tickettable['count(*)']) {
            this.sql.prepare("CREATE TABLE tickets (id TEXT PRIMARY KEY, guild TEXT, ticketid INTEGER);").run();
            this.sql.prepare("CREATE UNIQUE INDEX idx_tickets_id ON tickets (id);").run();
            this.sql.pragma("synchronous = 1");
            this.sql.pragma("journal_mode = wal");
        }

        const Disboardtimertable = this.sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'disboardtimer';").get();
        if (!Disboardtimertable['count(*)']) {
            this.sql.prepare("CREATE TABLE disboardtimer (id TEXT PRIMARY KEY, guild TEXT, hour INTEGER, minute INTEGER, second INTEGER, millisecond INTEGER);").run();
            this.sql.prepare("CREATE UNIQUE INDEX idx_disboardtimer_id ON disboardtimer (id);").run();
            this.sql.pragma("synchronous = 1");
            this.sql.pragma("journal_mode = wal");
        }

        const Dissokutimertable = this.sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'dissokutimer';").get();
        if (!Dissokutimertable['count(*)']) {
            this.sql.prepare("CREATE TABLE dissokutimer (id TEXT PRIMARY KEY, guild TEXT, hour INTEGER, minute INTEGER, second INTEGER, millisecond INTEGER);").run();
            this.sql.prepare("CREATE UNIQUE INDEX idx_dissokutimer_id ON dissokutimer (id);").run();
            this.sql.pragma("synchronous = 1");
            this.sql.pragma("journal_mode = wal");
        }
    }

    /**
     * @param {string} userid
     * @param {string} guildid
     */

    MoneyGet(userid, guildid) {
        let data = this.sql.prepare('SELECT * FROM moneys WHERE user = ? AND guild = ?').get(userid, guildid);
        if (!data) {
            data = { id: `${guildid}-${userid}`, user: userid, guild: guildid, money: 0, dailylogin: 0, ticket: 0, tuna: 0 }
            this.MoneySet(data);
        }

        return data;
    }

    MoneySet(data) {
        this.sql.prepare('INSERT OR REPLACE INTO moneys (id, user, guild, money, dailylogin, ticket, tuna) VALUES (@id, @user, @guild, @money, @dailylogin, @ticket, @tuna);').run(data);
    }

    /**
     * @param {string} guildid
     */

    SlotSettingsGet(guildid) {
        let data = this.sql.prepare('SELECT * FROM slotsettings WHERE guild = ?').get(guildid);
        if (!data) {
            data = { id: `${guildid}`, guild: guildid, Jackpotprobability: 10, Jackpot: 100000 }
            this.SlotSettingsSet(data);
        }

        return data;
    }

    SlotSettingsSet(data) {
        this.sql.prepare('INSERT OR REPLACE INTO slotsettings (id, guild, Jackpotprobability, Jackpot) VALUES (@id, @guild, @Jackpotprobability, @Jackpot);').run(data);
    }

    /**
     * @param {string} userid
     * @param {string} guildid
     */

    DailyGet(userid, guildid) {
        let data = this.sql.prepare('SELECT * FROM dailys WHERE user = ? AND guild = ?').get(userid, guildid);
        if (!data) {
            data = { id: `${userid}-${guildid}`, user: userid, guild: guildid, login: 0 }
            this.DailySet(data);
        }

        return data;
    }

    DailySet(data) {
        this.sql.prepare('INSERT OR REPLACE INTO dailys (id, user, guild, login) VALUES (@id, @user, @guild, @login);').run(data);
    }

    /**
     * @param {string} userid
     * @param {string} guildid
     */

    LittlewarGet(userid, guildid) {
        let data = this.sql.prepare('SELECT * FROM littlewar WHERE guild = ?').get(guildid);
        if (!data) {
            data = { id: guildid, user: userid, guild: guildid, emoji1: 1, emoji2: 1, emoji3: 1, number: 0 }
            this.LittlewarSet(data);
        }

        return data;
    }

    LittlewarSet(data) {
        this.sql.prepare('INSERT OR REPLACE INTO littlewar (id, user, guild, emoji1, emoji2, emoji3, number) VALUES (@id, @user, @guild, @emoji1, @emoji2, @emoji3, @number);').run(data);
    }

    /**
     * @param {string} userid
     * @param {string} guildid
     */

    SnsGet(userid, guildid) {
        let data = this.sql.prepare('SELECT * FROM snss WHERE user = ? AND guild = ?').get(userid, guildid);
        if (!data) {
            data = { id: `${guildid}-${userid}`, user: userid, guild: guildid, title: null, url: null, count: 0 }
            this.SnsSet(data);
        }

        return data;
    }

    SnsSet(data) {
        this.sql.prepare('INSERT OR REPLACE INTO snss (id, user, guild, title, url, count) VALUES (@id, @user, @guild, @title, @url, @count);').run(data);
    }

    /**
     * @param {string} guildid
     */

    TicketGet(guildid) {
        let data = this.sql.prepare('SELECT * FROM tickets WHERE guild = ?').get(guildid);
        if (!data) {
            data = { id: `${guildid}`, guild: guildid, ticketid: 0 }
            this.TicketSet(data);
        }

        return data;
    }

    TicketSet(data) {
        this.sql.prepare('INSERT OR REPLACE INTO tickets (id, guild, ticketid) VALUES (@id, @guild, @ticketid);').run(data);
    }

    /**
     * @param {string} guildid
     */

    DisboardtimerGet(guildid) {
        let data = this.sql.prepare('SELECT * FROM disboardtimer WHERE guild = ?').get(guildid);
        if (!data) {
            data = { id: `${guildid}`, guild: guildid, ms: 0 }
            this.DisboardtimerSet(data);
        }

        return data;
    }

    DisboardtimerSet(data) {
        this.sql.prepare('INSERT OR REPLACE INTO disboardtimer (id, guild, ms) VALUES (@id, @guild, @ms);').run(data);
    }

    /**
     * @param {string} guildid
     */

    DissokutimerGet(guildid) {
        let data = this.sql.prepare('SELECT * FROM dissokutimer WHERE guild = ?').get(guildid);
        if (!data) {
            data = { id: `${guildid}`, guild: guildid, ms: 0 }
            this.DissokutimerSet(data);
        }

        return data;
    }

    DissokutimerSet(data) {
        this.sql.prepare('INSERT OR REPLACE INTO dissokutimer (id, guild, ms) VALUES (@id, @guild, @ms);').run(data);
    }

    dailyreset() {
        this.sql.prepare("DROP TABLE dailys;").run();
        this.Initialize();
    }

    /**
     * @param {Client} client
     */

    backup(client) {
        const time = new Date();
        this.sql.backup(`${time}.db`)
            .then(() => {
                client.channels.cache.get('816555488694108170').send(new MessageAttachment(`${time}.db`));
            });
    }
}

module.exports = Database;