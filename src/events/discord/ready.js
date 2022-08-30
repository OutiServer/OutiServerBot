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
        .setDescription('ロールがついている状態でボタンを押すと剥奪\nロールがついてない状態でボタンを押すと付与されます\n臨時お知らせは付与から10分経つと自動的に剥奪されます'),
    ],
    components: [
      new ActionRowBuilder()
        .addComponents(
          new SelectMenuBuilder()
            .setCustomId('role_panel')
            .setMinValues(0)
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