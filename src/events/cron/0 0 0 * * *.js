const { WebhookClient, AttachmentBuilder } = require('discord.js');

/**
 * @param {import('../../Bot')} client
 */

module.exports = async (client) => {
    const time = new Date();
    await client.database.sql.backup(`dat/backup/${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}.backup.db`);
    const webhook = new WebhookClient({ url: process.env.DATABASEBACKUP_WEBHOOK_URL });
    await webhook.send({
        files: [
            new AttachmentBuilder(`dat/backup/${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}.backup.db`),
        ],
    });
};