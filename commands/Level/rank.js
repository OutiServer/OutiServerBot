const { createCanvas, loadImage } = require('canvas');
const { Client, Message, MessageAttachment } = require("discord.js");
const canvacord = require("canvacord");
const { errorlog } = require('../../functions/error');

module.exports = {
    info: {
        name: "rank",
        description: "MyrankとLevel確認",
        usage: "",
        aliases: [""],
        owneronly: false,
        adminonly: false,
        category: 'Level'
    },

    /**
     * @param {Client} client
     * @param {Message} message 
     * @param {Array} args
     */

    run: async function (client, message, args) {
        try {

            message.channel.startTyping();
            const user = message.mentions.users.first() || client.users.cache.get(args[0]);

            if (user) {
                let userleveldata = client.db.prepare('SELECT * FROM levels WHERE user = ?').get(user.id);
                if (!userleveldata) {
                    userleveldata = { id: `${user.id}`, user: user.id, guild: null, level: 0, xp: 0, allxp: 0 };
                    client.db.prepare('INSERT INTO levels (id, user, guild, level, xp, allxp) VALUES (@id, @user, @guild, @level, @xp, @allxp);').run(userleveldata);
                }
                const rankimage = client.db.prepare('SELECT * FROM rankimages WHERE user = ?').get(user.id);
                if (rankimage) {
                    const rank = new canvacord.Rank()
                        .setAvatar(user.avatarURL({ format: 'png' }))
                        .setBackground('IMAGE', `./dat/images/${user.id}.png`)
                        .setCurrentXP(userleveldata.xp)
                        .setDiscriminator(user.discriminator)
                        .setLevel(userleveldata.level)
                        .setRequiredXP(userleveldata.level * 55)
                        .setStatus(user.presence.status)
                        .setUsername(user.username)
                        .setProgressBar(rankimage.barcolor)


                    rank.build()
                        .then(data => {
                            message.channel.send(new MessageAttachment(data, 'rank.png'));
                            message.channel.stopTyping();
                        });
                }
                else {
                    const rank = new canvacord.Rank()
                        .setAvatar(user.avatarURL({ format: 'png' }))
                        .setBackground('IMAGE', `./dat/images/default.png`)
                        .setCurrentXP(userleveldata.xp)
                        .setDiscriminator(user.discriminator)
                        .setLevel(userleveldata.level)
                        .setRequiredXP(userleveldata.level * 55)
                        .setStatus(user.presence.status)
                        .setUsername(user.username)
                        .setProgressBar('#ffffff');


                    rank.build()
                        .then(data => {
                            message.channel.send(new MessageAttachment(data, 'rank.png'));
                            message.channel.stopTyping();
                        });
                }
            }
            else {
                let userleveldata = client.db.prepare('SELECT * FROM levels WHERE user = ?').get(message.author.id);
                if (!userleveldata) {
                    userleveldata = { id: `${message.author.id}`, user: message.author.id, guild: null, level: 0, xp: 0, allxp: 0 };
                    client.db.prepare('INSERT INTO levels (id, user, guild, level, xp, allxp) VALUES (@id, @user, @guild, @level, @xp, @allxp);').run(userleveldata);
                }
                const rankimage = client.db.prepare('SELECT * FROM rankimages WHERE user = ?').get(message.author.id);
                if (rankimage) {
                    const rank = new canvacord.Rank()
                        .setAvatar(message.author.avatarURL({ format: 'png' }))
                        .setBackground('IMAGE', `./dat/images/${message.author.id}.png`)
                        .setCurrentXP(userleveldata.xp)
                        .setDiscriminator(message.author.discriminator)
                        .setLevel(userleveldata.level)
                        .setRequiredXP(userleveldata.level * 55)
                        .setStatus(message.author.presence.status)
                        .setUsername(message.author.username)
                        .setProgressBar(rankimage.barcolor)


                    rank.build()
                        .then(data => {
                            message.channel.send(new MessageAttachment(data, 'rank.png'));
                            message.channel.stopTyping();
                        });
                }
                else {
                    const rank = new canvacord.Rank()
                        .setAvatar(message.author.avatarURL({ format: 'png' }))
                        .setBackground('IMAGE', `./dat/images/default.png`)
                        .setCurrentXP(userleveldata.xp)
                        .setDiscriminator(message.author.discriminator)
                        .setLevel(userleveldata.level)
                        .setRequiredXP(userleveldata.level * 55)
                        .setStatus(message.author.presence.status)
                        .setUsername(message.author.username)
                        .setProgressBar('#ffffff');


                    rank.build()
                        .then(data => {
                            message.channel.send(new MessageAttachment(data, 'rank.png'));
                            message.channel.stopTyping();
                        });
                }
            }
        } catch (error) {
            errorlog(client, message, error);
        }
        finally {
            client.cooldown.set(message.author.id, false);
        }
    }
};