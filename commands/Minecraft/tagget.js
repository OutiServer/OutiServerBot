const { Message, MessageEmbed } = require("discord.js");
const bot = require('../../bot');
const { errorlog } = require("../../functions/logs/error");

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
     * @param {bot} client 
     * @param {Message} message 
     * @param {string[]} args
     */

    run: async function (client, message, args) {
        try {
            const user = message.mentions.users.first() || client.users.cache.get(args[0]);
            if (!user) {
                let usergamertag = client.db.prepare('SELECT * FROM gamertags WHERE tag = ?').get(args[0]);
                if (!usergamertag) {
                    usergamertag = client.db.prepare('SELECT * FROM gamertags WHERE user = ?').get(message.author.id);
                    if (!usergamertag) return await message.reply('あなたのゲーマータグはまだリンクされていません！');
                    await message.channel.send(
                        new MessageEmbed()
                            .addField('DiscordUserTag', message.author.tag)
                            .addField('XboxGamerTag', usergamertag.tag)
                            .setColor('RANDOM')
                            .setTimestamp()
                    );
                }
                else {
                    await message.channel.send(
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
                    if (!usergamertag) return await message.reply('あなたのゲーマータグはまだリンクされていません！');
                    await message.channel.send(
                        new MessageEmbed()
                            .addField('DiscordUserTag', message.author.tag)
                            .addField('XboxGamerTag', usergamertag.tag)
                            .setColor('RANDOM')
                            .setTimestamp()
                    );
                }
                await message.channel.send(
                    new MessageEmbed()
                        .addField('DiscordUserTag', client.users.cache.get(usergamertag.user).tag)
                        .addField('XboxGamerTag', usergamertag.tag)
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