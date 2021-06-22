const { Message } = require('discord.js');
const bot = require('../../bot');
const exit = require('../../functions/exit');
const { errorlog } = require("../../functions/logs/error");

module.exports = {
    info: {
        name: "exit",
        description: "再起動コマンド\nVPSに接続するのがめんどくさいからこのコマンドは作られた",
        usage: "",
        aliases: [""],
        owneronly: true,
        adminonly: false,
        category: 'Owner'
    },

    /**
     * @param {bot} client
     * @param {Message} message
     * @param {string[]} args
     */

    run: async function (client, message, args) {
        try {
            exit(client);
        } catch (error) {
            errorlog(message, error);
        }
        finally {
            client.cooldown.set(message.author.id, false);
        }
    },
};