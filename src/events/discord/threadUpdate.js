const { clienterrorlog } = require('../../functions/error');

/**
 *
 * @param {import('../../utils/Bot')} client
 * @param {import('discord.js').ThreadChannel} oldThread
 * @param {import('discord.js').ThreadChannel} newThread
 */
module.exports = async (client, oldThread, newThread) => {
    try {
        // ロックされてない & dbにデータのあるスレッドがアーカイブされた
        if (!oldThread.archived && newThread.archived && !newThread.locked && client.db.prepare('SELECT FROM threads WHERE threadid = ?;').get(newThread.id)) {
            newThread.setArchived(false, '自動アーカイブ解除');
        }
    }
    catch (error) {
        clienterrorlog(client, error);
    }
};