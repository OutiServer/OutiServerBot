const { codeBlock } = require('@discordjs/builders');
const { WebhookClient } = require('discord.js');

/**
 * @param {import('../../utils/Bot')} client
 * @param {Error} error
 * @param {Promise} promise
 */
// eslint-disable-next-line no-unused-vars
module.exports = async (client, error, promise) => {
    console.error(error);
    try {
        if (!client.user) return;
        const webhook = new WebhookClient({ url: process.env.ERRORLOG_WEBHOOK_URL });
        await webhook.send({
            content: `catchされない例外が発生しました\n${codeBlock(error.stack)}`,
            avatarURL: client.user.avatarURL({ format: 'webp' }),
            username: `${client.user.username}-エラーログ`,
        });
    }
    catch (error_) {
        console.error(error_);
    }
};