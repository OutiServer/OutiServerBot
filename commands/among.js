const { Client, Message } = require('discord.js');

module.exports = {
    info: {
        name: "among",
        description: "among!",
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
        if (message.member.roles.cache.has('774593459034128395')) {
            message.member.roles.remove('774593459034128395');
            message.reply('<:yameru:774602751732219905>');
        }
        else {
            message.member.roles.add('774593459034128395');
            message.reply('<:yaruyo:774598967459446784>');
        }
    },
};