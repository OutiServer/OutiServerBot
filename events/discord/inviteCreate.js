const { Invite } = require('discord.js');
const bot = require('../../Utils/Bot');

/**
 * @param {bot} client 
 * @param {Invite} invite 
 */

module.exports = async (client, invite) => {
    if (invite.guild.id !== '706452606918066237') return;
    client.invites.set(invite.code, invite);
}