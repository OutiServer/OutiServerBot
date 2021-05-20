const { Client, WebhookClient } = require('discord.js');

/**
 * @param {Client} client
 */

module.exports = (client, reason, promise) => {
    console.error(reason);
    try {
        const webhook = new WebhookClient('835806322938216468', 'KkEyBU0QDVaiiYNea_gCWrv4-ulyT-vnuKAT9tu7vWleO-JqFa6fCDV5H2BDvY8jQBPf');
        webhook.send(`<@${process.env.OWNERID}>`);
        webhook.send(reason.stack, { code: true, split: true });
    } catch (error) { }
};