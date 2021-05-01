const { Client, Message, MessageAttachment } = require("discord.js");
const { errorlog } = require("../../functions/error");

module.exports = {
    info: {
        name: "map",
        description: "Minecraftマップ",
        usage: "",
        aliases: [""],
        owneronly: false,
        adminonly: false,
        category: 'Minecraft'
    },

    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array} args 
     */

    run: async function (client, message, args) {
        try {
            message.channel.send(new MessageAttachment('dat/images/map.png', 'map.png'));
        } catch (error) {
            errorlog(client, message, error);
        }
        finally {
            client.cooldown.set(message.author.id, false);
        }
    }
}