/**
 * @param {import('../../Bot')} client
 */

module.exports = async (client) => {
  client.user.setStatus('online');
  client.user.setActivity({ name: '再起動しました', type: 'PLAYING' });
  client.logger.info(`Logged in as ${client.user.tag}`);
};