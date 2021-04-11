const { Client, Message, MessageEmbed } = require('discord.js');
const util = require('minecraft-server-util');

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
        if (message.channel.id === '797008715646500865') {
            return message.reply('このチャンネルでそのコマンドは使用できません。')
                .then(msg => msg.delete({ timeout: 5000 }))
                .then(msg => message.delete());
        }

        util.statusBedrock('126.235.33.140', { timeout: 1000 })
            .then((result) => {
                message.channel.send(
                    new MessageEmbed()
                        .setTitle('🏠おうちサーバー(BE)の現在の状態🏠')
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
            .catch((error) => {
                message.channel.send(
                    new MessageEmbed()
                        .setTitle('🏠おうちサーバー(BE)の現在の状態🏠')
                        .setDescription('おうちサーバー(BE)は現在落ちてます')
                        .setImage('https://media.discordapp.net/attachments/818411667015991297/818411777569325066/setumeisitekudasai.jpg')
                        .setColor('RANDOM')
                        .setTimestamp()
                );
                console.error(error);
            });
    },
};