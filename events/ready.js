const { Client, MessageEmbed } = require('discord.js');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./unkoserver.db');

/**
 * @param {Client} client
 */

module.exports = async (client) => {
  const casinomessage = await client.channels.cache.get('798479605764718592').messages.fetch('799635530882744372');
  const unkoserverstatus = await client.channels.cache.get('780012050163302420').messages.fetch('800279738509426728');
  const shop = await client.channels.cache.get('802079467739676692').messages.fetch('802115362526330930');

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
  const Timertable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'timer';").get();
  if (!Timertable['count(*)']) {
    sql.prepare("CREATE TABLE timer (id TEXT PRIMARY KEY, guild TEXT, unkoserver INTEGER);").run();
    sql.prepare("CREATE UNIQUE INDEX idx_ltimer_id ON timer (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }
  client.getTimer = sql.prepare("SELECT * FROM timer WHERE guild = ?");
  client.setTimer = sql.prepare("INSERT OR REPLACE INTO timer (id, guild, unkoserver) VALUES (@id, @guild, @unkoserver);");

  const handleReaction = async (channelID, messageID, callback) => {
    const channel = await client.channels.fetch(channelID);
    const message = await channel.messages.fetch(messageID);
    const collector = message.createReactionCollector(() => true);
    collector.on('collect', (reaction, user) => callback(reaction, user));
  }
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
  });
  handleReaction('802079467739676692', '802115362526330930', async (reaction, user) => {
    let usermoneydata = client.getMoney.get(user.id, '706452606918066237');
    　 if (!usermoneydata) {
        usermoneydata　= { id: `706452606918066237-${user.id}`, user: user.id, guild: '706452606918066237', money: 0, dailylogin: 0, ticket: 0 }
      }
      let userdebtdata = client.getDebt.get(user.id, '706452606918066237');
      if (!userdebtdata) {
        userdebtdata　= { id: `706452606918066237-${user.id}`, user: user.id, guild: '706452606918066237', Tuna: 0, Shoulder: null }
      }
      if(userdebtdata.Tuna === 1){
        const reply = await client.channels.cache.get('802079467739676692').send(`${user}、お前借金返済中やん！`);
        reply.delete({ timeout: 5000 });
        return; 
      }
      if (reaction.emoji.name === '0️⃣') {
         usermoneydata.ticket++;
         usermoneydata.money -= 5000;
         const reply = await client.channels.cache.get('802079467739676692').send(`${user}、うんこチケットを5000円で購入しました。`);
         reply.delete({ timeout: 5000 });
      }
      client.setMoney.run(usermoneydata);
      client.setDebt.run(userdebtdata);
  })

  console.log(`[INFO] Logged in as ${client.user.tag}`);
  client.user.setPresence({ activity: { name: `${process.env.PREFIX}help うんこ鯖` }, status: 'online' });
  
  let slotsettingsdata = client.getSlotsettings.get('706452606918066237');
  let timerdata = client.getTimer.get('706452606918066237');
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
  casinomessage.edit(embed);
  unkoserverstatus.edit(
    new MessageEmbed()
    .setTitle('💩うんこサーバーの現在の状態💩')
    .setDescription('うんこサーバーは現在落ちてます\nうんこ鯖が生き返るまで残り'+timerdata.unkoserver+'日')
    .setImage('https://media.discordapp.net/attachments/800317829962399795/800317874614829086/setumeisitekudasai.jpg')
    .setColor('RANDOM')
    .setTimestamp()
  );

  setInterval(() => {
    Win = client.getSlotsettings.get('706452606918066237').Jackpot;
    timerdata = client.getTimer.get('706452606918066237').unkoserver;
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
    casinomessage.edit(embed);
    unkoserverstatus.edit(
      new MessageEmbed()
      .setTitle('💩うんこサーバーの現在の状態💩')
      .setDescription('うんこサーバーは現在落ちてます\nうんこ鯖が生き返るまで残り'+timerdata+'日')
      .setImage('https://media.discordapp.net/attachments/800317829962399795/800317874614829086/setumeisitekudasai.jpg')
      .setColor('RANDOM')
      .setTimestamp()
    );
  }, 60000);
}