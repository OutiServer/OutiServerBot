const { Client, VoiceState } = require('discord.js');

/**
 * @param {Client} client
 * @param {VoiceState} oldMember
 * @param {VoiceState} newMember
 */

module.exports = async (client, oldMember, newMember) => {
  const conn = client.voice.connections.get(process.env.DISCORD_GUILD_ID);
  if (conn && conn.channel && conn.channel.members.array().length < 2) {
    conn.disconnect();
  }

  if (oldMember.guild.id !== '706452606918066237' || oldMember.member.user.bot) return;
  if (oldMember.channelID === null) {
    if (newMember.channelID === '822310255324299294') {
      client.channels.cache.get('825674456470519809').send(`${newMember.member.user.tag}が${newMember.channel.name}に入室しました`);
    }
    else {
      client.channels.cache.get('706458716320432198').setTopic(`${newMember.channel.name}のVC接続数: ${newMember.channel.members.size}人`);
      client.channels.cache.get('706458716320432198').send(`${newMember.member.user.tag}が${newMember.channel.name}に入室しました`);
    }
  }
  else if (newMember.channelID === null) {
    if (oldMember.channelID === '822310255324299294') {
      client.channels.cache.get('825674456470519809').setTopic(`${oldMember.channel.name}のVC接続数: ${oldMember.channel.members.size}人`);
      client.channels.cache.get('825674456470519809').send(`${oldMember.member.user.tag}が${oldMember.channel.name}から退出しました`);
    }
    else {
      client.channels.cache.get('706458716320432198').setTopic(`${oldMember.channel.name}のVC接続数: ${oldMember.channel.members.size}人`);
      client.channels.cache.get('706458716320432198').send(`${oldMember.member.user.tag}が${oldMember.channel.name}から退出しました`);
    }
  }
  else if (newMember.channelID !== oldMember.channelID) {
    if (oldMember.channelID === '822310255324299294' || newMember.channelID === '822310255324299294') {
      client.channels.cache.get('825674456470519809').setTopic(`${oldMember.channel.name}のVC接続数: ${oldMember.channel.members.size}人`);
      client.channels.cache.get('706458716320432198').setTopic(`${oldMember.channel.name}のVC接続数: ${oldMember.channel.members.size}人`);
      client.channels.cache.get('706458716320432198').send(`${oldMember.member.user.tag}が${oldMember.channel.name}から${newMember.channel.name}に移動しました`);
      client.channels.cache.get('825674456470519809').send(`${oldMember.member.user.tag}が${oldMember.channel.name}から${newMember.channel.name}に移動しました`);
    }
    else {
      client.channels.cache.get('706458716320432198').setTopic(`${oldMember.channel.name}のVC接続数: ${oldMember.channel.members.size}人`);
      client.channels.cache.get('706458716320432198').send(`${newMember.member.user.tag}が${oldMember.channel.name}から${newMember.channel.name}に移動しました`);
    }
  }
};