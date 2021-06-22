const { Message, MessageEmbed } = require("discord.js");
const bot = require('../../bot');
const { errorlog } = require("../../functions/logs/error");

module.exports = {
    info: {
        name: "db",
        description: "dbに直接接続するコマンド\n開発者がいちいちプログラムに書き込むのがめんどくさいからこのコマンドは作られた",
        usage: "",
        aliases: [""],
        owneronly: true,
        adminonly: false,
        category: 'Owner'
    },

    /**
     * @param {bot} client 
     * @param {Message} message 
     * @param {string[]} args
     */

    run: async function (client, message, args) {
        try {
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
            if (!response) return await msg.delete();
            const query = response.content.split(/\s+/)[0].toLowerCase();
            await response.delete();
            if (query === 'select') {
                try {
                    await msg.edit(
                        new MessageEmbed()
                            .setTitle('実行結果')
                            .setDescription('```\n' + JSON.stringify(client.db.prepare(response.content).get()) + '\n```')
                            .setColor('RANDOM')
                            .setTimestamp()
                    );
                } catch (error) {
                    await msg.edit(
                        new MessageEmbed()
                            .setTitle('実行結果')
                            .setDescription('```' + error.stack + '\n```')
                            .setColor('RANDOM')
                            .setTimestamp()
                    );
                }
            }
            else if (query === 'close') {
                await msg.edit('この変更でいい場合はokを、取り消す場合はnoを送信してください',
                    new MessageEmbed()
                        .setDescription('db接続を閉じて宜しいですか？')
                        .setColor('RANDOM')
                        .setTimestamp()
                );

                while (true) {
                    const collected2 = await message.channel.awaitMessages(filter, { max: 1, time: 60000 });
                    const response2 = collected2.first();
                    if (!response2) await msg.delete();
                    else if (response2.content === 'no') {
                        await response2.delete();
                        await msg.delete();
                        return;
                    }
                    else if (response2.content === 'ok') {
                        await response2.delete();
                        break;
                    }
                }

                client.db.close();
                await msg.edit('',
                    new MessageEmbed()
                        .setDescription('db接続を閉じました！')
                        .setColor('RANDOM')
                        .setTimestamp()
                );
            }
            else if (['insert', 'update', 'delete'].includes(query)) {
                await msg.edit('この変更でいい場合はokを、取り消す場合はnoを送信してください',
                    new MessageEmbed()
                        .setDescription('```sql\n' + response.content + '```')
                        .setColor('RANDOM')
                        .setTimestamp()
                );

                while (true) {
                    const collected2 = await message.channel.awaitMessages(filter, { max: 1, time: 60000 });
                    const response2 = collected2.first();
                    if (!response2) return await msg.delete();
                    else if (response2.content === 'no') {
                        await response2.delete();
                        await msg.delete();
                        return;
                    }
                    else if (response2.content === 'ok') {
                        await response2.delete();
                        break;
                    }
                }

                try {
                    await msg.edit(
                        new MessageEmbed()
                            .setTitle('実行結果')
                            .setDescription('```\n' + JSON.stringify(client.db.prepare(response.content).run()) + '\n```')
                            .setColor('RANDOM')
                            .setTimestamp()
                    );
                } catch (error) {
                    await msg.edit(
                        new MessageEmbed()
                            .setTitle('実行結果')
                            .setDescription('```' + error.stack + '\n```')
                            .setColor('RANDOM')
                            .setTimestamp()
                    );
                }
            } else {
                await msg.edit('その基本命令文は対応していません。\n`SELECT・INSERT・UPDATE・DELETE・CLOSE` のみ対応しています');
            }
        } catch (error) {
            errorlog(message, error);
        }
        finally {
            client.cooldown.set(message.author.id, false);
        }
    }
}