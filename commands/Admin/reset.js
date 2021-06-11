const { Client, Message } = require("discord.js");
const { errorlog } = require("../../functions/error");

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
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array} args 
     */

    run: async function (client, message, args) {
        try {
            const user = message.mentions.users.first() || client.users.cache.get(args[0]);
            if (!user) return message.reply('第一引数にリセットするユーザーをメンションするか、IDを入れてください！');

            client.db.prepare('DELETE FROM levels WHERE user = ?').run(user.id);
            message.channel.send(`${user.tag}のレベルデータを削除しました`);
        } catch (error) {
            errorlog(client, message, error);
        }
        finally {
            client.cooldown.set(message.author.id, false);
        }
    }
}