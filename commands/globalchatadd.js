const { Client, Message } = require("discord.js");
const { Database } = require('../unko/index');
const db = new Database('unkoserver.db');

module.exports = {
    info: {
        name: "globalchatadd",
        description: "グローバルチャット追加関数",
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
        const channel = client.channels.cache.get(args[0]);
        if (!channel) return message.reply('第一引数にグローバルチャットに追加するチャンネルIDを入れてください')
        db.globalchatset(channel.id);
        message.channel.send('設定しました');
    }
}