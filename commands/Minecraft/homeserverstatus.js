const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');
const util = require('minecraft-server-util');
const { errorlog } = require('../../functions/error');

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
     * @param {Client} client
     * @param {Message} message
     * @param {Array} args
     */

    run: async function (client, message, args) {
        try {
            if (message.channel.id === '797008715646500865' || message.channel.id === '833626570270572584') {
                return message.reply('このチャンネルでそのコマンドは使用できません。')
                    .then(msg => msg.delete({ timeout: 5000 }))
                    .then(msg => message.delete());
            }

            util.statusBedrock('126.235.33.140', { timeout: 1000 })
                .then((result) => {
                    message.channel.send(
                        new MessageEmbed()
                            .attachFiles([new MessageAttachment('dat/images/outisabakoiyo.png', 'outisabakoiyo.png')])
                            .setTitle('🏠おうちサーバー(BE)の現在の状態🏠')
                            .addField('IPアドレス', result.host)
                            .addField('ポート', result.port)
                            .addField('サーバーのバージョン', result.version)
                            .addField('デフォルトゲームモード', result.gameMode)
                            .addField('現在参加中のメンバー', `${result.onlinePlayers}/${result.maxPlayers}人`)
                            .setImage('attachment://outisabakoiyo.png')
                            .setColor('RANDOM')
                            .setTimestamp()
                    );
                })
                .catch(() => {
                    message.channel.send(
                        new MessageEmbed()
                            .attachFiles([new MessageAttachment('dat/images/setumeisitekudasai.png', 'setumeisitekudasai.png')])
                            .setTitle('🏠おうちサーバー(BE)の現在の状態🏠')
                            .setDescription('おうちサーバー(BE)は現在落ちてます')
                            .setImage('attachment://setumeisitekudasai.png')
                            .setColor('RANDOM')
                            .setTimestamp()
                    );
                });
        } catch (error) {
            errorlog(client, message, error);
        }
        finally {
            client.cooldown.set(message.author.id, false);
        }
    },
};