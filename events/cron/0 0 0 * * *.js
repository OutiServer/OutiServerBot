const { Client, MessageAttachment } = require('discord.js');
const { clienterrorlog } = require('../../functions/error');

/**
 * @param {Client} client
 */

module.exports = (client) => {
    try {
        client.db.backup('backup.db')
            .then(() => client.channels.cache.get('816555488694108170').send(new MessageAttachment(`backup.db`)))
            .then(() => fs.unlinkSync('backup.db'));
    } catch (error) {
        clienterrorlog(client, error);
    }
};