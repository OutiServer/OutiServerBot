var start_ms = new Date().getTime();
require('dotenv').config();
const { Client, MessageEmbed } = require('discord.js');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./unkoserver.db');

/**
 * @param {Client} client
 */

module.exports = async (client) => {
  const Moneytable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'moneys';").get();
  if (!Moneytable['count(*)']) {
    sql.prepare("CREATE TABLE moneys (id TEXT PRIMARY KEY, user TEXT, guild TEXT, money INTEGER, dailylogin INTEGER);").run();
    sql.prepare("CREATE UNIQUE INDEX idx_moneys_id ON moneys (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }
  client.getMoney = sql.prepare("SELECT * FROM moneys WHERE user = ? AND guild = ?");
  client.setMoney = sql.prepare("INSERT OR REPLACE INTO moneys (id, user, guild, money, dailylogin) VALUES (@id, @user, @guild, @money, @dailylogin);");
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
  const cointosssettingtable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'cointosssettings';").get();
  if (!cointosssettingtable['count(*)']) {
    sql.prepare("CREATE TABLE cointosssettings (id TEXT PRIMARY KEY, user TEXT, guild TEXT, magnification INTEGER, dividend INTEGER);").run();
    sql.prepare("CREATE UNIQUE INDEX idx_cointosssettings_id ON cointosssettings (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }
  client.getCointosssettings = sql.prepare("SELECT * FROM cointosssettings WHERE user = ? AND guild = ?");
  client.setCointosssettings = sql.prepare("INSERT OR REPLACE INTO cointosssettings (id, user, guild, magnification, dividend) VALUES (@id, @user, @guild, @magnification, @dividend);");
  const handleReaction = async (channelID, messageID, callback) => {
    const channel = await client.channels.fetch(channelID);
    const message = await channel.messages.fetch(messageID);
    const collector = message.createReactionCollector(() => true);
    collector.on('collect', (reaction, user) => callback(reaction, user));
  }
  var elapsed_ms = new Date().getTime() - start_ms;
  console.log(`[INFO] Logged in as ${client.user.tag}\n再起動にかかった時間: ${Math.floor(elapsed_ms / 1000)}秒`);
  client.user.setPresence({ activity: { name: `${process.env.PREFIX}help うんこ鯖` }, status: 'online' });
  handleReaction('774594290679545886', '794246738881019915', async (reaction, user) => {
    if (reaction.emoji.id === '790538555407597590') {
      if(reaction.message.guild.member(user).roles.cache.has('717326376516190221')){
        reaction.message.guild.member(user).roles.remove('717326376516190221'); 
        const reply = await client.channels.cache.get('774594290679545886').send(`${user} 必殺絵文字人を剥奪しました`);
        reply.delete({ timeout: 5000 });
      }
      else{
        reaction.message.guild.member(user).roles.add('717326376516190221');
        const reply = await client.channels.cache.get('774594290679545886').send(`${user} 必殺絵文字人を付与しました`);
        reply.delete({ timeout: 5000 });
      }
   }
    else if (reaction.emoji.id === '774598967459446784') {
        if(reaction.message.guild.member(user).roles.cache.has('774593459034128395')){
          reaction.message.guild.member(user).roles.remove('774593459034128395');
          const reply = await client.channels.cache.get('774594290679545886').send(`${user} among us crewを剥奪しました`);
          reply.delete({ timeout: 5000 });
        }
        else{
          reaction.message.guild.member(user).roles.add('774593459034128395');
          const reply = await client.channels.cache.get('774594290679545886').send(`${user} among us crewを付与しました`);
          reply.delete({ timeout: 5000 });
        }
    }
    else if (reaction.emoji.id === '790546684710223882') {
      if(reaction.message.guild.member(user).roles.cache.has('780217228649562113')){
        reaction.message.guild.member(user).roles.remove('780217228649562113');
        const reply = await client.channels.cache.get('774594290679545886').send(`${user} 臨時お知らせを剥奪しました`);
        reply.delete({ timeout: 5000 });
      }
      else{
        reaction.message.guild.member(user).roles.add('780217228649562113');
        const reply = await client.channels.cache.get('774594290679545886').send(`${user} 臨時お知らせを付与しました\n10分後自動で剥奪します`);
        reply.delete({ timeout: 5000 });
        setTimeout(() => {
          reaction.message.guild.member(user).roles.remove('780217228649562113');
        }, 600000)
      }
    }
  })
  let slotsettingsdata = client.getSlotsettings.get('706452606918066237');
  if (!slotsettingsdata) {
    slotsettingsdata　= { id: `706452606918066237`, guild: '706452606918066237', Jackpotprobability: 10, Jackpot: 100000 }
  }
  let Win = slotsettingsdata.Jackpot;
  let embed = new MessageEmbed()
  .setDescription(`現在のジャックポット: ${Win}うんコイン`)
  .setColor('RANDOM')
  .setTimestamp();
  let top10 = sql.prepare("SELECT * FROM moneys WHERE guild = ? ORDER BY money DESC LIMIT 10;").all('706452606918066237');
  let rank = 1;
  for(const data of top10){
    const user = client.guilds.cache.get('706452606918066237').member(data.user);
    let usertag = ''
    if(!user){
      usertag = '取得できないユーザー';
    }
    else{
      usertag = user.user.tag;
    }
    embed.addFields({ name: `${rank}位: ${usertag}`, value: `${data.money}うんコイン` });
    rank++;
  }
  let jackpotmessage = await client.channels.cache.get('798479605764718592').send(embed);
  client.setSlotsettings.run(slotsettingsdata);
  setInterval(() => {
    Win = client.getSlotsettings.get('706452606918066237').Jackpot;
    embed = new MessageEmbed()
    .setDescription(`現在のジャックポット: ${Win}うんコイン`)
    .setColor('RANDOM')
    .setTimestamp();
    top10 = sql.prepare("SELECT * FROM moneys WHERE guild = ? ORDER BY money DESC LIMIT 10;").all('706452606918066237');
    rank = 1;
    for(const data of top10){
      const user = client.guilds.cache.get('706452606918066237').member(data.user);
      let usertag = ''
      if(!user){
        usertag = '取得できないユーザー';
      }
      else{
        usertag = user.user.tag;
      }
      embed.addFields({ name: `${rank}位: ${usertag}`, value: `${data.money}うんコイン` });
      rank++;
    }
    jackpotmessage.edit(embed);
  }, 60000);
}