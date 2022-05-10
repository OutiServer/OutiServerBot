/**
 * @param {import('../../Bot')} client
 * @param {string} info
 */

module.exports = async (client, info) => {
    client.logger.warn(info);
};