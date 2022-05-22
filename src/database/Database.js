const SQLite = require('better-sqlite3');

class Database {
    constructor() {
        this.sql = new SQLite('outiserver.db');

        this.sql.prepare('CREATE TABLE IF NOT EXISTS polls (id INTEGER PRIMARY KEY AUTOINCREMENT, userid TEXT NOT NULL, channelid TEXT NOT NULL, messageid TEXT NOT NULL, endtime INTEGER);').run();
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
     * @param {number} time
     * @returns {Array<{ id: number, userid: string, channelid: string, messageid: string, endtime: number | null }>}
     */
    getEndAllPoll(time) {
        return this.sql.prepare('SELECT * FROM polls WHERE endtime <= ?;').all(time);
    }

    /**
     *
     * @param {string} userId
     * @param {string} channelId
     * @param {string} messageId
     * @param {number?} endTime
     *
     * @returns {number}
     */
    addPoll(userId, channelId, messageId, endTime = null) {
        this.sql.prepare('INSERT INTO polls (userid, channelid, messageid, endtime) VALUES (?, ?, ?, ?);').run(userId, channelId, messageId, endTime);

        return this.sql.prepare('SELECT * FROM sqlite_sequence WHERE name = ?;').get('polls').seq;
    }

    /**
     *
     * @param {number} id
     *
     * @returns {{ id: number, userid: string, channelid: string, messageid: string, endtime: number | null } | undefined}
     */
    getPoll(id) {
        return this.sql.prepare('SELECT * FROM polls WHERE id = ?;').get(id);
    }

    /**
     *
     * @param {number} id
     */
    removePoll(id) {
        this.sql.prepare('DELETE FROM polls WHERE id = ?;').run(id);
    }

    /**
     *
     * @param {string} userId
     * @returns {{ userid: string, speaker_id: number }}
     */
    getSpeaker(userId) {
        return this.sql.prepare('SELECT * FROM speakers WHERE userid = ?').get(userId);
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
            this.sql.prepare('UPDATE speakers SET speaker_id = ? WHERE userid = ?;').run(speakerId, userid);
        }
    }
}

module.exports = Database;