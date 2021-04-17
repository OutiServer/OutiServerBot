const { Client, Message } = require("discord.js");
const { errorlog } = require("../functions/error");
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
        try {
            if (message.channel.parentID !== '828266382277345310' && message.channel.parentID !== '821684794056245258') return message.reply('そのコマンドは考案スレッドカテゴリー、お問い合わせカテゴリーでのみ使用できます。');
            const db = new Database('unkoserver.db');
            const usersettingsdata = db.UserSettingget(message.author.id);

            if (usersettingsdata.admin !== 1) return message.reply('このスレッドを削除できるのは中間管理職、ニート役職を持っている人のみです！');

            message.channel.setParent('828268142820196372');

            message.channel.send('このスレッドをアーカイブしました。');
        } catch (error) {
            errorlog(client, message, error);
        }
        finally {
            client.cooldown.set(message.author.id, false);
        }
    }
}