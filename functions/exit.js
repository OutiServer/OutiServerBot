const bot = require('../bot');
const { clienterrorlog } = require('./logs/error');

/**
 * 終了関数
 * @param {bot} client 
 */

module.exports = (client) => {
    try {
        client.db.close();
        client.destroy();
        process.exit();
    } catch (error) {
        clienterrorlog(error);
    }
}