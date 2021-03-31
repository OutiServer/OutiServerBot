const { Client, GuildMember } = require('discord.js');

/**
 * @param {Client} client
 * @param {GuildMember} member
 */

module.exports = async (client, member) => {
    if (member.user.bot || member.guild.id !== '706452606918066237') return;

    client.channels.cache.get('797008715646500865').send(`${member}さん、よろしくお願いします。\n<#825536134054543412>の記入お願いします。`);
};