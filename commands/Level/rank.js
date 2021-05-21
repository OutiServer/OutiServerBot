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

                const rank = new canvacord.Rank()
                    .setAvatar(user.avatarURL({ format: 'png' }))
                    .setLevel(userleveldata.level)
                    .setRank(0)
                    .setCurrentXP(userleveldata.xp)
                    .setRequiredXP(userleveldata.level * 55)
                    .setStatus(user.presence.status)
                    .setProgressBar("#FFFFFF", "COLOR")
                    .setUsername(user.username)
                    .setDiscriminator(user.discriminator);

                rank.build()
                    .then(data => {
                        message.channel.send(new MessageAttachment(data, 'rank.png'));
                    });
            }
            else {
                let userleveldata = client.db.prepare('SELECT * FROM levels WHERE user = ?').get(message.author.id);
                if (!userleveldata) {
                    userleveldata = { id: `${message.author.id}`, user: message.author.id, guild: null, level: 0, xp: 0, allxp: 0 };
                    client.db.prepare('INSERT INTO levels (id, user, guild, level, xp, allxp) VALUES (@id, @user, @guild, @level, @xp, @allxp);').run(userleveldata);
                }
                const rank = new canvacord.Rank()
                    .setAvatar(message.author.avatarURL({ format: 'png' }))
                    .setLevel(userleveldata.level)
                    .setRank(0)
                    .setCurrentXP(userleveldata.xp)
                    .setRequiredXP(userleveldata.level * 55)
                    .setStatus(message.author.presence.status)
                    .setProgressBar("#FFFFFF", "COLOR")
                    .setUsername(message.author.username)
                    .setDiscriminator(message.author.discriminator);

                rank.build()
                    .then(data => {
                        message.channel.send(new MessageAttachment(data, 'rank.png'));
                    });
            }


            message.channel.stopTyping();
        } catch (error) {
            errorlog(client, message, error);
        }
        finally {
            client.cooldown.set(message.author.id, false);
        }
    }
};