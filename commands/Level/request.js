const fs = require('fs');
const request = require('request');
const { Message, Client, MessageEmbed } = require("discord.js");
const { errorlog } = require("../../functions/logs/error");

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
            if (userleveldata.level < 10) return message.reply('レベル背景申請はLevel10以上になってから使用できます！');

            if (message.attachments.size <= 0) return message.reply('設定する画像を一緒に送信してください！');
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
                                client.db.prepare('INSERT INTO rankimages VALUES (?, ?, ?)').run(message.author.id, message.author.id, '#ffffff');
                            }
                            message.channel.send('level画像を設定しました！');
                        }
                        else {
                            message.channel.send(
                                new MessageEmbed()
                                    .setTitle('画像保存中にエラーが発生しました')
                                    .setDescription(`statusCode: ${response.statusCode}\n${error}`)
                                    .setColor('RANDOM')
                                    .setTimestamp()
                            );
                        }
                    }
                );
            });
        } catch (error) {
            errorlog(message, error);
        }
        finally {
            client.cooldown.set(message.author.id, false);
        }
    }
}