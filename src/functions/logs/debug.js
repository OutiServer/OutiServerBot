const { codeBlock } = require('@discordjs/builders');
const { WebhookClient } = require('discord.js');
const Bot = require('../../utils/Bot');
const { clienterrorlog } = require('./error');

/**
 * デバッグ出力用
 * @param {Bot} client
 * @param {string} info
 */

module.exports = async (client, info) => {
    try {
        if (!client.user) return;
        const webhook = new WebhookClient({ url: 'https://discord.com/api/webhooks/873218671063998464/FUEOTnUoNisLELgp5u8LOMwFVVBf5mhN-IOYPu8N28ambp7EDV5Icg5LLoxSv1AcJBJJ' });
        await webhook.send({
            content: codeBlock(info),
            username: `${client.user.username}-デバッグログ`,
            avatarURL: client.user.avatarURL({ format: 'webp' }),
        });
    }
    catch (error) {
        clienterrorlog(client, error);
    }
};