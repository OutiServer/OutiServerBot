const { Client, Message } = require("discord.js");

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
        message.channel.send('https://media.discordapp.net/attachments/825231334657884161/830039219710722058/image0.png');
    }
}