const { Client, Message } = require("discord.js");

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */

module.exports = async (client, message) => {
    if (client.db.prepare('SELECT * FROM bans WHERE user = ?').get(message.author.id) || client.levelcooldown.get(message.author.id)) return;

    const random = Math.random();
    let addxp = 0;
    let levelupmessage = '';
    if (random < 0.01) { // 0.01％
        addxp = Math.ceil(Math.random() * 500) + 300;
        levelupmessage = `${message.author} あなたのレベルが{level}に上がりました！<:owoxv:816282137065947136>`;
    }
    else if (random < 0.11) { // 0.1%
        addxp += Math.ceil(Math.random() * 100) + 50;
        levelupmessage = `${message.author} あなたのレベルが{level}に上がっりました！<:owotukkomi:778507729517412402>`;
    }
    else if (random < 0.61) { //0.5%
        addxp += Math.ceil(Math.random() * 50) + 10;
        levelupmessage = `GG ${message.author}, you just advanced to level {level}!<:emoji_106:790546684710223882>`;
    }
    else {
        addxp = Math.ceil(Math.random() * 20);
        levelupmessage = `${message.author} あなたのレベルが{level}に上がったで。😉`;
    }

    let userleveldata = client.db.prepare('SELECT * FROM levels WHERE user = ?').get(message.author.id);
    if (!userleveldata) {
        userleveldata = { id: `${message.author.id}`, user: message.author.id, guild: null, level: 0, xp: 0, allxp: 0 };
        client.db.prepare('INSERT INTO levels (id, user, guild, level, xp, allxp) VALUES (@id, @user, @guild, @level, @xp, @allxp);').run(userleveldata);
    }

    userleveldata.xp += addxp;
    userleveldata.allxp += addxp;

    if (userleveldata.xp >= userleveldata.level * 55) {
        userleveldata.xp -= userleveldata.level * 55;
        userleveldata.level++;
        client.channels.cache.get('841287448617287711').send(levelupmessage.replace('{level}', userleveldata.level));
    }

    client.db.prepare('UPDATE levels SET level = ?, xp = ?, allxp = ? WHERE user = ?').run(userleveldata.level, userleveldata.xp, userleveldata.allxp, userleveldata.user);
    client.levelcooldown.set(message.author.id, true);
}