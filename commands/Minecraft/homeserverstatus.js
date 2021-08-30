const { Message, MessageEmbed } = require('discord.js');
const util = require('minecraft-server-util');
const bot = require('../../Utils/Bot');
const { errorlog, clienterrorlog } = require("../../functions/logs/error");

module.exports = {
    info: {
        name: "homeserverstatus",
        description: "おうちサーバーの状態を表示するコマンド",
        usage: "",
        aliases: ["hss"],
        owneronly: false,
        adminonly: false,
        category: 'Minecraft'
    },

    /**
     * @param {bot} client
     * @param {Message} message
     * @param {string[]} args
     */

    run: async function (client, message, args) {
        try {
            if (message.channel.parentId !== '825170928237281311' && message.channel.parentId !== '844211706472169503' && message.channel.parentId !== '874484934989971477') {
                message.reply({
                    content: 'このチャンネルでそのコマンドは使用できないで。😉',
                    allowedMentions: {
                        repliedUser: false
                    }
                })
                    .then(msg => setTimeout(() => msg.delete(), 5000))
                    .catch(error => errorlog(message, error));
                return;
            }

            util.statusBedrock('126.235.33.140', { timeout: 5000 })
                .then(async result => {
                    message.reply(
                        {
                            embeds: [
                                new MessageEmbed()
                                    .setTitle('🏠おうちサーバー(BE)の現在の状態🏠')
                                    .addField('IPアドレス', result.host)
                                    .addField('ポート', result.port.toString())
                                    .addField('サーバーのバージョン', result.version)
                                    .addField('デフォルトゲームモード', result.gameMode)
                                    .addField('現在参加中のメンバー', `${result.onlinePlayers}/${result.maxPlayers}人`)
                                    .setImage('https://media.discordapp.net/attachments/840154191036022794/840154293453062144/outisabakoiyo.png')
                                    .setColor('RANDOM')
                                    .setTimestamp()
                            ],
                            allowedMentions: {
                                repliedUser: false
                            }
                        }
                    )
                        .then(msg => setTimeout(() => msg.delete(), 5000))
                        .catch(error => errorlog(message, error));
                })
                .catch(async error => {
                    clienterrorlog(error);
                    message.reply(
                        {
                            embeds: [
                                new MessageEmbed()
                                    .setTitle('🏠おうちサーバー(BE)の現在の状態🏠')
                                    .setDescription('おうちサーバー(BE)は現在落ちてます')
                                    .setImage('https://media.discordapp.net/attachments/840154191036022794/840154302605426698/setumeisitekudasai.png')
                                    .setColor('RANDOM')
                                    .setTimestamp()
                            ],
                            allowedMentions: {
                                repliedUser: false
                            }
                        }
                    )
                        .then(msg => setTimeout(() => msg.delete(), 5000))
                        .catch(error => errorlog(message, error));
                })
        } catch (error) {
            errorlog(interaction, error);
        }
        finally {
            client.cooldown.delete(message.author.id);
        }
    },
};