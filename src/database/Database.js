const SQLite = require('better-sqlite3');

class Database {
    constructor() {
        this.sql = new SQLite('outiserver.db');

        this.sql.prepare('CREATE TABLE IF NOT EXISTS polls (id INTEGER PRIMARY KEY AUTOINCREMENT, userid TEXT NOT NULL, channelid TEXT NOT NULL, messageid TEXT NOT NULL, endtime INTEGER);').run();
        this.sql.prepare('CREATE UNIQUE INDEX IF NOT EXISTS idx_polls_id ON polls (id);').run();

        this.sql.prepare('CREATE TABLE IF NOT EXISTS speakers (userid TEXT PRIMARY KEY, speaker_id INTEGER NOT NULL);').run();
        this.sql.prepare('CREATE UNIQUE INDEX IF NOT EXISTS idx_speakers_id ON speakers (userid);').run();

        this.sql.prepare('CREATE TABLE IF NOT EXISTS slots (channel_id TEXT PRIMARY KEY, type INTEGER NOT NULL);').run();
        this.sql.prepare('CREATE UNIQUE INDEX IF NOT EXISTS idx_slots_id ON slots (channel_id);').run();

        this.sql.prepare('CREATE TABLE IF NOT EXISTS emoji_uses (emoji_id TEXT PRIMARY KEY, count INTEGER NOT NULL);').run();
        this.sql.prepare('CREATE UNIQUE INDEX IF NOT EXISTS idx_emoji_uses_id ON emoji_uses (emoji_id);').run();

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

    /**
     *
     * @param {string} channelId
     * @returns {{ channel_id: string, type: number } | undefined}
     */
    getSlot(channelId) {
        return this.sql.prepare('SELECT * FROM slots WHERE channel_id = ?;').get(channelId);
    }

    /**
     *
     * @param {string} channelId
     * @param {number} type
     */
    addSlot(channelId, type) {
        if (this.getSlot(channelId)) return;

        this.sql.prepare('INSERT INTO slots VALUES (?, ?);').run(channelId, type);
    }

    /**
     *
     * @param {string} channelId
     */
    deleteSlot(channelId) {
        if (!this.getSlot(channelId)) return;

        this.sql.prepare('DELETE FROM slots WHERE channel_id = ?;').run(channelId);
    }

    /**
     *
     * @param {string} emojiId
     * @returns {{ emoji_id: string, count: number } | undefined}
     */
    getEmojiUseCount(emojiId) {
        return this.sql.prepare('SELECT * FROM emoji_uses WHERE emoji_id = ?;').get(emojiId);
    }

    /**
     *
     * @returns {Array<{ emoji_id: string, count: number }>}
     */
    getAllEmojiUseCount() {
        return this.sql.prepare('SELECT * FROM emoji_uses ORDER BY count DESC LIMIT 10;').all();
    }

    /**
     *
     * @param {string} emojiId
     * @param {number} count
     */
    addEmojiUseCount(emojiId, count) {
        if (!this.getEmojiUseCount(emojiId)) {
            this.sql.prepare('INSERT INTO emoji_uses VALUES (?, ?);').run(emojiId, count);
        }
        else {
            this.sql.prepare('UPDATE emoji_uses SET count = count + ? WHERE emoji_id = ?;').run(count, emojiId);
        }
    }
}

module.exports = Database;