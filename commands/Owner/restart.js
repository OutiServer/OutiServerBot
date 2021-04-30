const { Client, Message } = require('discord.js');
const { errorlog } = require('../../functions/error');
const { execSync } = require('child_process');

module.exports = {
    info: {
        name: "restart",
        description: "再起動",
        usage: "",
        aliases: [""],
        owneronly: true,
        adminonly: false,
        category: 'Owner'
    },

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {Array} args
     */

    run: async function (client, message, args) {
        try {
            if (!args[0]) return message.reply('第一引数におうち鯖Botのインスタンス番号を入れてください！');
            client.channels.cache.get('706452607538954263').send(`${message.author.tag}がおうち鯖Botの強制再起動を開始しました！`)
                .then(msg => execSync(`forever restart ${args[0]}`));
        } catch (error) {
            errorlog(client, message, error);
        }
        finally {
            client.cooldown.set(message.author.id, false);
        }


    },
};