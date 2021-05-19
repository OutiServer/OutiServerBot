const { Client, Message } = require("discord.js");
const { errorlog } = require("../../functions/error");

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
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array} args 
     */

    run: async function (client, message, args) {
        try {
            if (message.channel.parentID !== '828266382277345310' && message.channel.parentID !== '821684794056245258' && message.channel.id !== '828267048807039037' && message.channel.id !== '821686383605055508') {
                message.react('844473484745637888');
                return message.reply('そのコマンドは考案スレッドカテゴリー、お問い合わせカテゴリーでのみ使用できます。');
            }
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