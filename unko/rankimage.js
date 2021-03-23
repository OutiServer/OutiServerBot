const fs = require('fs');
const { User } = require("discord.js");
const jimp = require("jimp");
const dataUriToBuffer = require('data-uri-to-buffer');
const { createCanvas } = require('canvas');

class Rankimage {
    constructor() {

    }

    /**
     * @param {User} user 
     * @param {object} userleveldata
     * @param {number} fontpx
     * @param {string} color 
     * @param {number} userx 
     * @param {number} usery 
     * @param {number} levelx 
     * @param {number} levely 
     * @param {boolean} original 
     */

    createimage(user, userleveldata, fontpx, color, userx, usery, levelx, levely, original) {
        const canvas = createCanvas(1500, 700);
        const ctx = canvas.getContext('2d');

        ctx.font = `${fontpx}px Impact`;
        ctx.fillStyle = color;
        ctx.rotate(0);
        ctx.fillText(user.username, userx, usery);
        ctx.fillText(`${userleveldata.level}level ${userleveldata.xp}/${55 * userleveldata.level}xp`, levelx, levely);
        const canvasDataUrl = canvas.toDataURL();
        const decoded = dataUriToBuffer(canvasDataUrl);

        fs.writeFile('./dat/images/level.png', decoded, (err) => {
            if (err) {
                console.error(err);
                return -1;
            }

            if (original) var images = [`./dat/images/${user.id}.png`, './dat/images/level.png'];
            else var images = [`./dat/images/default.png`, './dat/images/level.png'];

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
                        return 0;
                    });
                });

        });
    }
}

module.exports = Rankimage;