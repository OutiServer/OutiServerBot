const bot = require('../../bot');
const { clienterrorlog } = require('../../functions/logs/error');

/**
 * @param {bot} client 
 * @param {Error} error 
 */

module.exports = async (client, error) => {
    clienterrorlog(error);
}