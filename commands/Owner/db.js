const { Client, Message, MessageEmbed } = require("discord.js");
const { errorlog } = require('../../functions/error');

module.exports = {
    info: {
        name: "db",
        description: "db接続",
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
        try {
            message.react('741467219208437800');
            const msg = await message.channel.send(
                new MessageEmbed()
                    .setTitle('dbに接続しました！')
                    .setDescription('クエリ文を送信してください！')
                    .setColor('RANDOM')
                    .setTimestamp()
            );

            const filter = msg => msg.author.id === message.author.id;
            const collected = await message.channel.awaitMessages(filter, { max: 1, time: 60000 });
            const response = collected.first();
            if (!response) return msg.delete();
            const query = response.content.split(/\s+/)[0].toLowerCase();
            response.delete();
            if (query === 'select') {
                try {
                    msg.edit(
                        new MessageEmbed()
                            .setTitle('実行結果')
                            .setDescription('```\n' + JSON.stringify(client.db.prepare(response.content).get()) + '\n```')
                            .setColor('RANDOM')
                            .setTimestamp()
                    );
                } catch (error) {
                    msg.edit(
                        new MessageEmbed()
                            .setTitle('実行結果')
                            .setDescription('```' + error.stack + '\n```')
                            .setColor('RANDOM')
                            .setTimestamp()
                    );
                }
            }
            else if (query === 'close') {
                msg.edit('この変更でいい場合はokを、取り消す場合はnoを送信してください',
                    new MessageEmbed()
                        .setDescription('db接続を閉じて宜しいですか？')
                        .setColor('RANDOM')
                        .setTimestamp()
                );

                while (true) {
                    const collected2 = await message.channel.awaitMessages(filter, { max: 1, time: 60000 });
                    const response2 = collected2.first();
                    if (!response2) {
                        msg.edit('');
                        return;
                    }
                    else if (response2.content === 'no') {
                        response.delete();
                        msg.edit('');
                        return;
                    }
                    else if (response2.content === 'ok') {
                        response2.delete();
                        break;
                    }
                }

                client.db.close();
                msg.edit('',
                    new MessageEmbed()
                        .setDescription('db接続を閉じました！')
                        .setColor('RANDOM')
                        .setTimestamp()
                );
            }
            else if (['inset', 'update', 'delete'].includes(query)) {
                msg.edit('この変更でいい場合はokを、取り消す場合はnoを送信してください',
                    new MessageEmbed()
                        .setDescription('```sql\n' + response.content + '```')
                        .setColor('RANDOM')
                        .setTimestamp()
                );

                while (true) {
                    const collected2 = await message.channel.awaitMessages(filter, { max: 1, time: 60000 });
                    const response2 = collected2.first();
                    if (!response2) {
                        msg.edit('');
                        return;
                    }
                    else if (response2.content === 'no') {
                        response.delete();
                        msg.edit('');
                        return;
                    }
                    else if (response2.content === 'ok') {
                        response2.delete();
                        break;
                    }
                }

                try {
                    msg.edit(
                        new MessageEmbed()
                            .setTitle('実行結果')
                            .setDescription('```\n' + JSON.stringify(client.db.prepare(response.content).run()) + '\n```')
                            .setColor('RANDOM')
                            .setTimestamp()
                    );
                } catch (error) {
                    msg.edit(
                        new MessageEmbed()
                            .setTitle('実行結果')
                            .setDescription('```' + error.stack + '\n```')
                            .setColor('RANDOM')
                            .setTimestamp()
                    );
                }
            } else {
                msg.edit('その基本命令文は対応していません。\n`SELECT・INSERT・UPDATE・DELETE・CLOSE` のみ対応しています');
            }
        } catch (error) {
            errorlog(client, message, error);
        }
        finally {
            client.cooldown.set(message.author.id, false);
        }
    }
}