const { Message } = require("discord.js");
const bot = require('../bot');
const verify = require("./verify");
const { clienterrorlog } = require('./logs/error');

/**
 * 
 * @param {bot} client 
 * @param {Message} message 
 */

module.exports = async (client, message) => {
    try {
        if (client.levelcooldown.get(message.author.id)) return;

        const random = Math.random();
        let addxp = 0;
        let levelupmessage = '';
        let levelupflag = false;
        if (random < 0.01) { // 0.01％
            addxp = Math.ceil(Math.random() * 500) + 300;
            levelupmessage = `${message.author} あなたのレベルが{level}に上がりました！<:owovvv:855097168947314698>`;
        }
        else if (random < 0.11) { // 0.1%
            addxp += Math.ceil(Math.random() * 100) + 50;
            levelupmessage = `${message.author} あなたのレベルが{level}に上がっりました！<:owotukkomi:810436146823561256>`;
        }
        else if (random < 0.61) { //0.5%
            addxp += Math.ceil(Math.random() * 50) + 10;
            levelupmessage = `GG ${message.author}, you just advanced to level {level}!<:unkosaba:852517397020934166>`;
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

        client.db.prepare('UPDATE levels SET level = ?, xp = ?, allxp = ? WHERE user = ?').run(userleveldata.level, userleveldata.xp, userleveldata.allxp, userleveldata.user);
        verify(client, message);

        if (levelupflag) {
            await client.channels.cache.get('841287448617287711').send(levelupmessage.replace('{level}', userleveldata.level));
        }

        if (userleveldata.level >= 70) {
            await message.member.roles.add('856489888035897374');
            await message.member.roles.remove('842029135915909200');
            await message.member.roles.remove('841544161563901992');
            await message.member.roles.remove('841544098895757323');
            await message.member.roles.remove('830368022916104203');
            await message.member.roles.remove('825245951295225896');
            await message.member.roles.remove('824554360699879455');
        }
        else if (userleveldata.level >= 60) {
            await message.member.roles.remove('856489888035897374');
            await message.member.roles.add('842029135915909200');
            await message.member.roles.remove('841544161563901992');
            await message.member.roles.remove('841544098895757323');
            await message.member.roles.remove('830368022916104203');
            await message.member.roles.remove('825245951295225896');
            await message.member.roles.remove('824554360699879455');
        }
        else if (userleveldata.level >= 50) {
            await message.member.roles.remove('856489888035897374');
            await message.member.roles.remove('842029135915909200');
            await message.member.roles.add('841544161563901992');
            await message.member.roles.remove('841544098895757323');
            await message.member.roles.remove('830368022916104203');
            await message.member.roles.remove('825245951295225896');
            await message.member.roles.remove('824554360699879455');
        }
        else if (userleveldata.level >= 40) {
            await message.member.roles.remove('856489888035897374');
            await message.member.roles.remove('842029135915909200');
            await message.member.roles.remove('841544161563901992');
            await message.member.roles.add('841544098895757323');
            await message.member.roles.remove('830368022916104203');
            await message.member.roles.remove('825245951295225896');
            await message.member.roles.remove('824554360699879455');
        }
        else if (userleveldata.level >= 30) {
            await message.member.roles.remove('856489888035897374');
            await message.member.roles.remove('842029135915909200');
            await message.member.roles.remove('841544161563901992');
            await message.member.roles.remove('841544098895757323');
            await message.member.roles.add('830368022916104203');
            await message.member.roles.remove('825245951295225896');
            await message.member.roles.remove('824554360699879455');
        }
        else if (userleveldata.level >= 20) {
            await message.member.roles.remove('856489888035897374');
            await message.member.roles.remove('842029135915909200');
            await message.member.roles.remove('841544161563901992');
            await message.member.roles.remove('841544098895757323');
            await message.member.roles.remove('830368022916104203');
            await message.member.roles.add('825245951295225896');
            await message.member.roles.remove('824554360699879455');
        }
        else if (userleveldata.level >= 10) {
            await message.member.roles.remove('856489888035897374');
            await message.member.roles.remove('842029135915909200');
            await message.member.roles.remove('841544161563901992');
            await message.member.roles.remove('841544098895757323');
            await message.member.roles.remove('830368022916104203');
            await message.member.roles.remove('825245951295225896');
            await message.member.roles.add('824554360699879455');
        }

        client.levelcooldown.set(message.author.id, true);
    } catch (error) {
        clienterrorlog(error);
    }
    finally {
        client.levelcooldown.set(message.author.id, false);
    }
}