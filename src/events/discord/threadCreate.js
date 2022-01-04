const { clienterrorlog } = require('../../functions/error');

/**
 *
 * @param {import('../../utils/Bot')} client
 * @param {import('discord.js').ThreadChannel} thread
 */
module.exports = async (client, thread) => {
    try {
        client.db.prepare('INSERT INTO threads VALUES (?);').run(thread.id);
    }
    catch (error) {
        clienterrorlog(client, error);
    }
};