const { Client, Message, MessageEmbed } = require("discord.js");
const { Database } = require('../unko/index');
const db = new Database('unkoserver.db');

module.exports = {
    info: {
        name: "db",
        description: "db操作",
        usage: "",
        aliases: [""],
        owneronly: true,
        adminonly: false,
        category: 'Owner'
    },

    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array} args 
     */

    run: async function (client, message, args) {
        const msg = await message.channel.send(
            new MessageEmbed()
                .setTitle('dbに接続しました')
                .setDescription('sqlite3構文を送信してください')
                .setColor('RANDOM')
                .setTimestamp()
        );
        const filter = msg => msg.author.id === message.author.id;
        const collected = await message.channel.awaitMessages(filter, { max: 1, time: 30000 });
        const response = collected.first();
        if (!response) return;
        msg.edit(
            new MessageEmbed()
                .setTitle('以下のsqlite3構文を実行していいですか？\n実行していい場合はokを、キャンセルする場合はnoを送信してください')
                .setColor('RANDOM')
                .setTimestamp()
        );
        while (true) {
            const collected1 = await message.channel.awaitMessages(filter, { max: 1, time: 30000 });
            const response1 = collected1.first();
            if (!response1) {
                msg.delete();
                break;
            }
            if (response.content === 'ok') {
                response.delete();
                break;
            }
            else if (response.content === 'no') {
                response.delete();
                msg.delete();
                return;
            }
        }
        if (response.content.startsWith('SELECT')) {
            msg.edit(
                new MessageEmbed()
                    .setDescription(db.sql.prepare(response.content).get())
                    .setColor('RANDOM')
                    .setTimestamp()
            )
        }
        else if (response.content.startsWith('INSERT') || response.content.startsWith('DELETE')) {
            msg.edit(
                new MessageEmbed()
                    .setDescription(db.sql.prepare(response.content).run())
                    .setColor('RANDOM')
                    .setTimestamp()
            )
        }
        else {
            msg.edit(
                new MessageEmbed()
                    .setDescription('error: 対応してない構文')
                    .setColor('RANDOM')
                    .setTimestamp()
            );
        }
    }
}