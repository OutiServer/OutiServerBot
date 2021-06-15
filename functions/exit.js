const { Client } = require('discord.js');
const { clienterrorlog } = require('./logs/error');

/**
 * 終了関数
 * @param {Client} client 
 */

module.exports = (client) => {
    try {
        client.db.close();
        client.destroy();
        process.exit();
    } catch (error) {
        clienterrorlog(error);
    }
}