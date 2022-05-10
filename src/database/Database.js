const SQLite = require('better-sqlite3');

class Database {
    constructor() {
        this.sql = new SQLite('outiserver.db');

        this.sql.prepare('CREATE TABLE IF NOT EXISTS polls (id INTEGER PRIMARY KEY AUTOINCREMENT, userid TEXT, guildid TEXT, channelid TEXT, messageid TEXT, endtime INTEGER);').run();
        this.sql.prepare('CREATE UNIQUE INDEX IF NOT EXISTS idx_polls_id ON polls (id);').run();

        this.sql.prepare('CREATE TABLE IF NOT EXISTS speakers (userid TEXT PRIMARY KEY, speaker_id INTEGER NOT NULL);').run();
        this.sql.prepare('CREATE UNIQUE INDEX IF NOT EXISTS idx_speakers_id ON speakers (userid);').run();

        this.sql.pragma('synchronous = 1');
        this.sql.pragma('journal_mode = wal');
    }

    close() {
        this.sql.close();
    }

    /**
     *
     * @param {string} userid
     * @returns {{ userid: string, speaker_id: number }}
     */
    getSpeaker(userid) {
        return this.sql.prepare('SELECT * FROM speakers WHERE userid = ?').get(userid);
    }

    /**
     *
     * @param {string} userid
     * @param {number} speakerId
     */
    setSpeaker(userid, speakerId) {
        if (!this.getSpeaker(userid)) {
            this.sql.prepare('INSERT INTO speakers VALUES (?, ?);').run(userid, speakerId);
        }
        else {
            this.sql.prepare('INSERT INTO speakers VALUES (?, ?);').run(userid, speakerId);
        }
    }
}

module.exports = Database;