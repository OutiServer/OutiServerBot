const bot = require('../../utils/Bot');
const { clienterrorlog } = require('../../functions/logs/error');

/**
 * @param {bot} client
 */

module.exports = (client, code) => {
    try {
        client.db.close();
        client.destroy();
    }
    catch (error) {
        clienterrorlog(client, error);
    }
};