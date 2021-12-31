/**
 * @param {import('../../utils/Bot')} client
 */

const { clienterrorlog } = require('../../functions/error');

module.exports = (client) => {
    try {
        process.exit();
    }
    catch (error) {
        clienterrorlog(client, error);
    }
};