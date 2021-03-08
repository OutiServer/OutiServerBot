const { Client, MessageEmbed } = require('discord.js');
const util = require('minecraft-server-util');
const SQLite = require("better-sqlite3");
const sql = new SQLite('unkoserver.db');

/**
 * @param {Client} client
 */

module.exports = (client) => {
    client.channels.cache.get('798479605764718592').messages.fetch('799635530882744372')
        .then(msg => {
            const Win = client.getSlotsettings.get('706452606918066237').Jackpot;
            const money = client.getServerMoney.get('706452606918066237').money;
            const embed = new MessageEmbed()
                .setDescription(`現在のジャックポット: ${Win}うんコイン\n現在のうんこサーバーのお金: ${money}うんコイン`)
                .setColor('RANDOM')
                .setTimestamp();
            const top10 = sql.prepare("SELECT * FROM moneys WHERE guild = ? ORDER BY money DESC LIMIT 10;").all('706452606918066237');
            let rank = 1;
            for (const data of top10) {
                const user = client.guilds.cache.get('706452606918066237').member(data.user);
                let usertag = ''
                if (!user) {
                    usertag = '取得できないユーザー';
                }
                else {
                    usertag = user.user.tag;
                }
                embed.addFields({ name: `${rank}位: ${usertag}`, value: `${data.money}うんコイン` });
                rank++;
            }
            msg.edit(embed);
        })
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
                            .setImage('attachment://UnkoServerkoiyo.png')
                            .setColor('RANDOM')
                            .setTimestamp()
                    );
                })
                .catch((error) => {
                    msg.edit(
                        new MessageEmbed()
                            .setTitle('💩うんこサーバーの現在の状態💩')
                            .setDescription('うんこサーバーは現在落ちてます')
                            .setImage('attachment://setumeisitekudasai.jpg')
                            .setColor('RANDOM')
                            .setTimestamp()
                    );
                    console.error(error);
                });
        });
};