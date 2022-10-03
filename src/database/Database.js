const SQLite = require('better-sqlite3');

class Database {
    constructor() {
        this.sql = new SQLite('outiserver.db');

        this.sql.prepare('CREATE TABLE IF NOT EXISTS polls (id INTEGER PRIMARY KEY AUTOINCREMENT, userid TEXT NOT NULL, channelid TEXT NOT NULL, messageid TEXT NOT NULL, endtime INTEGER);').run();
        this.sql.prepare('CREATE UNIQUE INDEX IF NOT EXISTS idx_polls_id ON polls (id);').run();

        this.sql.prepare('CREATE TABLE IF NOT EXISTS speakers (userid TEXT PRIMARY KEY, speaker_id INTEGER NOT NULL);').run();
        this.sql.prepare('CREATE UNIQUE INDEX IF NOT EXISTS idx_speakers_id ON speakers (userid);').run();

        this.sql.prepare('CREATE TABLE IF NOT EXISTS emoji_uses (emoji_id TEXT PRIMARY KEY, count INTEGER NOT NULL);').run();
        this.sql.prepare('CREATE UNIQUE INDEX IF NOT EXISTS idx_emoji_uses_id ON emoji_uses (emoji_id);').run();

        this.sql.prepare('CREATE TABLE IF NOT EXISTS study_times (id TEXT PRIMARY KEY, user_id TEXT NOT NULL, year INTEGER NOT NULL, month INTEGER NOT NULL, day INTEGER NOT NULL, time INTEGER NOT NULL);').run();
        this.sql.prepare('CREATE UNIQUE INDEX IF NOT EXISTS idx_study_times_id ON study_times (id);').run();

        this.sql.prepare('CREATE TABLE IF NOT EXISTS words (id INTEGER PRIMARY KEY AUTOINCREMENT, word TEXT NOT NULL, replace_word TEXT NOT NULL);').run();
        this.sql.prepare('CREATE UNIQUE INDEX IF NOT EXISTS idx_words_id ON words (id);').run();

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

    /**
     *
     * @param {string} userId
     * @param {number} year
     * @param {number} month
     * @param {number} day
     * @returns {{ id: string, user_id: string, year: number, month: number, day: number, time: number } | undefined}
     */
    getStudy(userId, year, month, day) {
        return this.sql.prepare('SELECT * FROM study_times WHERE user_id = ? AND year = ? AND month = ? AND day = ?;').get(userId, year, month, day);
    }

    /**
     *
     * @param {string} userId
     * @param {number} year
     * @param {number} month
     * @param {number} day
     */
    addStudy(userId, year, month, day) {
        if (this.getStudy(userId, year, month, day)) return;
        this.sql.prepare('INSERT INTO study_times VALUES (?, ?, ?, ?, ?, ?);').run(`${userId}-${year}-${month}-${day}`, userId, year, month, day, 0);
    }

    /**
     *
     * @param {string} userId
     * @param {number} year
     * @param {number} month
     * @param {number} day
     * @param {number} time
     */
    addStudyTime(userId, year, month, day, time) {
        if (!this.getStudy(userId, year, month, day)) return;
        this.sql.prepare('UPDATE study_times SET time = time + ? WHERE user_id = ? AND year = ? AND month = ? AND day = ?;').run(time, userId, year, month, day);
    }

    /**
     *
     * @param {string} userId
     * @param {number} year
     * @param {number} month
     * @returns {Array<{ id: string, user_id: string, year: number, month: number, day: number, time: number }>}
     */
    getStudyMonth(userId, year, month) {
        return this.sql.prepare('SELECT * FROM study_times WHERE user_id = ? AND year = ? AND month = ? ORDER BY day ASC;').all(userId, year, month);
    }

    /**
     *
     * @param {string} word
     * @returns {{ id: number, word: string, replace_word: string }}
     */
    getWord(word) {
        return this.sql.prepare('SELECT * FROM words WHERE word = ?;').get(word);
    }

    getAllWord() {
        return this.sql.prepare('SELECT * FROM words;').all();
    }

    /**
     *
     * @param {string} word
     * @param {string} replaceWord
     */
    addWord(word, replaceWord) {
        if (this.getWord(word)) return this.updateWord(word, replaceWord);

        this.sql.prepare('INSERT INTO words (word, replace_word) VALUES (?, ?);').run(word, replaceWord);
    }

    /**
     *
     * @param {string} word
     * @param {string} replaceWord
     */
    updateWord(word, replaceWord) {
        if (!this.getWord(word)) return this.addWord(word, replaceWord);

        this.sql.prepare('UPDATE words SET replace_word = ? WHERE word = ?;').run(replaceWord, word);
    }

    /**
     *
     * @param {string} word
     */
    deleteWord(word) {
        if (!this.getWord(word)) return;

        this.sql.prepare('DELETE FROM words WHERE index_word = ?;').run(word);
    }
}

module.exports = Database;