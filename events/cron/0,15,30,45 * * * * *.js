const bot = require('../../Utils/Bot');
const status = require('../../dat/json/status.json');
const { clienterrorlog } = require('../../functions/logs/error');

/**
 * @param {bot} client
 */

module.exports = async (client) => {
    try {
        const random = Math.floor(Math.random() * status.length);
        client.user.setPresence({ activity: { name: status[random].name, type: status[random].playingtype }, status: 'online' });
    } catch (error) {
        clienterrorlog(error);
    }
};