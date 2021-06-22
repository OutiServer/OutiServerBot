const { Message } = require("discord.js");
const bot = require('../../bot');
const { errorlog } = require("../../functions/logs/error");

module.exports = {
    info: {
        name: "suumo",
        description: "あ❗️ スーモ❗️:new_moon_with_face:ダン:boom:ダン:boom:ダン:boom:シャーン:notes:スモ:full_moon_with_face:スモ:new_moon_with_face:スモ:full_moon_with_face:スモ:new_moon_with_face:スモ:full_moon_with_face:スモ:new_moon_with_face:ス〜〜〜モ:arrow_heading_up:スモ:new_moon_with_face:スモ:full_moon_with_face:スモ:new_moon_with_face:スモ:full_moon_with_face:スモ:new_moon_with_face:スモ:full_moon_with_face:ス～～～モ:arrow_heading_down::sun_with_face:",
        usage: "",
        aliases: [""],
        owneronly: false,
        adminonly: false,
        category: 'Omake'
    },

    /**
     * @param {bot} client 
     * @param {Message} message 
     * @param {string[]} args
     */

    run: async function (client, message, args) {
        try {
            await message.channel.send('あ❗️ スーモ❗️:new_moon_with_face:ダン:boom:ダン:boom:ダン:boom:シャーン:notes:スモ:full_moon_with_face:スモ:new_moon_with_face:スモ:full_moon_with_face:スモ:new_moon_with_face:スモ:full_moon_with_face:スモ:new_moon_with_face:ス〜〜〜モ:arrow_heading_up:スモ:new_moon_with_face:スモ:full_moon_with_face:スモ:new_moon_with_face:スモ:full_moon_with_face:スモ:new_moon_with_face:スモ:full_moon_with_face:ス～～～モ:arrow_heading_down::sun_with_face:');
        } catch (error) {
            errorlog(message, error);
        }
        finally {
            client.cooldown.set(message.author.id, false);
        }
    }
}