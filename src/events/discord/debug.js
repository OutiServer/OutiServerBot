const { codeBlock } = require('@discordjs/builders');
const { WebhookClient } = require('discord.js');

/**
 * @param {import('../../Bot')} client
 * @param {string} info
 */
module.exports = async (client, info) => {
    client.logger.debug(info);

    const webhook = new WebhookClient({ url: process.env.DEBUGLOG_WEBHOOK_URL });
    await webhook.send(codeBlock(info));
};