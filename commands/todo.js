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
                    .setDescription(`\`${process.env.PREFIX}todo add\` Todoうんこに追加する\n\`${process.env.PREFIX}todo remove\` Todoうんこから削除する\n\`${process.env.PREFIX}todo completion\` Todoを完了する\n\`${process.env.PREFIX}todo edit\` Todo編集コマンド\n\`${process.env.PREFIX}todo allremove\` Todoから全て削除\n\`${process.env.PREFIX}todo list\` TodoのList`)
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
            const tasktitle = message.content;
            msg.edit('Todoに追加する説明を送信してください');
            const filter = msg => msg.author.id === message.author.id;
            const collected = await message.channel.awaitMessages(filter, { max: 1, time: 30000 });
            const response = collected.first();
            const taskdescription = message.content;
            msg.edit('',
                new MessageEmbed()
                    .setTitle('Todoうんこ登録完了')
                    .setDescription('以下の内容で登録しました')
                    .addField('')
            )
        }
    }
}