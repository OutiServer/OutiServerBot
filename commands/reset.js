const { Client, Message } = require("discord.js");
const { Database } = require('../unko/index');
const db = new Database();

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
     * @param {Array} args
     */

    run: async function (client, message, args) {
        const user = message.mentions.users.first() || message.guild.member(args[0]);
        if (!user) {
            return message.reply('全データをリセットするユーザーをメンションするかIDを第一引数に入れてください！');
        }

        db.sql.prepare(`DELETE FROM levels WHERE user = ? AND guild = ?`).run(user.id, message.guild.id);

        message.channel.send(`${user}の全データをリセットしました`);
    }
}