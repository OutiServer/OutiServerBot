const { Message, MessageEmbed } = require("discord.js");
const bot = require('../../bot');
const { errorlog } = require("../../functions/logs/error");

module.exports = {
    info: {
        name: "self",
        description: "selfbot検知しました",
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
            await message.channel.send(
                new MessageEmbed()
                    .setDescription(`<@${message.author.id}>さん、selfbot検知しました\n問答無用で永BANです＾＾`)
                    .setColor('RANDOM')
                    .setTimestamp()
            );
        } catch (error) {
            errorlog(message, error);
        }
        finally {
            client.cooldown.set(message.author.id, false);
        }
    }
}