const { Client, Message, MessageEmbed } = require("discord.js");
const { Database } = require('../home/index');

module.exports = {
    info: {
        name: "tagget",
        description: "ゲーマータグからユーザーの取得",
        usage: "",
        aliases: [""],
        owneronly: false,
        adminonly: false,
        category: 'Minecraft'
    },

    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array} args 
     */

    run: async function (client, message, args) {
        const db = new Database('unkoserver.db');
        const user = message.mentions.users.first() || client.users.cache.get(args[0]);
        if (!user) {
            const usergamertag = db.GamertagtagGet(args[0]);
            if (!usergamertag) {
                const authorgamertag = db.GamertaguserGet(message.author.id);
                message.channel.send(
                    new MessageEmbed()
                        .addField('DiscordUserTag', message.author.tag)
                        .addField('XboxGamerTag', authorgamertag.tag)
                        .setColor('RANDOM')
                        .setTimestamp()
                );
            }
            else {
                message.channel.send(
                    new MessageEmbed()
                        .addField('DiscordUserTag', client.users.cache.get(usergamertag.user).tag)
                        .addField('XboxGamerTag', usergamertag.tag)
                        .setColor('RANDOM')
                        .setTimestamp()
                );
            }
        }
        else {
            const usergamertag = db.GamertaguserGet(user.id);
            message.channel.send(
                new MessageEmbed()
                    .addField('DiscordUserTag', client.users.cache.get(usergamertag.user).tag)
                    .addField('XboxGamerTag', usergamertag.tag)
                    .setColor('RANDOM')
                    .setTimestamp()
            );
        }
    }
}