const { codeBlock } = require('@discordjs/builders');
const { WebhookClient } = require('discord.js');

/**
 * @param {import('../../Bot')} client
 * @param {Error} error
 * @param {Promise} promise
 */
// eslint-disable-next-line no-unused-vars
module.exports = async (client, error, promise) => {
    try {
        if (['Collector received no interactions before ending with reason: time'].includes(error.message)) return;

        client.logger.error(error);

        if (!client.isReady()) return;
        const webhook = new WebhookClient({ url: process.env.ERRORLOG_WEBHOOK_URL });
        await webhook.send({
            content: `catchされない例外が発生しました\n${codeBlock(error.stack)}`,
            avatarURL: client.user.avatarURL({ format: 'webp' }),
            username: `${client.user.username}-エラーログ`,
        });
    }
    catch (error_) {
        client.logger.error(error);
    }
};