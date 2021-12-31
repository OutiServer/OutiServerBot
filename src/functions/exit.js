const { clienterrorlog } = require('./error');

/**
 * 終了関数
 * @param {import('../utils/Bot')} client
 */
module.exports = (client) => {
    try {
        client.db.close();
        client.destroy();
        process.exit();
    }
    catch (error) {
        clienterrorlog(client, error);
    }
};