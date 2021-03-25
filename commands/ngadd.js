const fs = require('fs');
const { Message } = require('discord.js');
const all_ngwords = require('../dat/json/all_ngwords.json');

module.exports = {
    info: {
        name: "ngadd",
        description: "NGワード追加",
        usage: "",
        aliases: [""],
        owneronly: false,
        adminonly: true,
        category: 'Admin'
    },

    /**
     * @param {*} client 
     * @param {Message} message 
     */

    run: async function (client, message, args) {
        const addng_word = args[0];

        if (!addng_word) {
            message.react('816282137065947136');
            return message.reply('第一引数に追加するNGワードを入れてください！');
        }

        all_ngwords.push(addng_word);

        fs.writeFile('./dat/json/all_ngwords.json', JSON.stringify(all_ngwords, null, ' '), (err) => {
            if (err) {
                console.log(err);
                return message.channel.send(err, { code: true });
            }

            message.channel.send(`${addng_word}をNGワードに追加しました！`);
        });
    }
}