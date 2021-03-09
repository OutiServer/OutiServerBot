const { Client, MessageAttachment } = require('discord.js');
const { Database } = require('../../unko/index');
const SQLite = require("better-sqlite3");
const sql = new SQLite('unkoserver.db');
const db = new Database('unkoserver.db');

/**
 * @param {Client} client
 */

module.exports = async (client) => {
  db.Initialize();

  client.user.setPresence({ activity: { name: '?help うんこ鯖', type: 'PLAYING', url: 'https://www.youtube.com/channel/UC56TMTAn7gCqRoKWi0jnlHQ' }, status: 'online' });
  console.log(`[INFO] Logged in as ${client.user.tag}`);

  db.backup(client);

  require('../../unko/handleReaction').run(client);
};