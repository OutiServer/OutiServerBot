/**
 * @param {import('../../Bot')} client
 */
module.exports = async (client, code) => {
    client.speakers.forEach(speaker => {
        speaker.stop();
    });
    await client.database.close();
    client.destroy();
    client.logger.info(`おうち鯖Botはコード${code}で終了しました`);
};