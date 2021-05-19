const { Client, Message, MessageEmbed } = require("discord.js");
const { errorlog } = require("../../functions/error");

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
        try {
            const user = message.mentions.users.first() || client.users.cache.get(args[0]);
            if (!user) {
                let usergamertag = client.db.prepare('SELECT * FROM gamertags WHERE tag = ?').get(args[0]);
                if (!usergamertag) {
                    usergamertag = client.db.prepare('SELECT * FROM gamertags WHERE user = ?').get(message.author.id);
                    if (!usergamertag) {
                        message.react('844473484745637888');
                        return message.reply('あなたのゲーマータグはまだリンクされていません！');
                    }
                    message.channel.send(
                        new MessageEmbed()
                            .addField('DiscordUserTag', message.author.tag)
                            .addField('XboxGamerTag', usergamertag.tag)
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
                let usergamertag = client.db.prepare('SELECT * FROM gamertags WHERE user = ?').get(user.id);
                if (!usergamertag) {
                    usergamertag = client.db.prepare('SELECT * FROM gamertags WHERE user = ?').get(message.author.id);
                    if (!usergamertag) {
                        message.react('844473484745637888');
                        return message.reply('あなたのゲーマータグはまだリンクされていません！');
                    }
                    message.channel.send(
                        new MessageEmbed()
                            .addField('DiscordUserTag', message.author.tag)
                            .addField('XboxGamerTag', usergamertag.tag)
                            .setColor('RANDOM')
                            .setTimestamp()
                    );
                }
                message.channel.send(
                    new MessageEmbed()
                        .addField('DiscordUserTag', client.users.cache.get(usergamertag.user).tag)
                        .addField('XboxGamerTag', usergamertag.tag)
                        .setColor('RANDOM')
                        .setTimestamp()
                );
            }
        } catch (error) {
            errorlog(client, message, error);
        }
        finally {
            client.cooldown.set(message.author.id, false);
        }
    }
}