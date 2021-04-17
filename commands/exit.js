const { Client, Message } = require('discord.js');
const { errorlog } = require('../functions/error');

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
            message.react('✅')
                .then(() => client.destroy())
                .then(() => process.exit());
        } catch (error) {
            errorlog(client, message, error);
        }
        finally {
            client.cooldown.set(message.author.id, false);
        }
    },
};