const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    info: {
        name: "say",
        description: "Botに喋らせる",
        usage: "",
        aliases: [""],
        botownercommand: true,
        botadmincommand: false
    },

    /**
     * @param {Message} message
     * @param {Client} client
     */

    run: async function (client, message, args) {
        client.channels.cache.get(args[0]).send(args[1]);
        message.react('793460057932038145');
    },
};