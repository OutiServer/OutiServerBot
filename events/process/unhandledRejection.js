const { Client, WebhookClient } = require('discord.js');

/**
 * @param {Client} client
 */

module.exports = (client, reason, promise) => {
    console.error(reason);
    try {
        const webhook = new WebhookClient('835744870114656256', '4YsFlIYycw-n_SvDq6awAQCobZ6n9CCo8IqzlZa4NiYhXvhlXLk1OSrx_BoEkf99cSqv');
        webhook.send(reason.stack, { code: true, split: true });
    } catch (error) { }
};