const { Message, MessageEmbed } = require("discord.js");
const bot = require('../../Utils/Bot');
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
            const msg = await message.reply(
                {
                    embeds: [
                        new MessageEmbed()
                            .setTitle('dbに接続しました！')
                            .setDescription('クエリ文を送信してください！')
                            .setColor('RANDOM')
                            .setTimestamp()
                    ],
                    allowedMentions: {
                        repliedUser: false
                    }
                }
            );

            const filter = msg => msg.author.id === message.author.id;
            const collected = await message.channel.awaitMessages({ filter, max: 1, time: 60000 });
            const response = collected.first();
            if (!response) return msg.delete().catch(error => errorlog(message, error));
            const query = response.content.split(/\s+/)[0].toLowerCase();
            response.delete().catch(error => errorlog(message, error));
            if (query === 'select') {
                try {
                    msg.edit(
                        {
                            embeds: [
                                new MessageEmbed()
                                    .setTitle('実行結果')
                                    .setDescription('```\n' + JSON.stringify(client.db.prepare(response.content).get()) + '\n```')
                                    .setColor('RANDOM')
                                    .setTimestamp()
                            ]
                        }
                    ).catch(error => errorlog(message, error));
                } catch (error) {
                    msg.edit(
                        {
                            embeds: [
                                new MessageEmbed()
                                    .setTitle('実行結果')
                                    .setDescription('```' + error.stack + '\n```')
                                    .setColor('RANDOM')
                                    .setTimestamp()
                            ]
                        }
                    ).catch(error => errorlog(message, error));
                }
            }
            else if (query === 'close') {
                await msg.edit(
                    {
                        content: 'この変更でいい場合はokを、取り消す場合はnoを送信してください',
                        embeds: [
                            new MessageEmbed()
                                .setDescription('db接続を閉じて宜しいですか？')
                                .setColor('RANDOM')
                                .setTimestamp()
                        ]
                    }
                );

                while (true) {
                    const collected2 = await message.channel.awaitMessages({ filter, max: 1, time: 60000 });
                    const response2 = collected2.first();
                    if (!response2) msg.delete().catch(error => errorlog(message, error));
                    else if (response2.content === 'no') {
                        response2.delete().catch(error => errorlog(message, error));
                        msg.delete().catch(error => errorlog(message, error));
                        return;
                    }
                    else if (response2.content === 'ok') {
                        response2.delete().catch(error => errorlog(message, error));
                        break;
                    }
                }

                client.db.close();
                msg.edit(
                    {
                        embeds: [
                            new MessageEmbed()
                                .setDescription('db接続を閉じました！')
                                .setColor('RANDOM')
                                .setTimestamp()
                        ]
                    }
                ).catch(error => errorlog(message, error));
            }
            else if (['insert', 'update', 'delete'].includes(query)) {
                await msg.edit(
                    {
                        content: 'この変更でいい場合はokを、取り消す場合はnoを送信してください',
                        embeds: [
                            new MessageEmbed()
                                .setDescription('```sql\n' + response.content + '```')
                                .setColor('RANDOM')
                                .setTimestamp()
                        ]
                    }
                );

                while (true) {
                    const collected2 = await message.channel.awaitMessages({ filter, max: 1, time: 60000 });
                    const response2 = collected2.first();
                    if (!response2) return msg.delete().catch(error => errorlog(message, error));
                    else if (response2.content === 'no') {
                        response2.delete().catch(error => errorlog(message, error));
                        msg.delete().catch(error => errorlog(message, error));
                        return;
                    }
                    else if (response2.content === 'ok') {
                        response2.delete().catch(error => errorlog(message, error));
                        break;
                    }
                }

                try {
                    msg.edit(
                        {
                            embeds: [
                                new MessageEmbed()
                                    .setTitle('実行結果')
                                    .setDescription('```\n' + JSON.stringify(client.db.prepare(response.content).run()) + '\n```')
                                    .setColor('RANDOM')
                                    .setTimestamp()
                            ]
                        }
                    ).catch(error => errorlog(message, error));
                } catch (error) {
                    msg.edit(
                        {
                            embeds: [
                                new MessageEmbed()
                                    .setTitle('実行結果')
                                    .setDescription('```' + error.stack + '\n```')
                                    .setColor('RANDOM')
                                    .setTimestamp()
                            ]
                        }
                    ).catch(error => errorlog(message, error));
                }
            } else {
                msg.edit('その基本命令文は対応していません。\n`SELECT・INSERT・UPDATE・DELETE・CLOSE` のみ対応しています').catch(error => errorlog(message, error));
            }
        } catch (error) {
            errorlog(interaction, error);
        }
        finally {
            client.cooldown.delete(message.author.id);
        }
    }
}