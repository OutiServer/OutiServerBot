const { SnowflakeUtil } = require('discord.js');

/**
 * @param {import('../../Bot')} client
 * @param {import('discord.js').VoiceState} oldMember
 * @param {import('discord.js').VoiceState} newMember
 */

module.exports = async (client, oldMember, newMember) => {
  if (!oldMember.guild.members.me.voice.channel && !newMember.guild.members.me.voice.channelId) {
    const speakerClient = client.speakers.get(oldMember.guild.id);
    if (speakerClient) {
      speakerClient.stop();
      client.speakers.delete(oldMember.guild.id);
    }
  }

  if (oldMember.channelId === oldMember.guild.members.me.voice.channelId && oldMember.channel !== null) {
    if (oldMember.channel.members.filter(m => !m.user.bot).size < 1) {
      const speakerClient = client.speakers.get(oldMember.guild.id);
      if (speakerClient) {
        speakerClient.stop();
        client.speakers.delete(oldMember.guild.id);
      }
    }
  }

  if (oldMember.guild.id !== '706452606918066237' || oldMember.member.user.bot) return;
  if (oldMember.channel?.parentId === '706452607538954262' || newMember.channel?.parentId === '706452607538954262') {
    const speaker = client.speakers.get(newMember.guild.id);
    if (oldMember.channelId === null) {
      await client.channels.cache.get('706458716320432198').send(`${newMember.member.user.tag}が${newMember.channel.name}に入室しました`);
      if (speaker && speaker.voiceChannelId === newMember.channelId) await speaker.addSpearkQueue(`${newMember.member.user.username}が参加しました`, SnowflakeUtil.generate());
    }
    else if (newMember.channelId === null) {
      await client.channels.cache.get('706458716320432198').send(`${oldMember.member.user.tag}が${oldMember.channel.name}から退出しました`);
      if (speaker && speaker.voiceChannelId === oldMember.channelId) await speaker.addSpearkQueue(`${oldMember.member.user.username}が退出しました`, SnowflakeUtil.generate());
    }
    else if (newMember.channelId !== oldMember.channelId) {
      await client.channels.cache.get('706458716320432198').send(`${newMember.member.user.tag}が${oldMember.channel.name}から${newMember.channel.name}に移動しました`);
      if (speaker && speaker.voiceChannelId === newMember.channelId) await speaker.addSpearkQueue(`${oldMember.member.user.username}が参加しました`, SnowflakeUtil.generate());
      else if (speaker && speaker.voiceChannelId === oldMember.channelId) await speaker.addSpearkQueue(`${oldMember.member.user.username}が退出しました`, SnowflakeUtil.generate());
    }
  }
};