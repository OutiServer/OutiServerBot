const { Client, MessageAttachment } = require('discord.js');
const { clienterrorlog } = require('../../functions/error');

/**
 * @param {Client} client
 */

module.exports = (client) => {
    try {
        const time = new Date();
        client.db.backup(`dat/backup/${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`)
            .then(() => client.channels.cache.get('816555488694108170').send(new MessageAttachment(`dat/backup/${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`)))
    } catch (error) {
        clienterrorlog(client, error);
    }
};