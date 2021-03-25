const { Message } = require("discord.js");
const { Database } = require('../unko/index');
const db = new Database('unkoserver.db');

module.exports = {
    info: {
        name: "add",
        description: "ユーザーに経験値追加",
        usage: "[ユーザーをメンションまたはID] [付与する経験値]",
        aliases: [""],
        owneronly: false,
        adminonly: true,
        category: 'Admin'
    },

    /**
     * @param {*} client 
     * @param {Message} message 
     */

    run: async function (client, message, args) {
        const user = message.mentions.users.first() || message.guild.member(args[0]);
        if (!user) {
            message.react('816282137065947136');
            return message.reply('経験値を付与するユーザーをメンションするかIDを第一引数に入れてください！');
        }

        const addxp = Number(args[1]);
        if (!addxp) {
            message.react('816282137065947136');
            return message.reply('経験値を付与する数を第二引数に入れてください！');
        }

        let userleveldata = db.levelget(user.id, message.guild.id);

        userleveldata.xp += addxp;
        userleveldata.allxp += addxp;

        db.levelset(userleveldata);

        message.channel.send(`${user}に${addxp}経験値付与しました！`);
    }
}