const { Client, Message } = require('discord.js');

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
     * @param {Message} message
     * @param {Client} client
     */

    run: async function (client, message, args) {
        message.react('✅')
            .then(() => client.destroy())
            .then(() => process.exit());
    },
};