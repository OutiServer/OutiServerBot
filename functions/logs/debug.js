const { WebhookClient } = require("discord.js");
const { clienterrorlog } = require('./error');

/**
 * デバッグ出力用
 * @param {string} info 
 */

module.exports = async (info) => {
    try {
        const webhook = new WebhookClient('856886037703557140', 'OWEgXnHeY8S1HAf2FumMHWkRXtxCBvnbtc1p7WY9lvGl6S7xYLYueRzKokir_ffeHLl3');
        await webhook.send('```' + info + '```');
    } catch (error) {
        clienterrorlog(error);
    }
}