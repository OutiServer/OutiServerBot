const { Message } = require("discord.js");
const bot = require('../../bot');
const { errorlog } = require("../../functions/logs/error");

module.exports = {
    info: {
        name: "close",
        description: "スレッドクローズ",
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
            if (message.channel.parentID !== '828266382277345310' && message.channel.parentID !== '821684794056245258' && message.channel.id !== '828267048807039037' && message.channel.id !== '821686383605055508') return await message.reply('そのコマンドは考案スレッドカテゴリー、お問い合わせカテゴリーでのみ使用できます。');
            await message.channel.setParent('828268142820196372');

            await message.channel.send('このスレッドをアーカイブしました。');
        } catch (error) {
            errorlog(message, error);
        }
        finally {
            client.cooldown.set(message.author.id, false);
        }
    }
}