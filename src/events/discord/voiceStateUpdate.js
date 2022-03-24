const { clienterrorlog } = require('../../functions/error');

/**
 * @param {import('../../utils/Bot')} client
 * @param {import('discord.js').VoiceState} oldMember
 * @param {import('discord.js').VoiceState} newMember
 */

module.exports = async (client, oldMember, newMember) => {
  try {
    if (oldMember.channelId === oldMember.guild.me.voice.channelId && oldMember.channel !== null) {
      if (oldMember.channel.members.filter(m => !m.user.bot).size < 1) {
        const speakerClient = client.speakers.get(oldMember.guild.id);
        if (speakerClient) {
          speakerClient.stop();
          client.speakers.delete(oldMember.guild.id);
        }
      }
    }

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