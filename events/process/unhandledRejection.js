const { WebhookClient } = require('discord.js');

module.exports = async (client, error, promise) => {
    console.error(error);
    try {
        const webhook = new WebhookClient('854278904734679040', 'l8qFXW_jluXqflEtrXJwxd_L93MvwB7FuTXv5dthwFrbn5T-n_BJfg2QmCcv1gxZe35I');
        await webhook.send('<@' + process.env.OWNERID + '>\n```\n' + error.stack + '\n```', { split: true });
    }
    catch (error) {
        console.error(error);
    }
};