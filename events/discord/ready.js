const { MessageEmbed, WebhookClient, MessageActionRow, MessageButton } = require('discord.js');
const bot = require('../../Utils/Bot');
const { clienterrorlog } = require('../../functions/logs/error');

/**
 * @param {bot} client
 */

module.exports = async (client) => {
  try {
    const webhook = new WebhookClient({ url: 'https://discord.com/api/webhooks/873217805510660118/qdLg3kXXS54w7gBUcngVblLXfqB2yxRNTY7d3CNBxzCDWxVi4BSOzuE8aIi7u9qwdYw0' });
    await webhook.send({
      embeds: [
        new MessageEmbed()
          .setTitle(`${client.user.tag}が起動しました！`)
          .setDescription('```\nBotが認識できるユーザー数: ' + client.users.cache.size + '人\nBotが認識できるチャンネル: ' + client.channels.cache.size + '個\n```')
          .setColor('RANDOM')
          .setTimestamp()
      ]
    });

    const Leveltable = client.db.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'levels';").get();
    if (!Leveltable['count(*)']) {
      client.db.prepare("CREATE TABLE levels (id TEXT PRIMARY KEY, user TEXT, guild TEXT, level INTEGER, xp INTEGER, allxp INTEGER);").run();
      client.db.prepare("CREATE UNIQUE INDEX idx_levels_id ON levels (id);").run();
      client.db.pragma("synchronous = 1");
      client.db.pragma("journal_mode = wal");
    }

    const Inquirytable = client.db.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'inquirys';").get();
    if (!Inquirytable['count(*)']) {
      client.db.prepare("CREATE TABLE inquirys (id INTEGER PRIMARY KEY AUTOINCREMENT, userid TEXT, channelid TEXT);").run();
      client.db.prepare("CREATE UNIQUE INDEX idx_inquirys_id ON inquirys (id);").run();
      client.db.pragma("synchronous = 1");
      client.db.pragma("journal_mode = wal");
    }

    const Rankimagetable = client.db.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'rankimages';").get();
    if (!Rankimagetable['count(*)']) {
      client.db.prepare("CREATE TABLE rankimages (id TEXT PRIMARY KEY, user TEXT, barcolor TEXT);").run();
      client.db.prepare("CREATE UNIQUE INDEX idx_rankimages_id ON rankimages (id);").run();
      client.db.pragma("synchronous = 1");
      client.db.pragma("journal_mode = wal");
    }

    const Verifytable = client.db.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'verifys';").get();
    if (!Verifytable['count(*)']) {
      client.db.prepare("CREATE TABLE verifys (id TEXT PRIMARY KEY, user TEXT, verifynumber INTEGER);").run();
      client.db.prepare("CREATE UNIQUE INDEX idx_verifys_id ON verifys (id);").run();
      client.db.pragma("synchronous = 1");
      client.db.pragma("journal_mode = wal");
    }

    const Threadtable = client.db.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'threads';").get();
    if (!Threadtable['count(*)']) {
      client.db.prepare("CREATE TABLE threads (id INTEGER PRIMARY KEY AUTOINCREMENT, userid TEXT, channelid TEXT);").run();
      client.db.prepare("CREATE UNIQUE INDEX idx_threads_id ON threads (id);").run();
      client.db.pragma("synchronous = 1");
      client.db.pragma("journal_mode = wal");
    }

    client.user.setPresence({ activity: { name: '再起動しました', type: 'PLAYING' }, status: 'dnd' });
    console.log(`Logged in as ${client.user.tag}`);
  } catch (error) {
    clienterrorlog(error);
  }
};