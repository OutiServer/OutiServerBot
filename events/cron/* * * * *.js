const { Collection, MessageEmbed } = require('discord.js');
const util = require('minecraft-server-util');
const bot = require('../../bot');
const { clienterrorlog } = require('../../functions/logs/error');

/**
 * @param {bot} client
 */

module.exports = async (client) => {
    try {
        client.levelcooldown = new Collection();
        const msg = await client.channels.cache.get('780012050163302420').messages.fetch('870272924974727209');
        util.statusBedrock('126.235.33.140', { port: 19131, timeout: 5000 })
            .then(async result => {
                await msg.edit(
                    new MessageEmbed()
                        .setTitle('🏠おうちサーバー(PMMP)の現在の状態🏠')
                        .addField('IPアドレス', result.host)
                        .addField('ポート', result.port)
                        .addField('サーバーのバージョン', result.version)
                        .addField('デフォルトゲームモード', result.gameMode)
                        .addField('現在参加中のメンバー', `${result.onlinePlayers}/${result.maxPlayers}人`)
                        .setImage('https://media.discordapp.net/attachments/840154191036022794/840154293453062144/outisabakoiyo.png')
                        .setColor('RANDOM')
                        .setTimestamp()
                );
            })
            .catch(async error => {
                clienterrorlog(error);
                await msg.edit(
                    new MessageEmbed()
                        .setTitle('🏠おうちサーバー(PMMP)の現在の状態🏠')
                        .setDescription('おうちサーバー(PMMP)は現在落ちてます')
                        .setImage('https://media.discordapp.net/attachments/840154191036022794/840154302605426698/setumeisitekudasai.png')
                        .setColor('RANDOM')
                        .setTimestamp()
                );
            })
    } catch (error) {
        clienterrorlog(error);
    }
};