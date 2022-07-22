/**
 *
 * @param {import('../../Bot')} client
 * @param {import('discord.js').ThreadChannel} oldThread
 * @param {import('discord.js').ThreadChannel} newThread
 */
module.exports = async (client, oldThread, newThread) => {
    if (!oldThread.archived && newThread.archived && !newThread.locked && newThread.parent.parentId === '972467676951752734') {
        newThread.setArchived(false, '自動アーカイブ解除');
    }
};