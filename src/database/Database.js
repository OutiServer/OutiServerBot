const { Sequelize, DataTypes, Op } = require('sequelize');
const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: 'mysql',
});
const EmojiUses = require('./models/EmojiUses')(sequelize, DataTypes);
const Polls = require('./models/Polls')(sequelize, DataTypes);
const Speakers = require('./models/Speakers')(sequelize, DataTypes);
const Words = require('./models/Words')(sequelize, DataTypes);
const Levels = require('./models/Levels')(sequelize, DataTypes);

class Database {
    async close() {
        await sequelize.close();
    }

    /**
     *
     * @param {number} time
     * @returns {Array<{ id: number, user_id: string, channel_id: string, message_id: string, end_time: number | null }>}
     */
    async getEndAllPoll(time) {
        return await Polls.findAll({
            where: {
                end_time: {
                    [Op.lte]: time,
                },
            },
        });
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
    async addPoll(userId, channelId, messageId, endTime = null) {
        const data = await Polls.create({ user_id: userId, channel_id: channelId, message_id: messageId, end_time: endTime });
        return data.id;
    }

    /**
     *
     * @param {number} id
     *
     * @returns {{ id: number, user_id: string, channel_id: string, message_id: string, endtime: number | null } | null}
     */
    async getPoll(id) {
        return await Polls.findOne({ where: { id: id } });
    }

    /**
     *
     * @param {number} id
     */
    async removePoll(id) {
        await Polls.destroy({ where: { id: id } });
    }

    /**
     *
     * @param {string} userId
     * @returns {{ user_id: string, speaker_id: number } | null}
     */
    async getSpeaker(userId) {
        return await Speakers.findOne({ where: { user_id: userId } });
    }

    /**
     *
     * @param {string} userid
     * @param {number} speakerId
     */
    async setSpeaker(userId, speakerId) {
        if (!(await this.getSpeaker(userId))) {
            await Speakers.create({ user_id: userId, speaker_id: speakerId });
        }
        else {
            await Speakers.update({ speaker_id: speakerId }, { where: { user_id: userId } });
        }
    }

    /**
     *
     * @param {string} emojiId
     * @returns {{ emoji_id: string, count: number } | null}
     */
    async getEmojiUseCount(emojiId) {
        return await EmojiUses.findOne({ where: { emoji_id: emojiId } });
    }

    /**
     *
     * @returns {Array<{ emoji_id: string, count: number }>}
     */
    async getAllEmojiUseCount() {
        return await EmojiUses.findAll({
            order: [
                ['count', 'DESC'],
            ],
            limit: 10,
        });
    }

    /**
     *
     * @param {string} emojiId
     * @param {number} count
     */
    async addEmojiUseCount(emojiId, count) {
        if (!(await this.getEmojiUseCount(emojiId))) {
            await EmojiUses.create({ emoji_id: emojiId, count: count });
        }
        else {
            const data = await this.getEmojiUseCount(emojiId);
            await EmojiUses.update({ count: data.count + count }, { where: { emoji_id: emojiId } });
        }
    }

    /**
     *
     * @param {string} word
     * @returns {{ id: number, word: string, replace_word: string }}
     */
    async getWord(word) {
        return await Words.findOne({ where: { word: word } });
    }

    /**
     * @returns {Array<{ id: number, word: string, replace_word: string }>}
     */
    async getAllWord() {
        return await Words.findAll();
    }

    /**
     *
     * @param {string} word
     * @param {string} replaceWord
     */
    async addWord(word, replaceWord) {
        if ((await this.getWord(word))) return await this.updateWord(word, replaceWord);

        await Words.create({ word: word, replace_word: replaceWord });
    }

    /**
     *
     * @param {string} word
     * @param {string} replaceWord
     */
    async updateWord(word, replaceWord) {
        if (!(await this.getWord(word))) return await this.addWord(word, replaceWord);

        await Words.update({ replace_word: replaceWord }, { where: { word: word } });
    }

    /**
     *
     * @param {string} word
     */
    async deleteWord(word) {
        if (!(await this.getWord(word))) return;

        await Words.destroy({ where: { word: word } });
    }

    /**
     *
     * @param {string} userId
     * @returns {{ user_id: string, xp: number, level: number, all_xp: number } | null}
     */
    async getLevel(userId) {
        return await Levels.findOne({ where: { user_id: userId } });
    }

    /**
     *
     * @param {string} userId
     * @param {number} xp
     * @param {number} level
     * @param {number} allXP
     */
    async setLevelXP(userId, xp, level, allXP) {
        if (!(await this.getLevel(userId))) {
            await Levels.create({ user_id: userId, xp: xp, level: 1, all_xp: xp });
        }
        else {
            await Levels.update({ xp: xp, level: level, all_xp: allXP }, { where: { user_id: userId } });
        }
    }

    /**
     *
     * @returns {Array<{ user_id: string, xp: number, level: number, all_xp: number }>}
     */
    async getLevelTop() {
        return await Levels.findAll({
            order: [
                ['all_xp', 'DESC'],
            ],
            limit: 10,
        });
    }
}

module.exports = Database;