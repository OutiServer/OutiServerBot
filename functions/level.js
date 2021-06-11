const { Client, Message } = require("discord.js");
const verify = require("./verify");

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */

module.exports = async (client, message) => {
    if (client.levelcooldown.get(message.author.id)) return;

    const random = Math.random();
    let addxp = 0;
    let levelupmessage = '';
    let levelupflag = false;
    if (random < 0.01) { // 0.01％
        addxp = Math.ceil(Math.random() * 500) + 300;
        levelupmessage = `${message.author} あなたのレベルが{level}に上がりました！<:outi_6:848488216147394570>`;
    }
    else if (random < 0.11) { // 0.1%
        addxp += Math.ceil(Math.random() * 100) + 50;
        levelupmessage = `${message.author} あなたのレベルが{level}に上がっりました！<:outi_5:848488223633702923>`;
    }
    else if (random < 0.61) { //0.5%
        addxp += Math.ceil(Math.random() * 50) + 10;
        levelupmessage = `GG ${message.author}, you just advanced to level {level}!<:outi_7:848488215043112980>`;
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

    while (userleveldata.xp >= userleveldata.level * 55) {
        userleveldata.xp -= userleveldata.level * 55;
        userleveldata.level++;
        levelupflag = true;
    }

    if (levelupflag) {
        client.channels.cache.get('841287448617287711').send(levelupmessage.replace('{level}', userleveldata.level));
    }

    if (userleveldata.level >= 60) {
        message.member.roles.add('842029135915909200');
        message.member.roles.remove('841544161563901992');
        message.member.roles.remove('841544098895757323');
        message.member.roles.remove('830368022916104203');
        message.member.roles.remove('825245951295225896');
        message.member.roles.remove('824554360699879455');
    }
    else if (userleveldata.level >= 50) {
        message.member.roles.remove('842029135915909200');
        message.member.roles.add('841544161563901992');
        message.member.roles.remove('841544098895757323');
        message.member.roles.remove('830368022916104203');
        message.member.roles.remove('825245951295225896');
        message.member.roles.remove('824554360699879455');
    }
    else if (userleveldata.level >= 40) {
        message.member.roles.remove('842029135915909200');
        message.member.roles.remove('841544161563901992');
        message.member.roles.add('841544098895757323');
        message.member.roles.remove('830368022916104203');
        message.member.roles.remove('825245951295225896');
        message.member.roles.remove('824554360699879455');
    }
    else if (userleveldata.level >= 30) {
        message.member.roles.remove('842029135915909200');
        message.member.roles.remove('841544161563901992');
        message.member.roles.remove('841544098895757323');
        message.member.roles.add('830368022916104203');
        message.member.roles.remove('825245951295225896');
        message.member.roles.remove('824554360699879455');
    }
    else if (userleveldata.level >= 20) {
        message.member.roles.remove('842029135915909200');
        message.member.roles.remove('841544161563901992');
        message.member.roles.remove('841544098895757323');
        message.member.roles.remove('830368022916104203');
        message.member.roles.add('825245951295225896');
        message.member.roles.remove('824554360699879455');
    }
    else if (userleveldata.level >= 10) {
        message.member.roles.remove('842029135915909200');
        message.member.roles.remove('841544161563901992');
        message.member.roles.remove('841544098895757323');
        message.member.roles.remove('830368022916104203');
        message.member.roles.remove('825245951295225896');
        message.member.roles.add('824554360699879455');
    }

    client.db.prepare('UPDATE levels SET level = ?, xp = ?, allxp = ? WHERE user = ?').run(userleveldata.level, userleveldata.xp, userleveldata.allxp, userleveldata.user);
    client.levelcooldown.set(message.author.id, true);

    verify(client, message);
}