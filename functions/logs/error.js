const { Message, WebhookClient, MessageEmbed } = require("discord.js");

module.exports = {

    /**
     * エラーログ出力用
     * @param {Message} message 
     * @param {*} error
     */

    errorlog: async function (message, error) {
        console.error(error);
        try {
            const webhook = new WebhookClient({ url: 'https://discord.com/api/webhooks/873217393407713341/lWLnKOWbXQKuULgw83jmeiuphfH9AqYU6y1RLPJqxp2Qov6nQDULKsUVWS7BbL5XcyIq' });
            await webhook.send('<@' + process.env.OWNERID + '>\n```\n' + error.stack + '\n```', { split: true });
            await message.reply({
                content: 'コマンド実行中にエラーが発生したみたいや、もう一度実行してな。😉',
                embeds: [
                    new MessageEmbed()
                        .setDescription(`ErrorMessage: ${error.message}`)
                        .setColor('RANDOM')
                        .setTimestamp()
                ],
                allowedMentions: {
                    repliedUser: false
                }
            });
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
            const webhook = new WebhookClient({ url: 'https://discord.com/api/webhooks/873217393407713341/lWLnKOWbXQKuULgw83jmeiuphfH9AqYU6y1RLPJqxp2Qov6nQDULKsUVWS7BbL5XcyIq' });
            await webhook.send('<@' + process.env.OWNERID + '>\n```\n' + error.stack + '\n```', { split: true });
        }
        catch (error) {
            console.error(error);
        }
    }
}