const { Client } = require('discord.js');

/**
 * 終了関数
 * @param {Client} client 
 */

module.exports = (client) => {
    client.db.close();
    client.destroy();
    process.exit();
}