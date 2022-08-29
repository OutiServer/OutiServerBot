const { ActivityType } = require('discord.js');

/**
 *
 * @param {import('../../Bot')} client
 */
module.exports = async (client) => {
  client.user.setStatus('online');
  client.user.setActivity({ name: '/help おうち鯖', type: ActivityType.Playing });
  client.logger.info(`Logged in as ${client.user.tag}`);
};