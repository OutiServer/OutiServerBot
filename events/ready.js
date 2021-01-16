var start_ms = new Date().getTime();
require('dotenv').config();
const { Client, MessageEmbed } = require('discord.js');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./unkoserver.db');

/**
 * @param {Client} client
 */

module.exports = async (client) => {
  const keibamessage = await client.channels.cache.get('799246313341976616').messages.fetch('799635532195299358');
  const casinomessage = await client.channels.cache.get('798479605764718592').messages.fetch('799635530882744372');
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
  const Keibahorsetable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'keibahorses';").get();
  if (!Keibahorsetable['count(*)']) {
    sql.prepare("CREATE TABLE keibahorses (id TEXT PRIMARY KEY, user TEXT, guild TEXT, name TEXT, image TEXT, number INTEGER);").run();
    sql.prepare("CREATE UNIQUE INDEX idx_keibahorses_id ON keibahorses (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }
  client.getKeibahorse = sql.prepare("SELECT * FROM keibahorses WHERE user = ? AND guild = ?");
  client.setKeibahorse = sql.prepare("INSERT OR REPLACE INTO keibahorses (id, user, guild, name, image, number) VALUES (@id, @user, @guild, @name, @image, @number);");
  const Keibasettingstable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'keibasettings';").get();
  if (!Keibasettingstable['count(*)']) {
    sql.prepare("CREATE TABLE keibasettings (id TEXT PRIMARY KEY, guild TEXT, horselength INTEGER, horseentry INTEGER, participant TEXT);").run();
    sql.prepare("CREATE UNIQUE INDEX idx_keibasettings_id ON keibasettings (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }
  client.getKeibasettings = sql.prepare("SELECT * FROM keibasettings WHERE guild = ?");
  client.setKeibasettings = sql.prepare("INSERT OR REPLACE INTO keibasettings (id, guild, horselength, horseentry, participant) VALUES (@id, @guild, @horselength, @horseentry, @participant);");
  const Littlewartable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'littlewar';").get();
  if (!Littlewartable['count(*)']) {
    sql.prepare("CREATE TABLE littlewar (id TEXT PRIMARY KEY, user TEXT, guild TEXT, emoji1 INTEGER, emoji2 INTEGER, emoji3 INTEGER, number INTEGER);").run();
    sql.prepare("CREATE UNIQUE INDEX idx_littlewar_id ON littlewar (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }
  client.getLittlewar = sql.prepare("SELECT * FROM littlewar WHERE guild = ?");
  client.setLittlewar = sql.prepare("INSERT OR REPLACE INTO littlewar (id, user, guild, emoji1, emoji2, emoji3, number) VALUES (@id, @user, @guild, @emoji1, @emoji2, @emoji3, number);");
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
    else if (reaction.emoji.id === '799263454212259850') {
      if(reaction.message.guild.member(user).roles.cache.has('799253498830258208')){
        reaction.message.guild.member(user).roles.remove('799253498830258208');
        const reply = await client.channels.cache.get('774594290679545886').send(`${user} 競馬お知らせを剥奪しました`);
        reply.delete({ timeout: 5000 });
      }
      else{
        reaction.message.guild.member(user).roles.add('799253498830258208');
        const reply = await client.channels.cache.get('774594290679545886').send(`${user} 競馬お知らせを付与しました\n10分後自動で剥奪します`);
        reply.delete({ timeout: 5000 });
        setTimeout(() => {
          reaction.message.guild.member(user).roles.remove('799253498830258208');
        }, 600000)
      }
    }
  })
  let slotsettingsdata = client.getSlotsettings.get('706452606918066237');
  if (!slotsettingsdata) {
    slotsettingsdata　= { id: `706452606918066237`, guild: '706452606918066237', Jackpotprobability: 10, Jackpot: 100000 }
  }
  client.setSlotsettings.run(slotsettingsdata);
  let keibasettingsdata = client.getKeibasettings.get('706452606918066237');
  if (!keibasettingsdata) {
    keibasettingsdata　= { id: `706452606918066237`, guild: '706452606918066237', horselength: 0, horseentry: 0, participant: null }
  }
  client.setKeibasettings.run(keibasettingsdata);
  let Win = slotsettingsdata.Jackpot;
  let embed = new MessageEmbed()
  .setDescription(`現在のジャックポット: ${Win}うんコイン`)
  .setColor('RANDOM')
  .setTimestamp();
  let top10 = sql.prepare("SELECT * FROM moneys WHERE guild = ? ORDER BY money DESC LIMIT 10;").all('706452606918066237');
  let allhorse = sql.prepare("SELECT * FROM keibahorses WHERE guild = ? ORDER BY number DESC;").all('706452606918066237');
  let rank = 1;
  let allusers = '';
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
  if(keibasettingsdata.participant !== null){
    for(const data of keibasettingsdata.participant.split(/\s+/)){
      const user = client.guilds.cache.get('706452606918066237').member(data);
    if(user){
      allusers += user.user.tag+'\n';
    }
    }
  }
  let keibaembed = new MessageEmbed()
  .setTitle('うんこ競馬情報')
  .setDescription('競馬参加者\n'+allusers)
  .setColor('RANDOM')
  .setTimestamp();
  for(const data of allhorse){
    keibaembed.addFields({ name: `エントリーNO.${data.number}`, value: `${data.name}` })
  }
  
  casinomessage.edit(embed);
  keibamessage.edit(keibaembed);
  setInterval(() => {
    Win = client.getSlotsettings.get('706452606918066237').Jackpot;
    allhorse = sql.prepare("SELECT * FROM keibahorses WHERE guild = ? ORDER BY number DESC LIMIT 8;").all('706452606918066237');
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
    allusers = '';
    keibasettingsdata = client.getKeibasettings.get('706452606918066237');
    if(keibasettingsdata.participant !== null){
    for(const data of keibasettingsdata.participant.split(/\s+/)){
      const user = client.guilds.cache.get('706452606918066237').member(data);
      if(user){
        allusers += user.user.tag+'\n';
      }
    }
  }
    keibaembed = new MessageEmbed()
    .setTitle('うんこ競馬情報')
    .setDescription('競馬参加者\n'+allusers)
    .setColor('RANDOM')
    .setTimestamp();
    for(const data of allhorse){
      keibaembed.addFields({ name: `エントリーNO.${data.number}`, value: `${data.name}` })
    }
    casinomessage.edit(embed);
    keibamessage.edit(keibaembed);
  }, 60000);
}