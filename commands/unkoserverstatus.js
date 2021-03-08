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
        util.statusBedrock('126.235.33.140', { timeout: 5000 })
            .then((result) => {
                message.channel.send(
                    new MessageEmbed()
                        .attachFiles(['../../images/UnkoServerkoiyo.png'])
                        .setTitle('💩うんこサーバーの現在の状態💩')
                        .addField('IPアドレス', result.host)
                        .addField('ポート', result.port)
                        .addField('サーバーのバージョン', result.version)
                        .addField('現在参加中のメンバー', `${result.onlinePlayers}/${result.maxPlayers}人`)
                        .setImage('attachment://UnkoServerkoiyo.png')
                        .setColor('RANDOM')
                        .setTimestamp()
                );
            })
            .catch((error) => {
                message.channel.send(
                    new MessageEmbed()
                        .attachFiles(['../../images/setumeisitekudasai.jpg'])
                        .setTitle('💩うんこサーバーの現在の状態💩')
                        .setDescription('うんこサーバーは現在落ちてます')
                        .setImage('attachment://setumeisitekudasai.jpg')
                        .setColor('RANDOM')
                        .setTimestamp()
                );
                console.error(error);
            });
    },
};