const { WebhookClient } = require('discord.js');
const { codeBlock } = require('@discordjs/builders');

/**
 * @param {import('../../Bot')} client
 * @param {Error} error
 */

module.exports = async (client, error) => {
    client.logger.error(error);
    if (!client.isReady()) return;

    const webhook = new WebhookClient({ url: process.env.ERRORLOG_WEBHOOK_URL });
    await webhook.send({
        content: `DiscordError\n${codeBlock(error.stack)}`,
        avatarURL: client.user.avatarURL({ format: 'webp' }),
        username: `${client.user.username}-エラーログ`,
    });
};