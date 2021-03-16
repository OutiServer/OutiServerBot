const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    info: {
        name: "ping",
        description: "BotのPing値とメモリ使用率を表示",
        usage: "",
        aliases: [""],
        owneronly: false,
        adminonly: false,
        category: 'Main'
    },

    /**
     * @param {Message} message
     * @param {Client} client
     */

    run: async function (client, message, args) {
        const used = process.memoryUsage();
        const memory = Math.round(used.rss / 1024 / 1024 * 100) / 100;
        message.channel.send(
            new MessageEmbed()
                .setDescription(`Ping値: ${client.ws.ping}ms\nメモリ使用率: ${memory}MB`)
                .setColor('RANDOM')
                .setTimestamp()
        );
    },
};