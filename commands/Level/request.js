const fs = require('fs');
const request = require('request');
const { Message, MessageEmbed } = require("discord.js");
const bot = require('../../Utils/Bot');
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
            if (userleveldata.level < 10) return message.reply({
                content: 'レベル背景申請はLevel10以上になってから使用できます！',
                allowedMentions: {
                    repliedUser: false
                }
            }).catch(error => errorlog(message, error));

            if (message.attachments.size <= 0) return message.reply({
                content: '設定する画像を一緒に送信してください！',
                allowedMentions: {
                    repliedUser: false
                }
            }).catch(error => errorlog(message, error));
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
                            message.reply({
                                content: 'level画像を設定しました！',
                                allowedMentions: {
                                    repliedUser: false
                                }
                            }).catch(error => errorlog(message, error));
                        }
                        else {
                            message.reply(
                                {
                                    embeds: [
                                        new MessageEmbed()
                                            .setTitle('画像保存中にエラーが発生しました')
                                            .setDescription(`statusCode: ${response.statusCode}\n${error}`)
                                            .setColor('RANDOM')
                                            .setTimestamp()
                                    ],
                                    allowedMentions: {
                                        repliedUser: false
                                    }
                                }
                            ).catch(error => errorlog(message, error));
                            clienterrorlog(error);
                        }
                    }
                );
            });
        } catch (error) {
            errorlog(message, error);
        }
        finally {
            client.cooldown.delete(message.author.id);
        }
    }
}