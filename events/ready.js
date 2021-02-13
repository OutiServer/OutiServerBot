const { Client, MessageEmbed } = require('discord.js');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./unkoserver.db');

/**
 * @param {Client} client
 */

module.exports = async (client) => {
  console.log(`[INFO] Logged in as ${client.user.tag}`);
  client.user.setPresence({ activity: { name: `${process.env.PREFIX}help うんこ鯖` }, status: 'idle' });
}