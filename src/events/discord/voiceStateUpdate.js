const { clienterrorlog } = require('../../functions/error');

/**
 * @param {import('../../utils/Bot')} client
 * @param {import('discord.js').VoiceState} oldMember
 * @param {import('discord.js').VoiceState} newMember
 */

module.exports = async (client, oldMember, newMember) => {
  try {
    if (oldMember.guild.id !== '706452606918066237' || oldMember.member.user.bot) return;
    if (oldMember.channelId === null) {
      await client.channels.cache.get('706458716320432198').send(`${newMember.member.user.tag}が${newMember.channel.name}に入室しました`);
    }
    else if (newMember.channelId === null) {
      await client.channels.cache.get('706458716320432198').send(`${oldMember.member.user.tag}が${oldMember.channel.name}から退出しました`);
    }
    else if (newMember.channelId !== oldMember.channelId) {
      await client.channels.cache.get('706458716320432198').send(`${newMember.member.user.tag}が${oldMember.channel.name}から${newMember.channel.name}に移動しました`);
    }


    if (oldMember.channelId === oldMember.guild.me.voice.channelId) {
      if (oldMember.channel.members.filter(m => !m.user.bot).size < 1) {
        client.connection?.disconnect();
        client.connection?.destroy();
        client.connection = null;
        client.speekqueue = {};
        await client.channels.cache.get('706458716320432198').send('読み上げを終了しました');
      }
    }
  }
  catch (error) {
    clienterrorlog(client, error);
  }
};