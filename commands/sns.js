const { Client, Message } = require('discord.js');
const { Database } = require('../unko/index');
const db = new Database('unkoserver.db');

module.exports = {
    info: {
        name: "sns",
        description: "sns宣伝券",
        usage: "",
        aliases: [""],
        botownercommand: false,
        botadmincommand: false,
        category: 'Casino'
    },

    /**
     * @param {Message} message
     * @param {Client} client
     */

    run: async function (client, message, args) {
        let usermoneydata = db.MoneyGet(message.author.id, message.guild.id);
        if (usermoneydata.ticket < 1) {
            message.react('793460058250805259');
            return message.reply('チケットが足りてないですよ 出直してきてください＾＾');
        }
        let usersnsdata = db.SnsGet(message.author.id, message.guild.id);
        if (usersnsdata.title) {
            message.react('793460058250805259');
            return message.reply('お前すでに登録済みやん！');
        }
        const reply = await message.channel.send('宣伝するタイトルを送信してください');
        const filter = msg => msg.author.id === message.author.id;
        const collected = await message.channel.awaitMessages(filter, { max: 1, time: 60000 });
        const response = collected.first();
        if (!response) return reply.edit('時間切れです...');
        usersnsdata.title = response.content;
        response.delete();
        reply.edit('宣伝するURLを送信してください');
        const filter2 = msg => msg.author.id === message.author.id;
        const collected2 = await message.channel.awaitMessages(filter2, { max: 1, time: 60000 });
        const response2 = collected2.first();
        if (!response2) return reply.edit('時間切れです...');
        usersnsdata.url = response2.content;
        response2.delete();
        usermoneydata.ticket -= 1;
        db.MoneySet(usermoneydata);
        db.SnsSet(usersnsdata);
        reply.edit('登録しました');
    },
};