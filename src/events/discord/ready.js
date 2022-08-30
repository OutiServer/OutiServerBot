const { ActivityType } = require('discord.js');

/**
 *
 * @param {import('../../Bot')} client
 */
module.exports = async (client) => {
  client.user.setStatus('online');
  client.user.setActivity({ name: '/help おうち鯖', type: ActivityType.Playing });
  client.logger.info(`Logged in as ${client.user.tag}`);

  /*
  client.channels.cache.get('1014141666321518652').send({
    embeds: [
      new EmbedBuilder()
        .setTitle('ロール付与・剥奪')
        .setDescription('ロールがついている状態でボタンを押すと剥奪\nロールがついてない状態でボタンを押すと付与されます'),
    ],
    components: [
      new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('mention_announce')
            .setStyle(ButtonStyle.Primary)
            .setLabel('お知らせ'),
        ),
    ],
  });
  */
};