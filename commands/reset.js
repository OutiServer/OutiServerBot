const { Client, Message } = require("discord.js");
const SQLite = require('better-sqlite3');
const sql = new SQLite('unkoserver.db');

module.exports = {
    info: {
        name: "reset",
        description: "ALL Reset",
        usage: "[ユーザーをメンションまたはID]",
        aliases: [""],
        owneronly: false,
        adminonly: true,
        category: 'Admin'
    },

    /**
     * @param {Client} client 
     * @param {Message} message
     */

    run: async function (client, message, args) {
        const user = message.mentions.users.first() || message.guild.member(args[0]);
        if (!user) {
            message.react('816282137065947136');
            return message.reply('経験値を付与するユーザーをメンションするかIDを第一引数に入れてください！');
        }

        sql.prepare(`DELETE FROM levels WHERE user = ? AND guild = ?;`).run(user.id, message.guild.id);

        message.channel.send(`${user}の全データをリセットしました`);
    }
}