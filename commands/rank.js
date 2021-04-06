const { createCanvas, loadImage } = require('canvas');
const { Client, Message, MessageAttachment } = require("discord.js");
const { Database } = require('../home/index');
const db = new Database('unkoserver.db');

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
        message.channel.startTyping();
        const user = message.mentions.users.first() || client.users.cache.get(args[0]);
        let rankimagebuffer;

        if (user) {
            const userleveldata = db.levelget(user.id, message.guild.id);
            const rankimagedata = db.Rankimageget(user.id);

            if (!rankimagedata) {
                const canvas = createCanvas(1500, 500);
                const ctx = canvas.getContext('2d');
                const background = await loadImage('./dat/images/default.png');
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                ctx.font = '80px Impact';
                ctx.rotate(0);
                ctx.fillText(`${user.username}\n${userleveldata.level}level ${userleveldata.xp}/${55 * userleveldata.level}xp`, canvas.width / 2, canvas.height / 2);
                ctx.beginPath();
                ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.clip();
                const avatar = await loadImage(user.displayAvatarURL({ format: 'jpg' }));
                ctx.drawImage(avatar, 25, 25, 200, 200);
                rankimagebuffer = canvas.toBuffer();
            }
            else {
                const canvas = createCanvas(rankimagedata.imagex, rankimagedata.imagey);
                const ctx = canvas.getContext('2d');
                const background = await loadImage(`./dat/images/${user.id}.png`);
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                ctx.font = `${rankimagedata.font}px Impact`;
                ctx.rotate(0);
                ctx.fillText(`${user.username}\n${userleveldata.level}level ${userleveldata.xp}/${55 * userleveldata.level}xp`, canvas.width / 2, canvas.height / 2);
                if (rankimagedata.icon) {
                    ctx.beginPath();
                    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
                    ctx.closePath();
                    ctx.clip();
                    const avatar = await loadImage(user.displayAvatarURL({ format: 'jpg' }));
                    ctx.drawImage(avatar, 25, 25, 200, 200);
                }
                rankimagebuffer = canvas.toBuffer();
            }
        }
        else {
            const userleveldata = db.levelget(message.author.id, message.guild.id);
            const rankimagedata = db.Rankimageget(message.author.id);

            if (!rankimagedata) {
                const canvas = createCanvas(1500, 500);
                const ctx = canvas.getContext('2d');
                const background = await loadImage('./dat/images/default.png');
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                ctx.font = '80px Impact';
                ctx.rotate(0);
                ctx.fillText(`${message.author.username}\n${userleveldata.level}level ${userleveldata.xp}/${55 * userleveldata.level}xp`, canvas.width / 2, canvas.height / 2);
                ctx.beginPath();
                ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.clip();
                const avatar = await loadImage(message.author.displayAvatarURL({ format: 'jpg' }));
                ctx.drawImage(avatar, 25, 25, 200, 200);
                rankimagebuffer = canvas.toBuffer();
            }
            else {
                const canvas = createCanvas(rankimagedata.imagex, rankimagedata.imagey);
                const ctx = canvas.getContext('2d');
                const background = await loadImage(`./dat/images/${message.author.id}.png`);
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                ctx.font = `${rankimagedata.font}px Impact`;
                ctx.rotate(0);
                ctx.fillText(`${message.author.username}\n${userleveldata.level}level ${userleveldata.xp}/${55 * userleveldata.level}xp`, canvas.width / 2, canvas.height / 2);
                if (rankimagedata.icon) {
                    ctx.beginPath();
                    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
                    ctx.closePath();
                    ctx.clip();
                    const avatar = await loadImage(message.author.displayAvatarURL({ format: 'jpg' }));
                    ctx.drawImage(avatar, 25, 25, 200, 200);
                }
                rankimagebuffer = canvas.toBuffer();
            }
        }

        message.channel.send(new MessageAttachment(rankimagebuffer, 'rank.png'));
        message.channel.stopTyping();
    }
};