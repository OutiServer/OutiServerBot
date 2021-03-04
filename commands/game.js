const { Client, Message } = require('discord.js');

module.exports = {
    info: {
        name: "game",
        description: "ミニゲーム班",
        usage: "",
        aliases: [""],
        botownercommand: false,
        botadmincommand: false
    },
    /**
     * @param {Message} message
     * @param {Client} client
     */
    run: async function (client, message, args) {
        if (!message.member.roles.cache.has('814070465064599593')) {
            message.member.roles.add('814070465064599593');
            message.reply('<:swordthinkblue:798179591582908446> <#738899882454024323>');
        }
    },
};