const { Message } = require("discord.js");
const bot = require('../../Utils/Bot');
const { errorlog } = require("../../functions/logs/error");

module.exports = {
    info: {
        name: "rename",
        description: "スレッド名変更",
        usage: "",
        aliases: [""],
        owneronly: false,
        adminonly: false,
        category: 'Main'
    },

    /**
     * @param {bot} client 
     * @param {Message} message 
     * @param {string[]} args
     */

    run: async function (client, message, args) {
        try {
            if (!message.channel.isThread()) return message.reply({ content: 'そのコマンドはスレッドでのみ使用できます', allowedMentions: { repliedUser: false } }).catch(error => errorlog(message, error));
            else if (!args[0]) return message.reply({ content: '第一引数にスレッド名を入れてください', allowedMentions: { repliedUser: false } }).catch(error => errorlog(message, error));
            const threads = client.db.prepare('SELECT * FROM threads WHERE channelid = ? AND userid = ?').get(message.channel.id, message.author.id);
            if (!message.member.permissions.has('ADMINISTRATOR') && !message.member.roles.cache.has('822852335322923060') && !threads) return message.reply({ content: 'このスレッドの名前を変更することができません', allowedMentions: { repliedUser: false } }).catch(error => errorlog(message, error));
            await client.channels.cache.get('870145872762126437').threads.cache.get(message.channel.id).setName(args[0], `Renamed By ${message.author.tag}`)
            message.reply({
                content: `このスレッド名を${args[0]}に変更しました`,
                allowedMentions: {
                    repliedUser: false
                }
            }).catch(error => errorlog(message, error));
        } catch (error) {
            errorlog(message, error);
        }
        finally {
            client.cooldown.delete(message.author.id);
        }
    }
}