const { Client, GuildMember } = require('discord.js');

/**
 * @param {Client} client
 * @param {GuildMember} member
 */

module.exports = async (client, member) => {
    if (member.user.bot === true || member.guild.id !== '706452606918066237') return;
    client.channels.cache.get('797008715646500865').send(`${member}さん、よろしくお願いします！\n` + 'うんこサーバーへようこそ！\n<#794787771100954635>を確認して\n<#780211443201998888>からサーバーに入ってください！\nカジノランドとvcチャンネルはミュート推奨です！');
};