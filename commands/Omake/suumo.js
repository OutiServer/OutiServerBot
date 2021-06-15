
const { Client, Message } = require("discord.js");
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
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array} args 
     */

    run: async function (client, message, args) {
        try {
            message.channel.send('あ❗️ スーモ❗️:new_moon_with_face:ダン:boom:ダン:boom:ダン:boom:シャーン:notes:スモ:full_moon_with_face:スモ:new_moon_with_face:スモ:full_moon_with_face:スモ:new_moon_with_face:スモ:full_moon_with_face:スモ:new_moon_with_face:ス〜〜〜モ:arrow_heading_up:スモ:new_moon_with_face:スモ:full_moon_with_face:スモ:new_moon_with_face:スモ:full_moon_with_face:スモ:new_moon_with_face:スモ:full_moon_with_face:ス～～～モ:arrow_heading_down::sun_with_face:');
        } catch (error) {
            errorlog(message, error);
        }
        finally {
            client.cooldown.set(message.author.id, false);
        }
    }
}