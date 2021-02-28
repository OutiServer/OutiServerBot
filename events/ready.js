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
      client.guilds.cache.get('775952658779209770').channels.create(time, { parent: '815547487506137129', position: 0, type: 'text' })
        .then(channel => {
          channel.send(new MessageAttachment(`${time}.db`));
        });
    });

  const handleReaction = async (channelID, messageID, callback) => {
    const channel = await client.channels.fetch(channelID);
    const message = await channel.messages.fetch(messageID);
    const collector = message.createReactionCollector(() => true);
    collector.on('collect', (reaction, user) => callback(reaction, user));
  }

  handleReaction('774594290679545886', '794246738881019915', async (reaction, user) => {
    if (reaction.emoji.id === '790538555407597590') {
      if (reaction.message.guild.member(user).roles.cache.has('717326376516190221')) {
        reaction.message.guild.member(user).roles.remove('717326376516190221');
        const reply = await client.channels.cache.get('774594290679545886').send(`${user} 必殺絵文字人を剥奪しました`);
        reply.delete({ timeout: 5000 });
      }
      else {
        reaction.message.guild.member(user).roles.add('717326376516190221');
        const reply = await client.channels.cache.get('774594290679545886').send(`${user} 必殺絵文字人を付与しました`);
        reply.delete({ timeout: 5000 });
      }
    }
    else if (reaction.emoji.id === '774598967459446784') {
      if (reaction.message.guild.member(user).roles.cache.has('774593459034128395')) {
        reaction.message.guild.member(user).roles.remove('774593459034128395');
        const reply = await client.channels.cache.get('774594290679545886').send(`${user} among us crewを剥奪しました`);
        reply.delete({ timeout: 5000 });
      }
      else {
        reaction.message.guild.member(user).roles.add('774593459034128395');
        const reply = await client.channels.cache.get('774594290679545886').send(`${user} among us crewを付与しました`);
        reply.delete({ timeout: 5000 });
      }
    }
    else if (reaction.emoji.id === '790546684710223882') {
      if (reaction.message.guild.member(user).roles.cache.has('780217228649562113')) {
        reaction.message.guild.member(user).roles.remove('780217228649562113');
        const reply = await client.channels.cache.get('774594290679545886').send(`${user} 臨時お知らせを剥奪しました`);
        reply.delete({ timeout: 5000 });
      }
      else {
        reaction.message.guild.member(user).roles.add('780217228649562113');
        const reply = await client.channels.cache.get('774594290679545886').send(`${user} 臨時お知らせを付与しました\n10分後自動で剥奪します`);
        reply.delete({ timeout: 5000 });
        setTimeout(() => {
          reaction.message.guild.member(user).roles.remove('780217228649562113');
        }, 600000)
      }
    }
    else if (reaction.emoji.id === '798179606166634516') {
      if (reaction.message.guild.member(user).roles.cache.has('814095138443100191')) {
        reaction.message.guild.member(user).roles.remove('814095138443100191');
        const reply = await client.channels.cache.get('774594290679545886').send(`${user} 生活要素班を剥奪しました`);
        reply.delete({ timeout: 5000 });
      }
      else {
        reaction.message.guild.member(user).roles.add('814095138443100191');
        const reply = await client.channels.cache.get('774594290679545886').send(`${user} 生活要素班を付与しました`);
        reply.delete({ timeout: 5000 });
      }
    }
    else if (reaction.emoji.id === '798179591582908446') {
      if (reaction.message.guild.member(user).roles.cache.has('814070465064599593')) {
        reaction.message.guild.member(user).roles.remove('814070465064599593');
        const reply = await client.channels.cache.get('774594290679545886').send(`${user} ミニゲーム班を剥奪しました`);
        reply.delete({ timeout: 5000 });
      }
      else {
        reaction.message.guild.member(user).roles.add('814070465064599593');
        const reply = await client.channels.cache.get('774594290679545886').send(`${user} ミニゲーム班を付与しました`);
        reply.delete({ timeout: 5000 });
      }
    }
  });

  handleReaction('802079467739676692', '802115362526330930', async (reaction, user) => {
    let usermoneydata = client.getMoney.get(user.id, '706452606918066237');
    if (!usermoneydata) {
      usermoneydata = { id: `706452606918066237 - ${user.id}`, user: user.id, guild: '706452606918066237', money: 0, dailylogin: 0, ticket: 0 }
    }
    let userdebtdata = client.getDebt.get(user.id, '706452606918066237');
    if (!userdebtdata) {
      userdebtdata = { id: `706452606918066237 - ${user.id}`, user: user.id, guild: '706452606918066237', Tuna: 0, Shoulder: null }
    }
    if (userdebtdata.Tuna === 1) {
      const reply = await client.channels.cache.get('802079467739676692').send(`${user}、お前借金返済中やん！`);
      reply.delete({ timeout: 5000 });
      return;
    }
    if (reaction.emoji.name === '0️⃣') {
      usermoneydata.ticket++;
      usermoneydata.money -= 5000;
      const reply = await client.channels.cache.get('802079467739676692').send(`${user}、うんこチケットを5000うんコインで購入しました。`);
      reply.delete({ timeout: 5000 });
    }
    client.setMoney.run(usermoneydata);
    client.setDebt.run(userdebtdata);
  });
}