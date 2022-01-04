const { clienterrorlog } = require('../../functions/error');

/**
 * @param {import('../../utils/Bot')} client
 */
module.exports = (client, code) => {
    try {
        client.db.close();
        client.connection?.destroy();
        client.destroy();
        console.log(`おうち鯖Botはコード${code}で終了しました`);
    }
    catch (error) {
        clienterrorlog(client, error);
    }
};