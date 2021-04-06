const { Client, Message } = require('discord.js');

module.exports = {
    info: {
        name: "say",
        description: "Botに喋らせる",
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
        const channel = args[0];
        args[0] = null;
        client.channels.cache.get(channel).send(args.join(' '));
        message.react('793460057932038145');

        client.cooldown.set(message.author.id, false);
    },
};