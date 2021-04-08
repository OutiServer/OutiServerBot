const { Client, Message } = require("discord.js");
const { Database } = require('../home/index');

module.exports = {
    info: {
        name: "close",
        description: "スレッドクローズ",
        usage: "",
        aliases: [""],
        owneronly: false,
        adminonly: false,
        category: 'Admin'
    },

    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array} args 
     */

    run: async function (client, message, args) {
        if (message.channel.parentID !== '828266382277345310') return message.reply('そのコマンドは考案スレッドカテゴリーでのみ使用できます。');
        const db = new Database('unkoserver.db');
        const userthreaddata = db.ThreadGet(message.author.id);
        const usersettingsdata = db.UserSettingget(message.author.id);

        if (userthreaddata.channel !== message.channel.id && usersettingsdata.admin !== 1) return message.reply('このスレッドを削除できるのはスレッド作成者か中間管理職、ニート役職を持っている人のみです！');

        message.channel.setParent('828268142820196372');

        message.channel.send('このスレッドをアーカイブしました。');

        client.cooldown.set(message.author.id, false);
    }
}