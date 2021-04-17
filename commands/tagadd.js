const { Client, Message } = require("discord.js");
const { errorlog } = require("../functions/error");
const { Database } = require('../home/index');

module.exports = {
    info: {
        name: "tagadd",
        description: "ゲーマータグ追加",
        usage: "",
        aliases: [""],
        owneronly: false,
        adminonly: false,
        category: 'Minecraft'
    },

    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array} args 
     */

    run: async function (client, message, args) {
        try {
            const db = new Database('unkoserver.db');
            const usersettingsdata = db.UserSettingget(message.author.id);
            if (usersettingsdata.admin !== 1) {
                if (!args[0]) return message.reply('第一引数にあなたのゲーマータグを入れてください！');
                db.GamertagSet(message.author.id, args[0]);
                message.reply('あなたのゲーマータグをDiscordアカウントとリンクしました！');
            }
            else {
                const user = client.users.cache.get(args[0]);
                if (!user) {
                    if (!args[0]) return message.reply('第一引数にあなたのゲーマータグを入れてください！');
                    db.GamertagSet(message.author.id, args[0]);
                    message.reply('あなたのゲーマータグをDiscordアカウントとリンクしました！');
                }
                else {
                    if (!args[1]) return message.reply(`第二引数に${user.tag}のゲーマータグを入れてください！`);
                    db.GamertagSet(user.id, args[1]);
                    message.channel.send(`${user.tag}のゲーマータグをDiscordアカウントとリンクしました！`);
                }
            }
        } catch (error) {
            errorlog(client, message, error);
        }
        finally {
            client.cooldown.set(message.author.id, false);
        }
    }
}