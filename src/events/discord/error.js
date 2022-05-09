/**
 * @param {import('../../Bot')} client
 * @param {Error} error
 */

module.exports = async (client, error) => {
    client.logger.error(error);
};