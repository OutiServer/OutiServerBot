/**
 *
 * @param {import('../../Bot')} client
 * @param {import('discord.js').ThreadChannel} thread
 */
module.exports = async (client, thread) => {
    client.db.prepare('DELETE FROM threads WHERE threadid = ?;').run(thread.id);
};