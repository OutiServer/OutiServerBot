const fs = require('fs');
const request = require('request');
const { Client, Message } = require("discord.js");
const { errorlog } = require('../../functions/error');

module.exports = {
    info: {
        name: 'setmap',
        description: "Map画像の設定",
        usage: "",
        aliases: [""],
        owneronly: false,
        adminonly: true,
        category: 'Admin'
    },

    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array} args
     */

    run: async function (client, message, args) {
        try {
            if (message.attachments.size <= 0) {
                return message.reply('Map画像を一緒に送信してください！');
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
                            fs.writeFileSync(`./dat/images/map.png`, body, 'binary');
                            message.channel.send('Map画像を設定しました！');
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