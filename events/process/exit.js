const { Client, WebhookClient } = require('discord.js');

/**
 * @param {Client} client
 */

module.exports = (client, code) => {
    try {
        client.db.close();
        client.destroy();
    } catch (error) { }
};