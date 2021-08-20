const { Message } = require("discord.js");
const bot = require('../../Utils/Bot');
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
            message.channel.send({
                content: 'あ❗️ スーモ❗️:new_moon_with_face:ダン:boom:ダン:boom:ダン:boom:シャーン:notes:スモ:full_moon_with_face:スモ:new_moon_with_face:スモ:full_moon_with_face:スモ:new_moon_with_face:スモ:full_moon_with_face:スモ:new_moon_with_face:ス〜〜〜モ:arrow_heading_up:スモ:new_moon_with_face:スモ:full_moon_with_face:スモ:new_moon_with_face:スモ:full_moon_with_face:スモ:new_moon_with_face:スモ:full_moon_with_face:ス～～～モ:arrow_heading_down::sun_with_face:',
                allowedMentions: {
                    repliedUser: false
                }
            }).catch(error => errorlog(message, error));
        } catch (error) {
            errorlog(interaction, error);
        }
        finally {
            client.cooldown.delete(message.author.id);
        }
    }
}