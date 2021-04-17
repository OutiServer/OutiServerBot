const { Client, VoiceState } = require('discord.js');
const { clienterrorlog } = require('../../functions/error');

/**
 * @param {Client} client
 * @param {VoiceState} oldMember
 * @param {VoiceState} newMember
 */

module.exports = async (client, oldMember, newMember) => {
  try {
    const conn = client.voice.connections.get(process.env.DISCORD_GUILD_ID);
    if (conn && conn.channel && conn.channel.members.array().length < 2) {
      conn.disconnect();
    }

    if (oldMember.guild.id !== '706452606918066237' || oldMember.member.user.bot || !oldMember.channel || !newMember.channel) return;
    if (oldMember.channelID === null) {
      client.channels.cache.get('706458716320432198').send(`${newMember.member.user.tag}が${newMember.channel.name}に入室しました`);
    }
    else if (newMember.channelID === null) {
      client.channels.cache.get('706458716320432198').send(`${oldMember.member.user.tag}が${oldMember.channel.name}から退出しました`);
    }
    else if (newMember.channelID !== oldMember.channelID) {
      client.channels.cache.get('706458716320432198').send(`${newMember.member.user.tag}が${oldMember.channel.name}から${newMember.channel.name}に移動しました`);
    }
  } catch (error) {
    clienterrorlog(client, error);
  }
};