const { Client } = require('discord.js');
const { Database } = require('../../unko/index');
const db = new Database('unkoserver.db');

/**
 * @param {Client} client
 */

module.exports = async (client) => {
  db.Initialize();

  client.user.setPresence({ activity: { name: '?help うんこ鯖', type: 'PLAYING' }, status: 'online' });
  console.log(`Logged in as ${client.user.tag}`);

  require('../../handleReaction').run(client);
  require('../../server').run(client);
  require('../../websocket').run(client);
};