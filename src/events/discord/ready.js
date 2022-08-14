const { ActivityType } = require('discord.js');

/**
 *
 * @param {import('../../Bot')} client
 */
module.exports = async (client) => {
  client.user.setStatus('online');
  client.user.setActivity({ name: '再起動しました', type: ActivityType.Playing });
  client.logger.info(`Logged in as ${client.user.tag}`);

  /*
  const msg = await client.channels.cache.get('774594290679545886').messages.fetch('1008311079383863336');
  msg.edit({
    embeds: [
      new EmbedBuilder()
        .setTitle('ロール付与・剥奪')
        .setDescription('ロールがついている状態でボタンを押すと剥奪\nロールがついてない状態でボタンを押すと付与されます\n臨時お知らせは付与から10分経つと自動的に剥奪されます'),
    ],
    components: [
      new ActionRowBuilder()
        .addComponents(
          new SelectMenuBuilder()
            .setCustomId('role_panel')
            .setMaxValues(7)
            .addOptions([
              { label: 'AmongUs Crew', value: 'among_us' },
              { label: '臨時お知らせ', value: 'temp_announce' },
              { label: 'お知らせ', value: 'mention_announce' },
              { label: 'お絵描き', value: 'illustrator' },
              { label: '作業通話', value: 'work_call' },
              { label: '学ぶ者', value: 'study_member' },
              { label: '幽霊調査員', value: 'ghost_investigator' },
            ]),
        ),
    ],
  });
  */
};