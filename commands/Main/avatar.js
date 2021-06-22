const { Message, MessageEmbed } = require('discord.js');
const bot = require('../../bot');
const { errorlog } = require("../../functions/logs/error");

module.exports = {
    info: {
        name: "avatar",
        description: "ユーザーのアバター画像を表示",
        usage: "[アバターを表示するユーザー]",
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
            const user = message.mentions.users.first() || client.users.cache.get(args[0]);
            if (!user) {
                await message.channel.send(
                    new MessageEmbed()
                        .setTitle(`${message.author.tag}のアバター`)
                        .setImage(message.author.avatarURL())
                        .setColor('RANDOM')
                        .setTimestamp()
                );
            }
            else {
                await message.channel.send(
                    new MessageEmbed()
                        .setTitle(`${user.tag}のアバター`)
                        .setImage(user.avatarURL())
                        .setColor('RANDOM')
                        .setTimestamp()
                );
            }
        } catch (error) {
            errorlog(message, error);
        }
        finally {
            client.cooldown.set(message.author.id, false);
        }
    }
}