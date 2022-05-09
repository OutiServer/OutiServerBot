/**
 * @param {import('../../Bot')} client
 */

module.exports = async (client) => {
  const Inquirytable = client.db.prepare('SELECT count(*) FROM sqlite_master WHERE type=\'table\' AND name = \'inquirys\';').get();
  if (!Inquirytable['count(*)']) {
    client.db.prepare('CREATE TABLE inquirys (id INTEGER PRIMARY KEY AUTOINCREMENT, channelid TEXT);').run();
    client.db.prepare('CREATE UNIQUE INDEX idx_inquirys_id ON inquirys (id);').run();
  }

  const Threadtable = client.db.prepare('SELECT count(*) FROM sqlite_master WHERE type=\'table\' AND name = \'threads\';').get();
  if (!Threadtable['count(*)']) {
    client.db.prepare('CREATE TABLE threads (threadid TEXT PRIMARY KEY);').run();
    client.db.prepare('CREATE UNIQUE INDEX idx_threads_id ON threads (threadid);').run();
  }

  const Polltable = client.db.prepare('SELECT count(*) FROM sqlite_master WHERE type=\'table\' AND name = \'polls\';').get();
  if (!Polltable['count(*)']) {
    client.db.prepare('CREATE TABLE polls (id INTEGER PRIMARY KEY AUTOINCREMENT, userid TEXT, guildid TEXT, channelid TEXT, messageid TEXT, endtime INTEGER);').run();
    client.db.prepare('CREATE UNIQUE INDEX idx_polls_id ON polls (id);').run();
  }

  const wordTable = client.db.prepare('SELECT count(*) FROM sqlite_master WHERE type=\'table\' AND name = \'words\';').get();
  if (!wordTable['count(*)']) {
    client.db.prepare('CREATE TABLE words (index_word TEXT PRIMARY KEY, read TEXT NOT NULL);').run();
    client.db.prepare('CREATE UNIQUE INDEX idx_words_id ON words (index_word);').run();
  }

  const speakersTable = client.db.prepare('SELECT count(*) FROM sqlite_master WHERE type=\'table\' AND name = \'speakers\';').get();
  if (!speakersTable['count(*)']) {
    client.db.prepare('CREATE TABLE speakers (userid TEXT PRIMARY KEY, speaker_id INTEGER NOT NULL);').run();
    client.db.prepare('CREATE UNIQUE INDEX idx_speakers_id ON speakers (userid);').run();
  }

  client.user.setStatus('online');
  client.user.setActivity({ name: '再起動しました', type: 'PLAYING' });
  client.logger.info(`Logged in as ${client.user.tag}`);

  client.twitter.stream('statuses/filter', { follow: '1279262554221510659' }, function (stream) {
    stream.on('data', async function (event) {
      if (event.text.startsWith('@') || event.text.startsWith('RT')) return;
      await client.channels.cache.get('736608546468266095').send(`${event.user.screen_name}の新規ツイートです\nhttps://twitter.com/${event.user.screen_name}/status/${event.id_str}`);
    });
  });
};