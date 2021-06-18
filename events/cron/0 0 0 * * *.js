const { Client, MessageAttachment, WebhookClient } = require('discord.js');
const { clienterrorlog } = require('../../functions/logs/error');

/**
 * @param {Client} client
 */

module.exports = async (client) => {
    try {
        const time = new Date();
        await client.db.backup(`dat/backup/${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}.backup.db`)
        const webhook = new WebhookClient('852840714521411604', '9IhMrBLifqKO2WQ5k8jQAasJv8t2FNGfZyxDNzAOdegWTejMDPkhWuTApN7g6WfOD1UI');
        await webhook.send(new MessageAttachment(`dat/backup/${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}.backup.db`));

        client.channels.cache.get('774594290679545886').messages.fetch('794246738881019915')
            .then(msg => msg.reactions.removeAll())
            .then(msg => msg.react('852517396224278529'))
            .then(react => react.message.react('852517397020934166'))
            .then(react => react.message.react('810436146261131306'))
            .then(react => react.message.react('852517399604494367'));

        client.channels.cache.get('821686383605055508').messages.fetch('821726639443673089')
            .then(msg => msg.reactions.removeAll())
            .then(msg => msg.react('🎫'));
    } catch (error) {
        clienterrorlog(error);
    }
};