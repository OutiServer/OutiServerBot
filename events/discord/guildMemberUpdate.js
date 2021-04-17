const { Client, GuildMember } = require("discord.js");
const { clienterrorlog } = require("../../functions/error");

/**
 * @param {Client} client 
 * @param {GuildMember} oldMember 
 * @param {GuildMember} newMember 
 */

module.exports = async (client, oldMember, newMember) => {
    try {
        if (!oldMember.roles.cache.has('821715178147020800') && newMember.roles.cache.has('821715178147020800')) {
            client.channels.cache.get('825231334657884161').send(`${newMember} 認証されました、ようこそ！おうち鯖へ！\n<#828438793384230932>から人数の埋まっていない国を選ぶか建国するか教えてください。`);
        }
    } catch (error) {
        clienterrorlog(client, error);
    }
}