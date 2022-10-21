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

        this.sql.prepare('CREATE TABLE IF NOT EXISTS words (id INTEGER PRIMARY KEY AUTOINCREMENT, word TEXT NOT NULL, replace_word TEXT NOT NULL);').run();
        this.sql.prepare('CREATE UNIQUE INDEX IF NOT EXISTS idx_words_id ON words (id);').run();

        this.sql.prepare('CREATE TABLE IF NOT EXISTS levels (user_id INTEGER PRIMARY KEY AUTOINCREMENT, xp INTEGER NOT NULL, level INTEGER NOT NULL);').run();
        this.sql.prepare('CREATE UNIQUE INDEX IF NOT EXISTS idx_levels_id ON levels (user_id);').run();

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

        this.sql.prepare('DELETE FROM words WHERE word = ?;').run(word);
    }

    /**
     *
     * @param {string} userId
     * @returns {{ user_id: string, xp: number, level: number } | undefined}
     */
    getLevel(userId) {
        return this.sql.prepare('SELECT * FROM levels WHERE user_id = ?;').get(userId);
    }

    /**
     *
     * @param {string} userId
     * @param {number} xp
     * @param {number} level
     */
    setLevelXP(userId, xp, level) {
        if (!this.getLevel(userId)) {
            this.sql.prepare('INSERT INTO levels VALUES (?, ?, ?);').run(userId, xp, 1);
        }
        else {
            this.sql.prepare('UPDATE levels SET xp = ?, level = ? WHERE user_id = ?;').run(xp, level, userId);
        }
    }
}

module.exports = Database;