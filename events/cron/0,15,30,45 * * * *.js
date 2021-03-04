const { Client } = require('discord.js');
const status = require(__dirname + '/dat/status.json');

/**
 * @param {Client} client
 */

module.exports = (client) => {
    let random = Math.floor(Math.random() * status.length);
    client.user.setPresence({ activity: { name: status[random].name, type: status[random].playingtype }, status: 'online' });
};