const { clienterrorlog } = require('../../functions/error');

/**
 * @param {import('../../utils/Bot')} client
 * @param {Error} error
 */

module.exports = async (client, error) => {
    clienterrorlog(client, error);
};