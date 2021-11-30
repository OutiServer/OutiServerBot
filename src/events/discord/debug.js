const bot = require('../../Utils/Bot');
const debug = require('../../functions/logs/debug');

/**
 * @param {bot} client
 * @param {string} info
 */

module.exports = async (client, info) => {
    console.debug(info);
    debug(client, `デバッグ:\n${info}`);
};