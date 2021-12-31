const { clienterrorlog } = require('../../functions/error');

/**
 * @param {import('../../utils/Bot')} client
 * @param {VoiceState} oldMember
 * @param {VoiceState} newMember
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
  }
  catch (error) {
    clienterrorlog(client, error);
  }
};