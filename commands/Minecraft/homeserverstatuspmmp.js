const { Client, Message, MessageEmbed } = require('discord.js');
const util = require('minecraft-server-util');
const { errorlog } = require('../../functions/error');

module.exports = {
    info: {
        name: "homeserverstatuspmmp",
        description: "おうちサーバー(pmmp)の状態を表示するコマンド",
        usage: "",
        aliases: ["hsspmmp"],
        owneronly: false,
        adminonly: true,
        category: 'Admin'
    },

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {Array} args
     */

    run: async function (client, message, args) {
        try {
            if (message.channel.id !== '834317763769925632' && message.channel.id !== '836886086428524564' && message.channel.id !== '822852838363103283' && message.channel.id !== '778553199439118336') {
                return message.reply('このチャンネルでそのコマンドは使用できません。')
                    .then(msg => msg.delete({ timeout: 5000 }))
                    .then(msg => message.delete());
            }

            util.statusBedrock('126.235.33.140', { port: 19131, timeout: 1000 })
                .then((result) => {
                    message.channel.send(
                        new MessageEmbed()
                            .setTitle('🏠おうちサーバー(PMMP)の現在の状態🏠')
                            .addField('IPアドレス', result.host)
                            .addField('ポート', result.port)
                            .addField('サーバーのバージョン', result.version)
                            .addField('デフォルトゲームモード', result.gameMode)
                            .addField('現在参加中のメンバー', `${result.onlinePlayers}/${result.maxPlayers}人`)
                            .setImage('https://media.discordapp.net/attachments/818411667015991297/826376437769568286/outisabakoiyo.png')
                            .setColor('RANDOM')
                            .setTimestamp()
                    );
                })
                .catch(() => {
                    message.channel.send(
                        new MessageEmbed()
                            .setTitle('🏠おうちサーバー(PMMP)の現在の状態🏠')
                            .setDescription('おうちサーバー(PMMP)は現在落ちてます')
                            .setImage('https://media.discordapp.net/attachments/818411667015991297/818411777569325066/setumeisitekudasai.jpg')
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