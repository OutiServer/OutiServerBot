const { Client, WebhookClient } = require('discord.js');

/**
 * @param {Client} client
 */

module.exports = (client, reason, promise) => {
    console.error(reason);
    try {
        const webhook = new WebhookClient('847786776420286467', 'YgM-ObvRhgw_q0aKQuzJVnTDCE0jzTaiP4Qb8VgonBJVa2BLj_bt9FuvVsFKjr63nUkv');
        webhook.send(`<@${process.env.OWNERID}>`);
        webhook.send(reason.stack, { code: true, split: true });
    } catch (error) { }
};