const SQLite = require("better-sqlite3");

class Database {
    /**
     * @param {string} database_filename
     */
    constructor(database_filename) {
        this.sql = new SQLite(`${database_filename}`); //db接続
    }

    Initialize() { //初期設定色々
        this.sql.prepare('DROP TABLE enemys;').run();
        this.sql.prepare('DROP TABLE enemyspells;').run();
        this.sql.prepare('DROP TABLE players;').run();
        //テーブル作成とか
        const Enemytable = this.sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'enemys';").get();
        if (!Enemytable['count(*)']) {
            this.sql.prepare("CREATE TABLE enemys (id TEXT PRIMARY KEY, user TEXT, number INTEGER, flag INTEGER, hp INTEGER, spellcardnumber INTEGER, spellcardflag INTEGER, maxspellcard INTEGER, maxatk INTEGER, spellcardtype INTEGER, spellbonus INTEGER);").run();
            this.sql.prepare("CREATE UNIQUE INDEX idx_enemys_id ON enemys (id);").run();
            this.sql.pragma("synchronous = 1");
            this.sql.pragma("journal_mode = wal");
        }

        const EnemySpelltable = this.sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'enemyspells';").get();
        if (!EnemySpelltable['count(*)']) {
            this.sql.prepare("CREATE TABLE enemyspells (id TEXT PRIMARY KEY, user TEXT, enemynumber INTEGER, spellnumber INTEGER, allspell INTEGER, getspell INTEGER);").run();
            this.sql.prepare("CREATE UNIQUE INDEX idx_enemyspells_id ON enemyspells (id);").run();
            this.sql.pragma("synchronous = 1");
            this.sql.pragma("journal_mode = wal");
        }

        const Playertable = this.sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'players';").get();
        if (!Playertable['count(*)']) {
            this.sql.prepare("CREATE TABLE players (id TEXT PRIMARY KEY, user TEXT, number INTEGER, hiscore INTEGER, score INTEGER, hp INTEGER, power INTEGER, player INTEGER, spell INTEGER, playerfragment INTEGER, spellfragment INTEGER);").run();
            this.sql.prepare("CREATE UNIQUE INDEX idx_players_id ON players (id);").run();
            this.sql.pragma("synchronous = 1");
            this.sql.pragma("journal_mode = wal");
        }
    }

    /**
     * @param {string} userid
     */

    EnemyGet(userid) {
        let data = this.sql.prepare('SELECT * FROM enemys WHERE user = ?').get(userid);
        if (!data) {
            data = { id: `${userid}`, user: userid, number: 0, flag: 0, hp: 0, spellcardnumber: -1, spellcardflag: 0, maxspellcard: 0, maxatk: 0, spellcardtype: 0, spellbonus: 0 }
            this.EnemySet(data);
        }

        return data;
    }

    EnemySet(data) {
        this.sql.prepare('INSERT OR REPLACE INTO enemys (id, user, number, flag, hp, spellcardnumber, spellcardflag, maxspellcard, maxatk, spellcardtype, spellbonus) VALUES (@id, @user, @number, @flag, @hp, @spellcardnumber, @spellcardflag, @maxspellcard, @maxatk, @spellcardtype, @spellbonus);').run(data);
    }

    /**
     * @param {string} userid
     * @param {number} enemynumber
     * @param {number} spellnumber
     */

    EnemySpellGet(userid, enemynumber, spellnumber) {
        let data = this.sql.prepare('SELECT * FROM enemyspells WHERE user = ? AND enemynumber = ? AND spellnumber = ?').get(userid, enemynumber, spellnumber);
        if (!data) {
            data = { id: `${userid}-${enemynumber}-${spellnumber}`, user: userid, enemynumber: enemynumber, spellnumber: spellnumber, allspell: 0, getspell: 0 };
            this.EnemySpellSet(data);
        }

        return data;
    }

    EnemySpellSet(data) {
        this.sql.prepare('INSERT OR REPLACE INTO enemyspells(id, user, enemynumber, spellnumber, allspell, getspell) VALUES(@id, @user, @enemynumber, @spellnumber, @allspell, @getspell);').run(data);
    }

    /**
    * @param {string} userid
    */

    PlayerGet(userid) {
        let data = this.sql.prepare('SELECT * FROM players WHERE user = ?').get(userid);
        if (!data) {
            data = { id: `${userid}`, user: userid, number: 0, hiscore: 0, score: 0, hp: 50000, power: 128, player: 3, spell: 3, playerfragment: 0, spellfragment: 0 };
            this.PlayerSet(data);
        }

        return data;
    }

    PlayerSet(data) {
        this.sql.prepare('INSERT OR REPLACE INTO players (id, user, number, hiscore, score, hp, power, player, spell, playerfragment, spellfragment) VALUES (@id, @user, @number, @hiscore, @score, @hp, @power, @player, @spell, @playerfragment, @spellfragment);').run(data);
    }

    /**
     * @param {string} sql_source
     */

    DataGet(sql_source) { //データ取得関数
        return this.sql.prepare(sql_source).get();
    }

    /**
     * @param {string} sql_source
     */

    DataSet(sql_source, data) { //データセット関数
        this.sql.prepare(sql_source).run(data);
    }
}

module.exports = Database;