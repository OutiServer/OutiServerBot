/**
 * @param {import('../../Bot')} client
 */

module.exports = async (client) => {
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