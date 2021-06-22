const fs = require('fs');
const request = require('request');
const { Message, MessageEmbed } = require("discord.js");
const bot = require('../../bot');
const { errorlog, clienterrorlog } = require("../../functions/logs/error");

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
     * @param {bot} client 
     * @param {Message} message 
     * @param {string[]} args
     */

    run: async function (client, message, args) {
        try {
            const userleveldata = client.db.prepare('SELECT * FROM levels WHERE user = ?').get(message.author.id);
            if (userleveldata.level < 10) return await message.reply('レベル背景申請はLevel10以上になってから使用できます！');

            if (message.attachments.size <= 0) return await message.reply('設定する画像を一緒に送信してください！');
            message.attachments.forEach(attachment => {
                request(
                    {
                        method: 'GET',
                        url: attachment.url,
                        encoding: null
                    },
                    async function (error, response, body) {
                        if (!error && response.statusCode === 200) {
                            fs.writeFileSync(`./dat/images/${message.author.id}.png`, body, 'binary');
                            if (!client.db.prepare('SELECT * FROM rankimages WHERE user = ?').get(message.author.id)) {
                                client.db.prepare('INSERT INTO rankimages VALUES (?, ?, ?)').run(message.author.id, message.author.id, '#ffffff');
                            }
                            await message.channel.send('level画像を設定しました！');
                        }
                        else {
                            await message.channel.send(
                                new MessageEmbed()
                                    .setTitle('画像保存中にエラーが発生しました')
                                    .setDescription(`statusCode: ${response.statusCode}\n${error}`)
                                    .setColor('RANDOM')
                                    .setTimestamp()
                            );
                            clienterrorlog(error);
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