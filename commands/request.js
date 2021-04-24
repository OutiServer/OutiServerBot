const fs = require('fs');
const request = require('request');
const { Message, Client } = require("discord.js");
const { errorlog } = require('../functions/error');

module.exports = {
    info: {
        name: "request",
        description: "rank画像リクエスト",
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
            const userleveldata = client.db.prepare('SELECT * FROM levels WHERE user = ?').get(message.author.id);
            if (userleveldata.level < 10) {
                return message.reply('画像背景申請はLevel10以上になってから使用できます！');
            }

            if (message.attachments.size <= 0) {
                return message.reply('リクエストする画像を一緒に送信してください！');
            }
            message.attachments.forEach(attachment => {
                request(
                    {
                        method: 'GET',
                        url: attachment.url,
                        encoding: null
                    },
                    function (error, response, body) {
                        if (!error && response.statusCode === 200) {
                            fs.writeFileSync(`./dat/images/${message.author.id}.png`, body, 'binary');
                            if (!client.db.prepare('SELECT * FROM rankimages WHERE user = ?').get(message.author.id)) {
                                const data = {
                                    id: `${message.author.id}`,
                                    user: message.author.id,
                                    font: 80,
                                    fillStyle: '#000000',
                                    imagex: attachment.width,
                                    imagey: attachment.height,
                                    icon: 1
                                };
                                client.db.prepare('INSERT INTO rankimages (id, user, font, fillStyle, imagex, imagey, icon) VALUES (@id, @user, @font, @fillStyle, @imagex, @imagey, @icon);').run(data);
                            }
                            message.channel.send('level画像を設定しました！');
                        }
                    }
                );
            });
        } catch (error) {
            errorlog(client, message, error);
        }
        finally {
            client.cooldown.set(message.author.id, false);
        }
    }
}