const { Client, Message, MessageEmbed } = require("discord.js");
const { errorlog } = require("../../functions/logs/error");

module.exports = {
    info: {
        name: "fuck",
        description: "fuckbird",
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
            message.channel.send('https://media.discordapp.net/attachments/840154191036022794/841298027960729671/fuck.png');
        } catch (error) {
            errorlog(message, error);
        }
        finally {
            client.cooldown.set(message.author.id, false);
        }
    }
}