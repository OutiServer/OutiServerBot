const { MessageAttachment, WebhookClient } = require('discord.js');
const { clienterrorlog } = require('../../functions/error');

/**
 * @param {import('../../Bot')} client
 */

module.exports = async (client) => {
    try {
        const time = new Date();
        await client.db.backup(`dat/backup/${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}.backup.db`);
        const webhook = new WebhookClient({ url: process.env.DATABASEBACKUP_WEBHOOK_URL });
        await webhook.send({
            files: [
                new MessageAttachment(`dat/backup/${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}.backup.db`),
            ],
        });

    }
    catch (error) {
        clienterrorlog(client, error);
    }
};