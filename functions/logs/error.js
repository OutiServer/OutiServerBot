const { Message, WebhookClient } = require("discord.js");

module.exports = {

    /**
     * エラーログ出力用
     * @param {Message} message 
     * @param {*} error
     */

    errorlog: async function (message, error) {
        console.error(error);
        try {
            const webhook = new WebhookClient('852833626860945438', 'IaO4hTwc0Audu7FD6p2RfrisM9xvPICLlaCr1JM0pHPP7YpuxWxc8QcvjEHDBWA5eA-4');
            await webhook.send('<@' + process.env.OWNERID + '>\n```\n' + error.stack + '\n```', { split: true });
            await message.channel.send('コマンド実行中にエラーが発生したみたいや、もう一度実行してな。😉');
        }
        catch (error) {
            console.error(error);
        }
    },

    /**
     * エラーログ出力用
     * @param {string} channelid
     * @param {*} error
     */

    clienterrorlog: async function (error) {
        console.error(error);
        try {
            const webhook = new WebhookClient('852833626860945438', 'IaO4hTwc0Audu7FD6p2RfrisM9xvPICLlaCr1JM0pHPP7YpuxWxc8QcvjEHDBWA5eA-4');
            await webhook.send('<@' + process.env.OWNERID + '>\n```\n' + error.stack + '\n```', { split: true });
        }
        catch (error) {
            console.error(error);
        }
    }
}