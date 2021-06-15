const { Client, Message } = require("discord.js");
const { clienterrorlog } = require('./logs/error');
const verify = require('../dat/json/verify.json');

/**
 * @param {Client} client 
 * @param {Message} message 
 */

module.exports = async (client, message) => {
    try {
        let verifyRelease = false;
        let verifymessage = '称号を獲得しました！\n```diff\n';

        if (client.db.prepare('SELECT * FROM levels WHERE user = ?').get(message.author.id).level >= 50) {
            if (!client.db.prepare('SELECT * FROM verifys WHERE user = ? AND verifynumber = ?').get(message.author.id, 0)) {
                verifymessage += '+ 自宅警備員\n';
                verifyRelease = true;
                const verifydata = {
                    id: `${message.author.id}-0`,
                    user: message.author.id,
                    verifynumber: 0
                };
                client.db.prepare('INSERT INTO verifys (id, user, verifynumber) VALUES (@id, @user, @verifynumber);').run(verifydata);
            }
        }

        if (client.db.prepare('SELECT * FROM levels WHERE user = ?').get(message.author.id).level >= 30) {
            if (!client.db.prepare('SELECT * FROM verifys WHERE user = ? AND verifynumber = ?').get(message.author.id, 3)) {
                verifymessage += '+ 必殺絵文字人\n';
                verifyRelease = true;
                const verifydata = {
                    id: `${message.author.id}-3`,
                    user: message.author.id,
                    verifynumber: 3
                };
                client.db.prepare('INSERT INTO verifys (id, user, verifynumber) VALUES (@id, @user, @verifynumber);').run(verifydata);

                await message.member.roles.add('717326376516190221');
            }
        }

        if (message.member.roles.cache.has('739473593674629120')) {
            if (!client.db.prepare('SELECT * FROM verifys WHERE user = ? AND verifynumber = ?').get(message.author.id, 1)) {
                verifymessage += '+ おうち鯖貢献者\n';
                verifyRelease = true;
                const verifydata = {
                    id: `${message.author.id}-1`,
                    user: message.author.id,
                    verifynumber: 1
                };
                client.db.prepare('INSERT INTO verifys (id, user, verifynumber) VALUES (@id, @user, @verifynumber);').run(verifydata);
            }
        }

        if (message.member.roles.cache.size >= 5) {
            if (!client.db.prepare('SELECT * FROM verifys WHERE user = ? AND verifynumber = ?').get(message.author.id, 2)) {
                verifymessage += '+ ロールは多い方がかっこいい\n';
                verifyRelease = true;
                const verifydata = {
                    id: `${message.author.id}-2`,
                    user: message.author.id,
                    verifynumber: 2
                };
                client.db.prepare('INSERT INTO verifys (id, user, verifynumber) VALUES (@id, @user, @verifynumber);').run(verifydata);
            }
        }

        if (message.content.length >= 30) {
            if (!client.db.prepare('SELECT * FROM verifys WHERE user = ? AND verifynumber = ?').get(message.author.id, 4)) {
                verifymessage += '+ お前饒舌だな\n';
                verifyRelease = true;
                const verifydata = {
                    id: `${message.author.id}-4`,
                    user: message.author.id,
                    verifynumber: 4
                };
                client.db.prepare('INSERT INTO verifys (id, user, verifynumber) VALUES (@id, @user, @verifynumber);').run(verifydata);
            }
        }

        if (message.channel.id === '796734095043461180') {
            if (!client.db.prepare('SELECT * FROM verifys WHERE user = ? AND verifynumber = ?').get(message.author.id, 5)) {
                verifymessage += '+ TAOの勇者\n';
                verifyRelease = true;
                const verifydata = {
                    id: `${message.author.id}-5`,
                    user: message.author.id,
                    verifynumber: 5
                };
                client.db.prepare('INSERT INTO verifys (id, user, verifynumber) VALUES (@id, @user, @verifynumber);').run(verifydata);
            }
        }

        if (verifyRelease) {
            await message.reply(verifymessage + '\n```');
        }
    } catch (error) {
        clienterrorlog(error);
    }
}