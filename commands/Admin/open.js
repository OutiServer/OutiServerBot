const { Message } = require("discord.js");
const bot = require('../../bot');
const { errorlog } = require("../../functions/logs/error");

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
     * @param {bot} client 
     * @param {Message} message 
     * @param {string[]} args
     */

    run: async function (client, message, args) {
        try {
            if (message.channel.parentID !== '828268142820196372') return await message.reply('そのコマンドはスレッドアーカイブカテゴリーのみで使用できます。');
            await message.channel.setParent('828266382277345310');
            await message.channel.send('このスレッドを再オープンしました。');
        } catch (error) {
            errorlog(message, error);
        }
        finally {
            client.cooldown.set(message.author.id, false);
        }
    }
}