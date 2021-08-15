const { MessageAttachment, WebhookClient } = require('discord.js');
const bot = require('../../Utils/Bot');
const { clienterrorlog } = require('../../functions/logs/error');

/**
 * @param {bot} client
 */

module.exports = async (client) => {
    try {
        const time = new Date();
        await client.db.backup(`dat/backup/${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}.backup.db`)
        const webhook = new WebhookClient({ url: 'https://discord.com/api/webhooks/873218423046438963/U4pTYyBcCBOUec0EikfeI8eWPJenfKEmkIwlR-mvZdy_RJcQP64gUPFYQoK2l4-4hUAo' });
        await webhook.send({
            files: [
                new MessageAttachment(`dat/backup/${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}.backup.db`)
            ]
        });

    } catch (error) {
        clienterrorlog(error);
    }
};