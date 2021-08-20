const { Message } = require("discord.js");
const bot = require('../../Utils/Bot');
const { errorlog } = require("../../functions/logs/error");

module.exports = {
    info: {
        name: "close",
        description: "お問合せ・スレッドクローズ",
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
            if (message.channel.parentId !== '821684794056245258' && !message.channel.isThread()) return message.reply({ content: 'そのコマンドはお問い合わせカテゴリー・スレッドでのみ使用できます', allowedMentions: { repliedUser: false } }).catch(error => errorlog(message, error));
            if (message.channel.parentId === '821684794056245258') {
                const inquirys = client.db.prepare('SELECT * FROM inquirys WHERE channelid = ? AND userid = ?').get(message.channel.id, message.author.id);
                if (!message.member.permissions.has('ADMINISTRATOR') && !message.member.roles.cache.has('822852335322923060') && !inquirys) return message.reply({ content: 'このお問い合わせを閉じることができません', allowedMentions: { repliedUser: false } }).catch(error => errorlog(message, error));
                await message.reply({
                    content: 'このお問い合わせをクローズしました',
                    allowedMentions: {
                        repliedUser: false
                    }
                });
                message.channel.setParent('828268142820196372').catch(error => errorlog(message, error));
            }
            else {
                const threads = client.db.prepare('SELECT * FROM threads WHERE channelid = ? AND userid = ?').get(message.channel.id, message.author.id);
                console.log(threads);
                if (!message.member.permissions.has('ADMINISTRATOR') && !message.member.roles.cache.has('822852335322923060') && !threads) return message.reply({ content: 'このスレッドをアーカイブすることができません', allowedMentions: { repliedUser: false } }).catch(error => errorlog(message, error));
                await message.reply({
                    content: 'このスレッドをアーカイブしました',
                    allowedMentions: {
                        repliedUser: false
                    }
                });
                client.channels.cache.get('870145872762126437').threads.cache.get(message.channel.id).setArchived(true, `Archived By ${message.author.tag}`).catch(error => errorlog(message, error));
            }
        } catch (error) {
            errorlog(interaction, error);
        }
        finally {
            client.cooldown.delete(message.author.id);
        }
    }
}