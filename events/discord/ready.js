const { Client, MessageAttachment } = require('discord.js');
const SQLite = require("better-sqlite3");
const sql = new SQLite('unkoserver.db');

/**
 * @param {Client} client
 */

module.exports = async (client) => {
  const Moneytable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'moneys';").get();
  if (!Moneytable['count(*)']) {
    sql.prepare("CREATE TABLE moneys (id TEXT PRIMARY KEY, user TEXT, guild TEXT, money INTEGER, dailylogin INTEGER, ticket INTEGER);").run();
    sql.prepare("CREATE UNIQUE INDEX idx_moneys_id ON moneys (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }
  client.getMoney = sql.prepare("SELECT * FROM moneys WHERE user = ? AND guild = ?");
  client.setMoney = sql.prepare("INSERT OR REPLACE INTO moneys (id, user, guild, money, dailylogin, ticket) VALUES (@id, @user, @guild, @money, @dailylogin, @ticket);");

  const Debttable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'debts';").get();
  if (!Debttable['count(*)']) {
    sql.prepare("CREATE TABLE debts (id TEXT PRIMARY KEY, user TEXT, guild TEXT, Tuna INTEGER, Shoulder TEXT);").run();
    sql.prepare("CREATE UNIQUE INDEX idx_debts_id ON debts (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }
  client.getDebt = sql.prepare("SELECT * FROM debts WHERE user = ? AND guild = ?");
  client.setDebt = sql.prepare("INSERT OR REPLACE INTO debts (id, user, guild, Tuna, Shoulder) VALUES (@id, @user, @guild, @Tuna, @Shoulder);");

  const Slotsettingstable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'slotsettings';").get();
  if (!Slotsettingstable['count(*)']) {
    sql.prepare("CREATE TABLE slotsettings (id TEXT PRIMARY KEY, guild TEXT, Jackpotprobability INTEGER, Jackpot INTEGER);").run();
    sql.prepare("CREATE UNIQUE INDEX idx_slotsettings_id ON slotsettings (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }
  client.getSlotsettings = sql.prepare("SELECT * FROM slotsettings WHERE guild = ?");
  client.setSlotsettings = sql.prepare("INSERT OR REPLACE INTO slotsettings (id, guild, Jackpotprobability, Jackpot) VALUES (@id, @guild, @Jackpotprobability, @Jackpot);");

  const Dailytable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'dailys';").get();
  if (!Dailytable['count(*)']) {
    sql.prepare("CREATE TABLE dailys (id TEXT PRIMARY KEY, user TEXT, guild TEXT, login INTEGER);").run();
    sql.prepare("CREATE UNIQUE INDEX idx_dailys_id ON dailys (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }
  client.getDaily = sql.prepare("SELECT * FROM dailys WHERE user = ? AND guild = ?");
  client.setDaily = sql.prepare("INSERT OR REPLACE INTO dailys (id, user, guild, login) VALUES (@id, @user, @guild, @login);");

  const Littlewartable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'littlewar';").get();
  if (!Littlewartable['count(*)']) {
    sql.prepare("CREATE TABLE littlewar (id TEXT PRIMARY KEY, user TEXT, guild TEXT, emoji1 INTEGER, emoji2 INTEGER, emoji3 INTEGER, number INTEGER);").run();
    sql.prepare("CREATE UNIQUE INDEX idx_littlewar_id ON littlewar (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }
  client.getLittlewar = sql.prepare("SELECT * FROM littlewar WHERE guild = ?");
  client.setLittlewar = sql.prepare("INSERT OR REPLACE INTO littlewar (id, user, guild, emoji1, emoji2, emoji3, number) VALUES (@id, @user, @guild, @emoji1, @emoji2, @emoji3, @number);");

  const Snstable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'snss';").get();
  if (!Snstable['count(*)']) {
    sql.prepare("CREATE TABLE snss (id TEXT PRIMARY KEY, user TEXT, guild TEXT, title TEXT, url TEXT, count INTEGER);").run();
    sql.prepare("CREATE UNIQUE INDEX idx_snss_id ON snss (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }
  client.getSns = sql.prepare("SELECT * FROM snss WHERE user = ? AND guild = ?");
  client.setSns = sql.prepare("INSERT OR REPLACE INTO snss (id, user, guild, title, url, count) VALUES (@id, @user, @guild, @title, @url, @count);");

  const ServerMoneytable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'servermoney';").get();
  if (!ServerMoneytable['count(*)']) {
    sql.prepare("CREATE TABLE servermoney (id TEXT PRIMARY KEY, guild TEXT, money INTEGER);").run();
    sql.prepare("CREATE UNIQUE INDEX idx_servermoney_id ON servermoney (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }
  client.getServerMoney = sql.prepare("SELECT * FROM servermoney WHERE guild = ?");
  client.setServerMoney = sql.prepare("INSERT OR REPLACE INTO servermoney (id, guild, money) VALUES (@id, @guild, @money);");

  client.user.setPresence({ activity: { name: '?help うんこ鯖', type: 'PLAYING', url: 'https://www.youtube.com/channel/UC56TMTAn7gCqRoKWi0jnlHQ' }, status: 'online' });
  console.log(`[INFO] Logged in as ${client.user.tag}`);

  const time = new Date();
  sql.backup(`${time}.db`)
    .then(() => {
      client.channels.cache.get('816555488694108170').send(new MessageAttachment(`${time}.db`));
    });

  require('./handleReaction').run(client)
};