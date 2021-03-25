const fs = require('fs');
const jimp = require("jimp");
const dataUriToBuffer = require('data-uri-to-buffer');
const { createCanvas, loadImage } = require('canvas');
const { Client, Message, MessageAttachment } = require("discord.js");
const { Database } = require('../unko/index');
const rankimage = require('../dat/json/rankimage.json');
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
     */

    run: async function (client, message, args) {
        message.channel.startTyping();
        const user = message.mentions.users.first() || client.users.cache.get(args[0]);

        if (user) {
            const userleveldata = db.levelget(user.id, message.guild.id);
            const canvas = createCanvas(1500, 700);
            const ctx = canvas.getContext('2d');
            const rankimagedata = rankimage[user.id];

            if (!rankimagedata) {
                ctx.font = '80px Impact';
                ctx.rotate(0);
                const avatar = await loadImage(user.displayAvatarURL({ format: 'jpg' }));
                ctx.drawImage(avatar, 25, 25, 200, 200);
                ctx.fillText(`${user.username}\n${userleveldata.level}level ${userleveldata.xp}/${55 * userleveldata.level}xp`, 500, 200);
                const canvasDataUrl = canvas.toDataURL();
                const decoded = dataUriToBuffer(canvasDataUrl);

                fs.writeFile('./dat/images/level.png', decoded, (err) => {
                    if (err) return console.log(err);

                    var images = ['./dat/images/default.png', './dat/images/level.png'];
                    var jimps = [];
                    for (var i = 0; i < images.length; i++) {
                        jimps.push(jimp.read(images[i]));
                    }

                    Promise.all(jimps)
                        .then(function () {
                            return Promise.all(jimps);
                        })
                        .then(function (data) {
                            data[0].composite(data[1], 0, 0);
                            data[0].write('./dat/images/rank.png', function () {
                                message.channel.send(new MessageAttachment('./dat/images/rank.png'));
                                message.channel.stopTyping();
                            });
                        });
                });
            }
            else {
                ctx.font = `${rankimagedata.font}px Impact`;
                ctx.fillStyle = rankimagedata.fillStyle;
                ctx.rotate(0);
                ctx.fillText(`${user.username}`, rankimagedata.usernamex, rankimagedata.usernamey);
                ctx.fillText(`${userleveldata.level}level ${userleveldata.xp}/${55 * userleveldata.level}xp`, rankimagedata.levelx, rankimagedata.levely);
                const canvasDataUrl = canvas.toDataURL();
                const decoded = dataUriToBuffer(canvasDataUrl);

                fs.writeFile('./dat/images/level.png', decoded, (err) => {
                    if (err) return console.log(err);

                    var images = [`./dat/images/${user.id}.png`, './dat/images/level.png'];
                    var jimps = [];
                    for (var i = 0; i < images.length; i++) {
                        jimps.push(jimp.read(images[i]));
                    }

                    Promise.all(jimps)
                        .then(function () {
                            return Promise.all(jimps);
                        })
                        .then(function (data) {
                            data[0].composite(data[1], 0, 0);
                            data[0].write('./dat/images/rank.png', function () {
                                message.channel.send(new MessageAttachment('./dat/images/rank.png'));
                                message.channel.stopTyping();
                            });
                        });

                });
            }
        }
        else {
            const userleveldata = db.levelget(message.author.id, message.guild.id);
            const canvas = createCanvas(1500, 700);
            const ctx = canvas.getContext('2d');
            const rankimagedata = rankimage[message.author.id];

            if (!rankimagedata) {
                ctx.font = '80px Impact';
                ctx.rotate(0);
                const avatar = await loadImage(message.author.displayAvatarURL({ format: 'jpg' }));
                ctx.drawImage(avatar, 25, 25, 200, 200);
                ctx.fillText(`${message.author.username}\n${userleveldata.level}level ${userleveldata.xp}/${55 * userleveldata.level}xp`, 500, 200);
                const canvasDataUrl = canvas.toDataURL();
                const decoded = dataUriToBuffer(canvasDataUrl);

                fs.writeFile('./dat/images/level.png', decoded, (err) => {
                    if (err) return console.log(err);

                    var images = ['./dat/images/default.png', './dat/images/level.png'];
                    var jimps = [];
                    for (var i = 0; i < images.length; i++) {
                        jimps.push(jimp.read(images[i]));
                    }

                    Promise.all(jimps)
                        .then(function () {
                            return Promise.all(jimps);
                        })
                        .then(function (data) {
                            data[0].composite(data[1], 0, 0);
                            data[0].write('./dat/images/rank.png', function () {
                                message.channel.send(new MessageAttachment('./dat/images/rank.png'));
                                message.channel.stopTyping();
                            });
                        });
                });
            }
            else {
                ctx.font = `${rankimagedata.font}px Impact`;
                ctx.fillStyle = rankimagedata.fillStyle;
                ctx.rotate(0);
                ctx.fillText(`${message.author.username}`, rankimagedata.usernamex, rankimagedata.usernamey);
                ctx.fillText(`${userleveldata.level}level ${userleveldata.xp}/${55 * userleveldata.level}xp`, rankimagedata.levelx, rankimagedata.levely);
                const canvasDataUrl = canvas.toDataURL();
                const decoded = dataUriToBuffer(canvasDataUrl);

                fs.writeFile('./dat/images/level.png', decoded, (err) => {
                    if (err) return console.log(err);

                    var images = [`./dat/images/${message.author.id}.png`, './dat/images/level.png'];
                    var jimps = [];
                    for (var i = 0; i < images.length; i++) {
                        jimps.push(jimp.read(images[i]));
                    }

                    Promise.all(jimps)
                        .then(function () {
                            return Promise.all(jimps);
                        })
                        .then(function (data) {
                            data[0].composite(data[1], 0, 0);
                            data[0].write('./dat/images/rank.png', function () {
                                message.channel.send(new MessageAttachment('./dat/images/rank.png'));
                                message.channel.stopTyping();
                            });
                        });

                });
            }
        }

    }
};