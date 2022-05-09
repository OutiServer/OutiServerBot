/**
 *
 * @param {import('../../Bot')} client
 * @param {import('discord.js').ThreadChannel} thread
 */
module.exports = async (client, thread) => {
    client.db.prepare('INSERT INTO threads VALUES (?);').run(thread.id);
};