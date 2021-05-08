const { Client, Message, MessageEmbed } = require('discord.js');
const { errorlog } = require('../../functions/error');

module.exports = {
    info: {
        name: "rankset",
        description: "rank画像の座標調整",
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
            const userrankimagedata = client.db.prepare('SELECT * FROM rankimages WHERE user = ?').get(message.author.id);
            if (!userrankimagedata) {
                message.react('816282137065947136');
                return message.reply('あなたはまだrank画像を設定していないようです');
            }
            const command = args[0];
            if (command === 'size') {
                const font = args[1];
                if (!font || !Number(font)) return message.reply('第二引数に文字サイズを数値で入れてください！');
                userrankimagedata.font = font;
                client.db.prepare('UPDATE rankimages SET font = ? WHERE id = ?').run(userrankimagedata.font, userrankimagedata.id);
                message.channel.send(`文字サイズを${userrankimagedata.font}に設定しました！`);
            }
            else if (command === 'color') {
                const color = args[1];
                if (!color) return message.reply('第二引数に文字カラーを16進数で入れてください！');
                userrankimagedata.fillStyle = color;
                client.db.prepare('UPDATE rankimages SET fillStyle = ? WHERE id = ?').run(userrankimagedata.fillStyle, userrankimagedata.id);
                message.channel.send(`文字カラーを${userrankimagedata.fillStyle}に設定しました！`);
            }
            else if (command === 'imagex') {
                const imagex = args[1];
                if (!imagex || !Number(imagex)) return message.reply('第二引数に文字を描写するX座標を数値で入れてください！');
                userrankimagedata.imagex = imagex;
                client.db.prepare('UPDATE rankimages SET imagex = ? WHERE id = ?').run(userrankimagedata.imagex, userrankimagedata.id);
                message.channel.send(`X座標を${userrankimagedata.imagex}に設定しました！`);
            }
            else if (command === 'imagey') {
                const imagey = args[1];
                if (!imagey || !Number(imagey)) return message.reply('第二引数に文字を描写するY座標を数値で入れてください！');
                userrankimagedata.imagey = imagey;
                client.db.prepare('UPDATE rankimages SET imagey = ? WHERE id = ?').run(userrankimagedata.imagey, userrankimagedata.id);
                message.channel.send(`X座標を${userrankimagedata.imagey}に設定しました！`);
            }
            else if (command === 'icon') {
                const icon = args[1];
                if (!icon || icon !== 'on' && icon !== 'off') return message.reply('第二引数にiconを表示するかどうかを`on` か `off` で入れてください！');
                if (icon === 'on') userrankimagedata.icon = 1;
                else if (icon === 'off') userrankimagedata.icon = 0;
                client.db.prepare('UPDATE rankimages SET icon = ? WHERE id = ?').run(userrankimagedata.icon, userrankimagedata.id);
                if (userrankimagedata.icon === 1) {
                    message.channel.send(`Iconを表示するに設定しました！`);
                }
                else if (userrankimagedata.icon === 0) {
                    message.channel.send(`Iconを表示しないに設定しました！`);
                }
            }
            else {
                message.channel.send(
                    new MessageEmbed()
                        .setTitle('ranksetで設定できる項目')
                        .setDescription('`size`, `color`, `icon`, `imagex`, `imagey`')
                )
            }
        } catch (error) {
            errorlog(client, message, error);
        }
        finally {
            client.cooldown.set(message.author.id, false);
        }
    }
}