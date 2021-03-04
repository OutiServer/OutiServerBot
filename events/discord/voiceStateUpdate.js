const { Client, GuildMember } = require('discord.js');

/**
 * @param {Client} client
 * @param {GuildMember} oldMember
 * @param {GuildMember} newMember
 */

module.exports = async (client, oldMember, newMember) => {
  if (oldMember.guild.id !== '706452606918066237' || oldMember.member.user.bot) return;
  if (oldMember.channelID === null) {
    client.channels.cache.get('706458716320432198').send(`${newMember.member.user.tag}が${newMember.channel.name}に入室しました`);
  }
  else if (newMember.channelID === null) {
    client.channels.cache.get('706458716320432198').send(`${oldMember.member.user.tag}が${oldMember.channel.name}から退出しました`);
  }
  else if (newMember.channelID !== oldMember.channelID) {
    client.channels.cache.get('706458716320432198').send(`${newMember.member.user.tag}が${oldMember.channel.name}から${newMember.channel.name}に移動しました`);
  }
};