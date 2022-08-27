const status = require('../../../dat/json/status.json');
const { ActivityType } = require('discord.js');

/**
 * @param {import('../../Bot')} client
 */

module.exports = async (client) => {
    if (!client.isReady()) return;
    const random = Math.floor(Math.random() * status.length);
    client.user.setActivity({ name: status[random].name, type: ActivityType.Playing });
    client.user.setStatus('online');
};