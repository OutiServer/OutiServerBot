const { clienterrorlog } = require('../../functions/error');

/**
 * @param {import('../../utils/Bot')} client
 */

module.exports = async (client) => {
  try {
    const Inquirytable = client.db.prepare('SELECT count(*) FROM sqlite_master WHERE type=\'table\' AND name = \'inquirys\';').get();
    if (!Inquirytable['count(*)']) {
      client.db.prepare('CREATE TABLE inquirys (id INTEGER PRIMARY KEY AUTOINCREMENT, channelid TEXT);').run();
      client.db.prepare('CREATE UNIQUE INDEX idx_inquirys_id ON inquirys (id);').run();
      client.db.pragma('synchronous = 1');
      client.db.pragma('journal_mode = wal');
    }

    const Threadtable = client.db.prepare('SELECT count(*) FROM sqlite_master WHERE type=\'table\' AND name = \'threads\';').get();
    if (!Threadtable['count(*)']) {
      client.db.prepare('CREATE TABLE threads (threadid TEXT PRIMARY KEY);').run();
      client.db.prepare('CREATE UNIQUE INDEX idx_threads_id ON threads (threadid);').run();
      client.db.pragma('synchronous = 1');
      client.db.pragma('journal_mode = wal');
    }

    const Polltable = client.db.prepare('SELECT count(*) FROM sqlite_master WHERE type=\'table\' AND name = \'polls\';').get();
    if (!Polltable['count(*)']) {
      client.db.prepare('CREATE TABLE polls (id INTEGER PRIMARY KEY AUTOINCREMENT, userid TEXT, guildid TEXT, channelid TEXT, messageid TEXT, endtime INTEGER);').run();
      client.db.prepare('CREATE UNIQUE INDEX idx_polls_id ON polls (id);').run();
      client.db.pragma('synchronous = 1');
      client.db.pragma('journal_mode = wal');
    }

    const wordTable = client.db.prepare('SELECT count(*) FROM sqlite_master WHERE type=\'table\' AND name = \'words\';').get();
    if (!wordTable['count(*)']) {
      client.db.prepare('CREATE TABLE words (index_word TEXT PRIMARY KEY, read TEXT NOT NULL);').run();
      client.db.prepare('CREATE UNIQUE INDEX idx_words_id ON words (index_word);').run();
      client.db.pragma('synchronous = 1');
      client.db.pragma('journal_mode = wal');
    }

    client.wordCache = client.db.prepare('SELECT * FROM words;').all();

    client.user.setStatus('online');
    client.user.setActivity({ name: '再起動しました', type: 'PLAYING' });
    console.log(`Logged in as ${client.user.tag}`);

    client.twitter.stream('statuses/filter', { follow: '1279262554221510659' }, function (stream) {
      stream.on('data', async function (event) {
        try {
          if (event.text.startsWith('@') || event.text.startsWith('RT')) return;
          await client.channels.cache.get('736608546468266095').send(`${event.user.screen_name}の新規ツイートです\nhttps://twitter.com/${event.user.screen_name}/status/${event.id_str}`);
        }
        catch (error) {
          clienterrorlog(client, error);
        }
      });

      stream.on('error', function (error) {
        clienterrorlog(client, error);
      });
    });
  }
  catch (error) {
    clienterrorlog(client, error);
  }
};