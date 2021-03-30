const { User } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');

class rankimage {
    constructor() {

    }

    /** 
     * @param {User} user 
     */

    normalimage(user, userleveldata) {
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
        return canvas.toBuffer();
    }

    /**
     * @param {User} user 
     * @param {*} userleveldata 
     * @param {*} rankimagedata 
     */

    customimage(user, userleveldata, rankimagedata) {
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
        return canvas.toBuffer();
    }
}

module.exports = rankimage;