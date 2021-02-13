const { Client } = require('discord.js');

/**
 * @param {Client} client
 */

module.exports = async (client) => {
  console.log(`[INFO] Logged in as ${client.user.tag}`);
  client.user.setPresence({ activity: { name: `${process.env.PREFIX}help うんこ鯖` }, status: 'idle' });
}