const { codeBlock } = require('@discordjs/builders');
const { WebhookClient } = require('discord.js');

module.exports = async (client, error, promise) => {
    console.error(error);
    try {
        const webhook = new WebhookClient({ url: 'https://discord.com/api/webhooks/873217393407713341/lWLnKOWbXQKuULgw83jmeiuphfH9AqYU6y1RLPJqxp2Qov6nQDULKsUVWS7BbL5XcyIq' });
        await webhook.send(codeBlock(error.stack));
    }
    catch (error) {
        console.error(error);
    }
};