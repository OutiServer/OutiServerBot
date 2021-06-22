const { Message } = require("discord.js");
const bot = require('../../bot');
const { errorlog } = require("../../functions/logs/error");

module.exports = {
    info: {
        name: "reset",
        description: "レベルをリセット",
        usage: "[リセットするユーザー]",
        aliases: ["re"],
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
            const user = message.mentions.users.first() || client.users.cache.get(args[0]);
            if (!user) return await message.reply('第一引数にリセットするユーザーをメンションするか、IDを入れてください！');

            client.db.prepare('DELETE FROM levels WHERE user = ?').run(user.id);
            await message.channel.send(`${user.tag}のレベルデータを削除しました`);
        } catch (error) {
            errorlog(message, error);
        }
        finally {
            client.cooldown.set(message.author.id, false);
        }
    }
}