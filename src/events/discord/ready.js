const { ActivityType, Collection } = require('discord.js');

/**
 *
 * @param {import('../../Bot')} client
 */
module.exports = async (client) => {
  client.user.setStatus('online');
  client.user.setActivity({ name: '/help おうち鯖', type: ActivityType.Playing });
  client.logger.info(`Logged in as ${client.user.tag}`);

  client.guilds.cache.forEach(async guild => {
    if (guild.id !== '706452606918066237') return;
    await guild.invites.fetch();
    client.invites[guild.id] = new Collection();
    guild.invites.cache.forEach(invite => {
      client.invites[guild.id].set(invite.code, { code: invite.code, uses: invite.uses });
    });
  });

  client.wordCache = client.database.getAllWord();

  // 通常鯖の
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
          new ButtonBuilder()
            .setCustomId('announce')
            .setStyle(ButtonStyle.Primary)
            .setLabel('お知らせ'),
          new ButtonBuilder()
            .setCustomId('temp_announce')
            .setStyle(ButtonStyle.Primary)
            .setLabel('臨時お知らせ'),
          new ButtonBuilder()
            .setCustomId('among_us')
            .setStyle(ButtonStyle.Primary)
            .setLabel('AmongUs Crew'),
          new ButtonBuilder()
            .setCustomId('study_member')
            .setStyle(ButtonStyle.Primary)
            .setLabel('学ぶもの'),
          new ButtonBuilder()
            .setCustomId('work_call')
            .setStyle(ButtonStyle.Primary)
            .setLabel('作業通話'),
        ),
      new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('ghost_investigator')
            .setStyle(ButtonStyle.Primary)
            .setLabel('幽霊調査員'),
        ),
    ],
  });
  */

  // 新サーバーのロールパネル
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