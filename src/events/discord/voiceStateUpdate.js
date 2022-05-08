const ms = require('ms');
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
    if (oldMember.channel.parentId === '706452607538954262' || newMember.channel.parentId === '706452607538954262') {
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
    else if (oldMember.channel.parentId === '972467676951752734' || newMember.channel.parentId === '972467676951752734') {
      if (oldMember.channelId === null) {
        client.study_times.set(newMember.member.id, Date.now());
        await client.channels.cache.get('706458716320432198').send(`${newMember.member.user.tag}さんが${newMember.channel.name}で学習を開始しました！`);
      }
      else if (newMember.channelId === null) {
        await client.channels.cache.get('706458716320432198').send(`${newMember.member.user.tag}さんが${newMember.channel.name}で学習を終えました、今回の学習時間は${ms(Date.now() - client.study_times.get(oldMember.member.id))}でした`);
        client.study_times.delete(oldMember.member.id);
      }
    }
  }
  catch (error) {
    clienterrorlog(client, error);
  }
};