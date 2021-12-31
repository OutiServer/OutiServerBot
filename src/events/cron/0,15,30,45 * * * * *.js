const status = require('../../../dat/json/status.json');
const { clienterrorlog } = require('../../functions/error');

/**
 * @param {import('../../utils/Bot')} client
 */

module.exports = async (client) => {
    try {
        if (!client.user) return;
        const random = Math.floor(Math.random() * status.length);
        client.user.setPresence({ activity: { name: status[random].name, type: status[random].playingtype }, status: 'online' });
        client.user.setStatus('online');
        client.user.setActivity({ name: status[random].name, type: status[random].playingtype, url: 'https://www.youtube.com/watch?v=3_S-ANkSr60' });
    }
    catch (error) {
        clienterrorlog(client, error);
    }
};