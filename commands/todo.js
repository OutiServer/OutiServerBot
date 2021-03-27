const { Client, Message, MessageEmbed } = require("discord.js");
const { Database } = require('../unko/index');
const db = new Database('unkoserver.db');

module.exports = {
    info: {
        name: "todo",
        description: "to do うんこ",
        usage: "",
        aliases: [""],
        owneronly: false,
        adminonly: false,
        category: 'Main'
    },

    /**
     * @param {Client} client 
     * @param {Message} message
     */

    run: async function (client, message, args) {
        const command = args[0];
        if (!command) {
            message.channel.send(
                new MessageEmbed()
                    .setTitle('To do うんこ')
                    .setDescription(`\`${process.env.PREFIX}todo add\` TodoListに追加する\n\`${process.env.PREFIX}todo list\` TodoのList\n\`${process.env.PREFIX}todo remove [識別番号]\` TodoListから削除する\n\`${process.env.PREFIX}todo completion [識別番号]\` Todoを完了する\n\`${process.env.PREFIX}todo edit [識別番号]\` Todo編集コマンド\n\`${process.env.PREFIX}todo allremove\` Todoから全て削除`)
                    .setColor('RANDOM')
                    .setTimestamp()
            );
        }
        else if (command === 'add') {
            const msg = await message.channel.send('Todoに追加する名前を送信してください');
            const filter = msg => msg.author.id === message.author.id;
            const collected = await message.channel.awaitMessages(filter, { max: 1, time: 30000 });
            const response = collected.first();
            if (!response) return;
            const title = response.content;
            msg.edit('追加するTodoの説明を送信してください');
            const filter2 = msg => msg.author.id === message.author.id;
            const collected2 = await message.channel.awaitMessages(filter2, { max: 1, time: 30000 });
            const response2 = collected2.first();
            if (!response2) return;
            const description = response2.content;

            let usersettingsdata = db.UserSettingget(message.author.id);
            usersettingsdata.todocount++;
            let usertododata = {
                id: `${message.author.id}-${usersettingsdata.todocount}`,
                user: message.author.id,
                count: usersettingsdata.todocount,
                title: title,
                description: description,
                completion: 0
            }
            db.Todolistset(usertododata);
            db.UserSettingset(usersettingsdata);
            msg.edit('',
                new MessageEmbed()
                    .setTitle('Todoうんこ登録完了')
                    .setDescription('以下の内容で登録しました')
                    .addField('Todo名', title)
                    .addField('説明', description)
                    .setColor('RANDOM')
                    .setTimestamp()
            );
        }
        else if (command === 'list') {
            const usertododata = db.Todolistgetall(message.author.id);
            let embeds = [];
            let count = 1;

            for (let i = 0; i < Math.ceil(usertododata.length / 10); i++) {
                embeds.push(
                    new MessageEmbed()
                        .setTitle(`${message.author.id} TodoList ${i + 1}ページ目`)
                        .setColor('RANDOM')
                        .setTimestamp()
                );
            }

            for (const data of usertododata) {
                embeds[Math.ceil(count / 10) - 1].addField(`識別番号${data.count}: ${data.title} `, data.description);
                count++;
            }

            const msg = await message.channel.send('```' + `1/${embeds.length}ページ目を表示中\nみたいページ番号を発言してください\n0を送信するか30秒経つと処理が止まります` + '```', embeds[0]);
            while (true) {
                const filter = msg => msg.author.id === message.author.id;
                const collected = await message.channel.awaitMessages(filter, { max: 1, time: 30000 });
                const response = collected.first();
                if (!response) {
                    msg.edit('');
                    break;
                }
                if (response.content === '0') {
                    response.delete();
                    msg.edit('');
                    break;
                }
                else {
                    const selectembed = Number(response.content);
                    if (selectembed > 0 && selectembed < embeds.length + 1) {
                        response.delete();
                        msg.edit('```' + `${selectembed}/${embeds.length}ページ目を表示中\nみたいページ番号を発言してください\n0を送信するか30秒経つと処理が止まります` + '```', embeds[selectembed - 1]);
                    }
                }
            }
        }
        else if (command === 'remove') {
            const todonumber = args[1];
            if (!todonumber) {
                message.react('816282137065947136');
                message.reply('第二引数に削除するTodoの識別番号を入れてください！');
            }

            if (!db.Todolistget(message.author.id, todonumber)) {
                message.react('816282137065947136');
                return message.reply('その識別番号のTodoは存在しないようです。');
            }

            db.Todoremove(message.author.id, todonumber);

            message.channel.send(`識別番号${todonumber}のTodoを削除しました`);
        }
        else if (command === 'completion') {
            const todonumber = args[1];
            if (!todonumber) {
                message.react('816282137065947136');
                message.reply('第二引数に完了するTodoの識別番号を入れてください！');
            }

            const usertododata = db.Todolistget(message.author.id, todonumber);
            if (!usertododata) {
                message.react('816282137065947136');
                return message.reply('その識別番号のTodoは存在しないようです。');
            }

            usertododata.completion = 1;
            db.Todolistset(usertododata);

            message.channel.send(`識別番号${todonumber}のTodoを完了しました！`);
        }
        else if (command === 'edit') {
            const todonumber = args[1];
            if (!todonumber) {
                message.react('816282137065947136');
                message.reply('第二引数に完了するTodoの識別番号を入れてください！');
            }

            const usertododata = db.Todolistget(message.author.id, todonumber);
            if (!usertododata) {
                message.react('816282137065947136');
                return message.reply('その識別番号のTodoは存在しないようです。');
            }

            const msg = await message.channel.send('変更する項目を送信してください、0で処理を止める\n`title`, `description`',
                new MessageEmbed()
                    .setTitle('現在の設定')
                    .addField('title', usertododata.title)
                    .addField('description', usertododata.description)
                    .setColor('RANDOM')
                    .setTimestamp()
            );

            let type = '';
            while (true) {
                const filter = msg => msg.author.id === message.author.id;
                const collected = await message.channel.awaitMessages(filter, { max: 1, time: 30000 });
                const response = collected.first();
                if (!response) {
                    msg.edit('');
                    return;
                }
                if (response.content === '0') {
                    response.delete();
                    msg.edit('');
                    return;
                }
                else if (response.content === 'title') {
                    response.delete();
                    type = 'title';
                    break;
                }
                else if (response.content === 'description') {
                    response.delete();
                    type = 'description';
                    break;
                }
            }

            if (type === 'title') {
                msg.edit('新しいTitleを送信してください', '');
                const filter = msg => msg.author.id === message.author.id;
                const collected = await message.channel.awaitMessages(filter, { max: 1, time: 30000 });
                const response = collected.first();
                if (!response) return;
                usertododata.title = response.content;
                response.delete();
                db.Todolistset(usertododata);

                msg.edit(`Titleを${usertododata.title}に変更しました`);
            }
            else if (type === 'description') {
                msg.edit('新しい説明を送信してください', '');
                const filter = msg => msg.author.id === message.author.id;
                const collected = await message.channel.awaitMessages(filter, { max: 1, time: 30000 });
                const response = collected.first();
                if (!response) return;
                usertododata.description = response.content;
                response.delete();
                db.Todolistset(usertododata);

                msg.edit(`説明を${usertododata.description}に変更しました`);
            }
        }
        else if (command === 'allremove') {
            db.Todolistremoveall(message.author.id);

            message.channel.send('あなたのTodoを全て削除しました')
        }
    }
}