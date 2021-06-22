const { GuildMember } = require("discord.js");
const bot = require('../../bot');
const { clienterrorlog } = require("../../functions/logs/error");

/**
 * @param {bot} client 
 * @param {GuildMember} oldMember 
 * @param {GuildMember} newMember 
 */

module.exports = async (client, oldMember, newMember) => {
    try {
        if (!oldMember.roles.cache.has('821715178147020800') && newMember.roles.cache.has('821715178147020800')) {
            await client.channels.cache.get('825231334657884161').send(`${newMember} 認証されました、ようこそ！おうち鯖へ！`);
        }
    } catch (error) {
        clienterrorlog(error);
    }
}