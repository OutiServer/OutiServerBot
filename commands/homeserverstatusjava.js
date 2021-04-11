const { Client, Message, MessageEmbed } = require('discord.js');
const util = require('minecraft-server-util');

module.exports = {
    info: {
        name: "homeserverstatusjava",
        description: "おうちサーバー(JE)の状態を表示するコマンド",
        usage: "",
        aliases: ["hssje"],
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
        util.status('126.235.33.140', { timeout: 1000 })
            .then((result) => {
                message.channel.send(
                    new MessageEmbed()
                        .setTitle('🏠おうちサーバー(JE)の現在の状態🏠')
                        .addField('IPアドレス', result.host)
                        .addField('ポート', result.port)
                        .addField('サーバーのバージョン', result.version)
                        .addField('現在参加中のメンバー', `${result.onlinePlayers}/${result.maxPlayers}人`)
                        .setImage('https://media.discordapp.net/attachments/818411667015991297/826376437769568286/outisabakoiyo.png')
                        .setColor('RANDOM')
                        .setTimestamp()
                );
            })
            .catch((error) => {
                message.channel.send(
                    new MessageEmbed()
                        .setTitle('🏠おうちサーバー(JE)の現在の状態🏠')
                        .setDescription('おうちサーバー(JE)は現在落ちてます')
                        .setImage('https://media.discordapp.net/attachments/818411667015991297/818411777569325066/setumeisitekudasai.jpg')
                        .setColor('RANDOM')
                        .setTimestamp()
                );
                console.error(error);
            });
    }
}