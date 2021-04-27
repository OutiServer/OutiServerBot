const { Client, MessageAttachment } = require('discord.js');
const { clienterrorlog } = require('../../functions/error');

/**
 * @param {Client} client
 */

module.exports = (client) => {
    try {
        const time = new Date();
        client.db.backup(`dat/backup/${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`)
            .then(() => client.channels.cache.get('816555488694108170').send(new MessageAttachment(`dat/backup/${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`)));

        client.channels.cache.get('774594290679545886').messages.fetch('794246738881019915')
            .then(msg => msg.reactions.removeAll())
            .then(msg => msg.react('774598967459446784'))
            .then(react => react.message.react('790538555407597590'))
            .then(react => react.message.react('790546684710223882'))
            .then(react => react.message.react('741467052950159361'))
            .then(react => react.message.react('826629936194387988'));

        client.channels.cache.get('821686383605055508').messages.fetch('821726639443673089')
            .then(msg => msg.reactions.removeAll())
            .then(msg => msg.react('🎫'));
    } catch (error) {
        clienterrorlog(client, error);
    }
};