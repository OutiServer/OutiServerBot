const { Client, Message, MessageEmbed } = require("discord.js");
const { Database } = require('../home/index');
const db = new Database('unkoserver.db');

module.exports = {
    info: {
        name: "close",
        description: "スレッドクローズ",
        usage: "",
        aliases: [""],
        owneronly: false,
        adminonly: false,
        category: 'Main'
    },

    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array} args 
     */

    run: async function (client, message, args) {
        const userthreaddata = db.ThreadGet(message.author.id);
        const usersettingsdata = db.UserSettingget(message.author.id);

        if (userthreaddata.channel !== message.channel.id && usersettingsdata.admin !== 1) return message.reply('このスレッドを削除できるのはスレッド作成者か中間管理職、ニート役職を持っている人のみです！');

        message.channel.setParent('828268142820196372');

        message.channel.send('このスレッドをアーカイブしました。');
    }
}