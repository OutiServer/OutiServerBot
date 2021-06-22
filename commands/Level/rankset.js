const { Message, MessageEmbed } = require('discord.js');
const bot = require('../../bot');
const { errorlog } = require("../../functions/logs/error");

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
     * @param {bot} client 
     * @param {Message} message 
     * @param {string[]} args
     */

    run: async function (client, message, args) {
        try {
            const userrankimagedata = client.db.prepare('SELECT * FROM rankimages WHERE user = ?').get(message.author.id);
            if (!userrankimagedata) return await message.reply('あなたはまだrank画像を設定していないようです');
            const command = args[0];
            if (command === 'color') {
                const color = args[1];
                if (!color) return await message.reply('第二引数に文字カラーを16進数で入れてください！');
                userrankimagedata.barcolor = color;
                client.db.prepare('UPDATE rankimages SET barcolor = ? WHERE id = ?').run(userrankimagedata.barcolor, userrankimagedata.id);
                await message.channel.send(`文字カラーを${userrankimagedata.barcolor}に設定しました！`);
            }
            else {
                await message.channel.send(
                    new MessageEmbed()
                        .setTitle('ranksetで設定できる項目')
                        .setDescription('`color`')
                        .setColor('RANDOM')
                        .setTimestamp()
                );
            }
        } catch (error) {
            errorlog(message, error);
        }
        finally {
            client.cooldown.set(message.author.id, false);
        }
    }
}