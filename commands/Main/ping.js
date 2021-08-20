const { Message, MessageEmbed } = require('discord.js');
const bot = require('../../Utils/Bot');
const { errorlog } = require("../../functions/logs/error");

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
     * @param {bot} client
     * @param {Message} message
     * @param {string[]} args
     */

    run: async function (client, message, args) {
        try {
            const used = process.memoryUsage();
            const msg = await message.reply({
                content: 'Pong!',
                allowedMentions: {
                    repliedUser: false
                }
            });
            await msg.edit({
                embeds: [
                    new MessageEmbed()
                        .setDescription(`APIPing: ${msg.createdTimestamp - message.createdTimestamp}ms\nWebSocketPing: ${client.ws.ping}ms\nメモリ使用率: ${Math.round(used.rss / 1024 / 1024 * 100) / 100}MB`)
                        .setColor('RANDOM')
                        .setTimestamp()
                ]
            }).catch(error => errorlog(message, error));
        } catch (error) {
            errorlog(interaction, error);
        }
        finally {
            client.cooldown.delete(message.author.id);
        }
    },
};