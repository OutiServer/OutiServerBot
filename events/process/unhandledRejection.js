const { codeBlock, userMention } = require('@discordjs/builders');
const { WebhookClient } = require('discord.js');
const Bot = require('../../Utils/Bot');

/**
 * @param {Bot} client 
 * @param {Error} error 
 * @param {Promise} promise 
 */
module.exports = async (client, error, promise) => {
    console.error(error);
    try {
        if (!client.user) return;
        const webhook = new WebhookClient({ url: 'https://discord.com/api/webhooks/873217393407713341/lWLnKOWbXQKuULgw83jmeiuphfH9AqYU6y1RLPJqxp2Qov6nQDULKsUVWS7BbL5XcyIq' });
        await webhook.send({
            content: `${userMention(process.env.OWNERID)}\n${codeBlock(error.stack)}`,
            avatarURL: client.user.avatarURL({ format: 'webp' }),
            username: `${client.user.username}-エラーログ`
        });
    }
    catch (error) {
        console.error(error);
    }
};