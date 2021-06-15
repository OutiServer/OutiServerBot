const { Client } = require('discord.js');
const status = require('../../dat/json/status.json');
const { clienterrorlog } = require('../../functions/logs/error');

/**
 * @param {Client} client
 */

module.exports = async (client) => {
    try {
        let random = Math.floor(Math.random() * status.length);
        client.user.setPresence({ activity: { name: status[random].name, type: status[random].playingtype }, status: 'online' });
    } catch (error) {
        clienterrorlog(error);
    }
};