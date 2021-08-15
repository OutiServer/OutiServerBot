const { WebhookClient } = require("discord.js");
const { clienterrorlog } = require('./error');

/**
 * デバッグ出力用
 * @param {string} info 
 */

module.exports = async (info) => {
    try {
        const webhook = new WebhookClient({ url: 'https://discord.com/api/webhooks/873218671063998464/FUEOTnUoNisLELgp5u8LOMwFVVBf5mhN-IOYPu8N28ambp7EDV5Icg5LLoxSv1AcJBJJ' });
        await webhook.send('```' + info + '```');
    } catch (error) {
        clienterrorlog(error);
    }
}