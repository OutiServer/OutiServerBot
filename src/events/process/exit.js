const { clienterrorlog } = require('../../functions/error');

/**
 * @param {bot} client
 */
module.exports = (client, code) => {
    try {
        console.log(`おうち鯖Botはコード${code}で終了しました`);
        client.db.close();
        client.destroy();
    }
    catch (error) {
        clienterrorlog(client, error);
    }
};