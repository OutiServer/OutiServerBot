const { Client, MessageAttachment, WebhookClient } = require('discord.js');
const { clienterrorlog } = require('../../functions/error');

/**
 * @param {Client} client
 */

module.exports = (client) => {
    try {
        const time = new Date();
        client.db.backup(`dat/backup/${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}.backup.db`)
            .then(() => {
                const webhook = new WebhookClient('847789617386094602', '7165d2iwgA9eCT3zJkJ0KaWfvlviOVpk2prQdYW0Axp2kHXin4GBUh7ZMjs0HpUYfFSk');
                webhook.send(new MessageAttachment(`dat/backup/${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}.backup.db`));
            });

        client.channels.cache.get('774594290679545886').messages.fetch('794246738881019915')
            .then(msg => msg.reactions.removeAll())
            .then(msg => msg.react('848488213580218409'))
            .then(react => react.message.react('848488215043112980'))
            .then(react => react.message.react('848488225554300929'))
            .then(react => react.message.react('848488218478641182'));

        client.channels.cache.get('821686383605055508').messages.fetch('821726639443673089')
            .then(msg => msg.reactions.removeAll())
            .then(msg => msg.react('🎫'));
    } catch (error) {
        clienterrorlog(client, error);
    }
};