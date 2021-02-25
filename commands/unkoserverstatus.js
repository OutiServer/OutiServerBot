const { Message, MessageEmbed } = require('discord.js');
const util = require('minecraft-server-util');

module.exports = {
    info: {
        name: "unkoserverstatus",
        description: "うんこサーバーの状態を表示するコマンド",
        usage: "",
        aliases: ["uss"],
        botownercommand: false,
        botadmincommand: false
    },
    /**
     * @param {Message} message
     */
    run: async function (client, message, args) {
        util.statusBedrock('126.235.33.140')
            .then((result) => {
                message.channel.send(
                    new MessageEmbed()
                        .setTitle('💩うんこサーバーの現在の状態💩')
                        .addField('IPアドレス', result.host)
                        .addField('ポート', result.port)
                        .addField('サーバーのバージョン', result.version)
                        .addField('現在参加中のメンバー', `${result.onlinePlayers}/${result.maxPlayers}人`)
                        .setImage('https://media.discordapp.net/attachments/800317829962399795/800317877168373760/UnkoServerkoiyo.png')
                        .setColor('RANDOM')
                        .setTimestamp()
                );
            })
            .catch((error) => {
                message.channel.send(
                    new MessageEmbed()
                        .setTitle('💩うんこサーバーの現在の状態💩')
                        .setDescription('うんこサーバーは現在落ちてます')
                        .setImage('https://media.discordapp.net/attachments/800317829962399795/800317874614829086/setumeisitekudasai.jpg')
                        .setColor('RANDOM')
                        .setTimestamp()
                );
                console.error(error)
            });
    },
};