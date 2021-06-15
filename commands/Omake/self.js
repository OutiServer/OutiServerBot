const { Client, Message, MessageEmbed } = require("discord.js");
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
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array} args 
     */

    run: async function (client, message, args) {
        try {
            message.channel.send(
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