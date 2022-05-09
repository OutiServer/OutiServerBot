/**
 * @param {import('../../Bot')} client
 */
module.exports = (client, code) => {
    client.speakers.forEach(speaker => {
        speaker.stop();
    });
    client.db.close();
    client.destroy();
    client.logger.info(`おうち鯖Botはコード${code}で終了しました`);
};