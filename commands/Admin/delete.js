const { Message } = require("discord.js");
const bot = require('../../bot');
const { errorlog } = require("../../functions/logs/error");

module.exports = {
    info: {
        name: "delete",
        description: "メッセージ削除",
        usage: "[削除するメッセージ数]",
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
            const count = Number(args[0]);
            if (!count) return await message.reply('第一引数に削除するメッセージ数を入れてください');
            await message.channel.bulkDelete(count + 1);
            await message.channel.send(`${count} messages is deleted`);
        } catch (error) {
            errorlog(message, error);
        }
        finally {
            client.cooldown.set(message.author.id, false);
        }
    }
}