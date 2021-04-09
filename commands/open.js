const { Client, Message } = require("discord.js");
const { Database } = require('../home/index');

module.exports = {
    info: {
        name: "open",
        description: "スレッド再オープン",
        usage: "",
        aliases: [""],
        owneronly: false,
        adminonly: true,
        category: 'Admin'
    },

    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array} args 
     */

    run: async function (client, message, args) {
        if (message.channel.parentID !== '828268142820196372') return message.reply('そのコマンドはスレッドアーカイブカテゴリーのみで使用できます。');
        message.channel.setParent('828266382277345310');

        message.channel.send('このスレッドを再オープンしました。');

        client.cooldown.set(message.author.id, false);
    }
}