const { Client, Message } = require('discord.js');
const exit = require('../../functions/exit');
const { errorlog } = require("../../functions/logs/error");

module.exports = {
    info: {
        name: "exit",
        description: "終了",
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
            exit(client);
        } catch (error) {
            errorlog(message, error);
        }
        finally {
            client.cooldown.set(message.author.id, false);
        }
    },
};