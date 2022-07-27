/**
 * @param {import('../../Bot')} client
 */

const { ActivityType } = require('discord.js');

module.exports = async (client) => {
  client.user.setStatus('online');
  client.user.setActivity({ name: '再起動しました', type: ActivityType.Playing });
  client.logger.info(`Logged in as ${client.user.tag}`);
};