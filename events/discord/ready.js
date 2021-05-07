const { Client } = require('discord.js');
const { clienterrorlog } = require('../../functions/error');

/**
 * @param {Client} client
 */

module.exports = async (client) => {
  try {
    const Leveltable = client.db.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'levels';").get();
    if (!Leveltable['count(*)']) {
      client.db.prepare("CREATE TABLE levels (id TEXT PRIMARY KEY, user TEXT, guild TEXT, level INTEGER, xp INTEGER, allxp INTEGER);").run();
      client.db.prepare("CREATE UNIQUE INDEX idx_levels_id ON levels (id);").run();
      client.db.pragma("synchronous = 1");
      client.db.pragma("journal_mode = wal");
    }

    const ServerSettingtable = client.db.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'serversettings';").get();
    if (!ServerSettingtable['count(*)']) {
      client.db.prepare("CREATE TABLE serversettings (id TEXT PRIMARY KEY, guild TEXT, ticketid INTEGER, serverjoindedcase INTEGER);").run();
      client.db.prepare("CREATE UNIQUE INDEX idx_serversettings_id ON serversettings (id);").run();
      client.db.pragma("synchronous = 1");
      client.db.pragma("journal_mode = wal");
    }

    const Rankimagetable = client.db.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'rankimages';").get();
    if (!Rankimagetable['count(*)']) {
      client.db.prepare("CREATE TABLE rankimages (id TEXT PRIMARY KEY, user TEXT, font INTEGER, fillStyle TEXT, imagex INTEGER, imagey INTEGER, icon INTEGER, defaultimagex INTEGER, defaultimagey INTEGER);").run();
      client.db.prepare("CREATE UNIQUE INDEX idx_rankimages_id ON rankimages (id);").run();
      client.db.pragma("synchronous = 1");
      client.db.pragma("journal_mode = wal");
    }

    const Todolisttable = client.db.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'todolists';").get();
    if (!Todolisttable['count(*)']) {
      client.db.prepare("CREATE TABLE todolists (id TEXT PRIMARY KEY, user TEXT, title TEXT, description TEXT);").run();
      client.db.prepare("CREATE UNIQUE INDEX idx_todolists_id ON todolists (id);").run();
      client.db.pragma("synchronous = 1");
      client.db.pragma("journal_mode = wal");
    }

    const Gamertagtable = client.db.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'gamertags';").get();
    if (!Gamertagtable['count(*)']) {
      client.db.prepare("CREATE TABLE gamertags (id TEXT PRIMARY KEY, user TEXT, tag TEXT);").run();
      client.db.prepare("CREATE UNIQUE INDEX idx_gamertags_id ON gamertags (id);").run();
      client.db.pragma("synchronous = 1");
      client.db.pragma("journal_mode = wal");
    }

    client.guilds.cache.get('706452606918066237').fetchInvites()
      .then(invites => {
        client.invites = invites;
      });

    client.user.setPresence({ activity: { name: '再起動しました', type: 'PLAYING' }, status: 'dnd' })
      .then(console.log);
    console.log(`Logged in as ${client.user.tag}`);

    require('../../handleReaction').run(client);
    require('../../server').run(client);
  } catch (error) {
    clienterrorlog(client, error);
  }
};