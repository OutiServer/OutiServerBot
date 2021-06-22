const { MessageAttachment, WebhookClient } = require('discord.js');
const bot = require('../../bot');
const { clienterrorlog } = require('../../functions/logs/error');

/**
 * @param {bot} client
 */

module.exports = async (client) => {
    try {
        const time = new Date();
        await client.db.backup(`dat/backup/${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}.backup.db`)
        const webhook = new WebhookClient('852840714521411604', '9IhMrBLifqKO2WQ5k8jQAasJv8t2FNGfZyxDNzAOdegWTejMDPkhWuTApN7g6WfOD1UI');
        await webhook.send(new MessageAttachment(`dat/backup/${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}.backup.db`));

        const rolepanel = await client.channels.cache.get('774594290679545886').messages.fetch('794246738881019915');
        await rolepanel.reactions.removeAll();
        await rolepanel.react('852517396224278529');
        await rolepanel.react('852517397020934166');
        await rolepanel.react('810436146261131306');
        await rolepanel.react('852517399604494367');

        const contactpanel = await client.channels.cache.get('821686383605055508').messages.fetch('821726639443673089');
        contactpanel.reactions.removeAll();
        contactpanel.react('🎫');

    } catch (error) {
        clienterrorlog(error);
    }
};