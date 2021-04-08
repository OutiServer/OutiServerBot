const { Client, Message, MessageEmbed } = require('discord.js');
const { Database } = require('../home/index');

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
        const db = new Database('unkoserver.db');
        const userrankimagedata = db.Rankimageget(message.author.id);
        if (!userrankimagedata) return message.reply('あなたはまだrank画像を設定していないようです');
        const command = args[0];
        if (command === 'size') {
            const font = args[1];
            if (!font || !Number(font)) return message.reply('第二引数に文字サイズを数値で入れてください！');
            userrankimagedata.font = font;
            db.Rankimageset(userrankimagedata);
            message.channel.send(`文字サイズを${userrankimagedata.font}に設定しました！`);
        }
        else if (command === 'color') {
            const color = args[1];
            if (!color) return message.reply('第二引数に文字カラーを16進数で入れてください！');
            userrankimagedata.fillStyle = color;
            db.Rankimageset(userrankimagedata);
            message.channel.send(`文字カラーを${userrankimagedata.fillStyle}に設定しました！`);
        }
        else if (command === 'imagex') {
            const imagex = args[1];
            if (!imagex || !Number(imagex)) return message.reply('第二引数に中央からのX座標を数値で入れてください！');
            userrankimagedata.imagex = imagex;
            db.Rankimageset(userrankimagedata);
            message.channel.send(`X座標を${userrankimagedata.imagex}に設定しました！`);
        }
        else if (command === 'imagey') {
            const imagey = args[1];
            if (!imagey || !Number(imagey)) return message.reply('第二引数に中央からのY座標を数値で入れてください！');
            userrankimagedata.imagey = imagey;
            db.Rankimageset(userrankimagedata);
            message.channel.send(`X座標を${userrankimagedata.imagey}に設定しました！`);
        }
        else if (command === 'icon') {
            const icon = args[1];
            if (!icon || icon !== 'yes' && icon !== 'no') return message.reply('第二引数にiconを表示するかどうかを`yes` か `no` で入れてください！');
            if (icon === 'yes') userrankimagedata.icon = 1;
            else if (icon === 'no') userrankimagedata.icon = 0;
            db.Rankimageset(userrankimagedata);
            message.channel.send(`Iconを${userrankimagedata.icon}に設定しました！`);
        }
        else {
            message.channel.send(
                new MessageEmbed()
                    .setTitle('ranksetで設定できる項目')
                    .setDescription('`size`, `color`, `imagex`, `imagey`, `icon`')
            )
        }

        client.cooldown.set(message.author.id, false);
    }
}