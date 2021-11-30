const bot = require('../../Utils/Bot');
const { clienterrorlog } = require('../../functions/logs/error');

/**
 * @param {bot} client
 * @param {Error} error
 */

module.exports = async (client, error) => {
    clienterrorlog(client, error);
};