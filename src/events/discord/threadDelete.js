const { clienterrorlog } = require('../../functions/error');

/**
 *
 * @param {import('../../utils/Bot')} client
 * @param {import('discord.js').ThreadChannel} thread
 */
module.exports = async (client, thread) => {
    try {
        client.db.prepare('DELETE FROM threads WHERE threadid = ?;').run(thread.id);
    }
    catch (error) {
        clienterrorlog(client, error);
    }
};