const { MessageEmbed, WebhookClient } = require('discord.js');
const bot = require('../../bot');
const { clienterrorlog } = require('../../functions/logs/error');

/**
 * @param {bot} client
 */

module.exports = async (client) => {
  try {
    const webhook = new WebhookClient('854285096516976671', 'jBVbq6SZuFMUHgym86i8FsZdXQW8vpitLksjuUQhuscempLozfxJjhZ_U7fxj85LxKcT');
    await webhook.send(
      new MessageEmbed()
        .setTitle(`${client.user.tag}が起動しました！`)
        .setDescription('```\nBotが認識できるユーザー数: ' + client.users.cache.size + '人\nBotが認識できるチャンネル: ' + client.channels.cache.size + '個\n```')
        .setColor('RANDOM')
        .setTimestamp()
    );

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
      client.db.prepare("CREATE TABLE rankimages (id TEXT PRIMARY KEY, user TEXT, barcolor TEXT);").run();
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

    const Verifytable = client.db.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'verifys';").get();
    if (!Verifytable['count(*)']) {
      client.db.prepare("CREATE TABLE verifys (id TEXT PRIMARY KEY, user TEXT, verifynumber INTEGER);").run();
      client.db.prepare("CREATE UNIQUE INDEX idx_verifys_id ON verifys (id);").run();
      client.db.pragma("synchronous = 1");
      client.db.pragma("journal_mode = wal");
    }

    client.invites = await client.guilds.cache.get('706452606918066237').fetchInvites();

    await client.user.setPresence({ activity: { name: '再起動しました', type: 'PLAYING' }, status: 'dnd' });
    console.log(`Logged in as ${client.user.tag}`);

    const handleReaction = async (channelID, messageID, callback) => {
      const channel = await client.channels.fetch(channelID);
      const message = await channel.messages.fetch(messageID);
      const collector = message.createReactionCollector(() => true);
      collector.on('collect', (reaction, user) => callback(reaction, user));
    }

    handleReaction('774594290679545886', '794246738881019915', async (reaction, user) => {
      if (user.bot) return;
      if (reaction.emoji.id === '852517396224278529') {
        if (reaction.message.guild.member(user).roles.cache.has('774593459034128395')) {
          await reaction.message.guild.member(user).roles.remove('774593459034128395');
          const reply = await client.channels.cache.get('774594290679545886').send(`${user} among us crewを剥奪しました`);
          await reply.delete({ timeout: 5000 });
        }
        else {
          await reaction.message.guild.member(user).roles.add('774593459034128395');
          const reply = await client.channels.cache.get('774594290679545886').send(`${user} among us crewを付与しました`);
          await reply.delete({ timeout: 5000 });
        }
      }
      else if (reaction.emoji.id === '852517397020934166') {
        if (reaction.message.guild.member(user).roles.cache.has('780217228649562113')) {
          await reaction.message.guild.member(user).roles.remove('780217228649562113');
          const reply = await client.channels.cache.get('774594290679545886').send(`${user} 臨時お知らせを剥奪しました`);
          await reply.delete({ timeout: 5000 });
        }
        else {
          await reaction.message.guild.member(user).roles.add('780217228649562113');
          const reply = await client.channels.cache.get('774594290679545886').send(`${user} 臨時お知らせを付与しました\n10分後自動で剥奪します`);
          await reply.delete({ timeout: 5000 });
          setTimeout(async () => {
            await reaction.message.guild.member(user).roles.remove('780217228649562113');
          }, 600000)
        }
      }
      else if (reaction.emoji.id === '810436146261131306') {
        if (reaction.message.guild.member(user).roles.cache.has('825232499151470643')) {
          await reaction.message.guild.member(user).roles.remove('825232499151470643');
          const reply = await client.channels.cache.get('774594290679545886').send(`${user} 雑談を剥奪しました`);
          await reply.delete({ timeout: 5000 });
        }
        else {
          await reaction.message.guild.member(user).roles.add('825232499151470643');
          const reply = await client.channels.cache.get('774594290679545886').send(`${user} 雑談を付与しました`);
          await reply.delete({ timeout: 5000 });
        }
      }
      else if (reaction.emoji.id === '852517399604494367') {
        if (reaction.message.guild.member(user).roles.cache.has('826994784614219846')) {
          await reaction.message.guild.member(user).roles.remove('826994784614219846');
          const reply = await client.channels.cache.get('774594290679545886').send(`${user} お知らせを剥奪しました`);
          await reply.delete({ timeout: 5000 });
        }
        else {
          await reaction.message.guild.member(user).roles.add('826994784614219846');
          const reply = await client.channels.cache.get('774594290679545886').send(`${user} お知らせを付与しました`);
          await reply.delete({ timeout: 5000 });
        }
      }
    });

    handleReaction('821686383605055508', '821726639443673089', async (reaction, user) => {
      if (user.bot) return;
      if (reaction.emoji.name === '🎫') {
        let ticketdata = client.db.prepare('SELECT * FROM serversettings WHERE guild = ?').get('706452606918066237');
        if (!ticketdata) {
          ticketdata = { id: '706452606918066237', guild: '706452606918066237', ticketid: 0, serverjoindedcase: 0 }
          client.db.prepare('INSERT INTO serversettings (id, guild, ticketid, serverjoindedcase) VALUES (@id, @guild, @ticketid, @serverjoindedcase)').run(ticketdata);
        }
        const channel = await client.guilds.cache.get('706452606918066237').channels.create(`${ticketdata.ticketid}-お問い合わせ`,
          {
            type: 'text',
            parent: '821684794056245258',
            topic: `<@${user.id}>さん専用のお問い合わせチャンネル`,
            permissionOverwrites: [
              {
                id: '706452606918066237',
                deny: ['VIEW_CHANNEL']
              },
              {
                id: user.id,
                allow: ['VIEW_CHANNEL']
              },
              {
                id: '771015602180587571',
                allow: ['VIEW_CHANNEL']
              }
            ]
          });
        await channel.send(`${user}さん専用のお問い合わせチャンネルを作成しました！`,
          new MessageEmbed()
            .setDescription('こちらのチャンネルでお問い合わせ内容の記載をお願いします')
            .setColor('RANDOM')
            .setTimestamp());
        client.db.prepare('UPDATE serversettings SET ticketid = ? WHERE id = ?').run(ticketdata.ticketid, ticketdata.id);
      }
    });
  } catch (error) {
    clienterrorlog(error);
  }
};