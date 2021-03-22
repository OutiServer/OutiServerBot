const { Client, MessageEmbed } = require('discord.js');
const util = require('minecraft-server-util');

/**
 * @param {Client} client
 */

module.exports = (client) => {
    client.channels.cache.get('780012050163302420').messages.fetch('800279738509426728')
        .then(msg => {
            util.statusBedrock('126.235.33.140', { timeout: 5000 })
                .then((result) => {
                    msg.edit(
                        new MessageEmbed()
                            .setTitle('💩うんこサーバーの現在の状態💩')
                            .addField('IPアドレス', result.host)
                            .addField('ポート', result.port)
                            .addField('サーバーのバージョン', result.version)
                            .addField('現在参加中のメンバー', `${result.onlinePlayers}/${result.maxPlayers}人`)
                            .setImage('https://media.discordapp.net/attachments/818411667015991297/818411780127981578/UnkoServerkoiyo.png')
                            .setColor('RANDOM')
                            .setTimestamp()
                    );
                })
                .catch((error) => {
                    msg.edit(
                        new MessageEmbed()
                            .setTitle('💩うんこサーバーの現在の状態💩')
                            .setDescription('うんこサーバーは現在落ちてます')
                            .setImage('https://media.discordapp.net/attachments/818411667015991297/818411777569325066/setumeisitekudasai.jpg')
                            .setColor('RANDOM')
                            .setTimestamp()
                    );
                    console.error(error);
                });
        });
};