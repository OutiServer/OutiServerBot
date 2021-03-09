const { Message } = require('discord.js');

module.exports = {
    info: {
        name: "seikatu",
        description: "生活要素班",
        usage: "",
        aliases: [""],
        botownercommand: false,
        botadmincommand: false
    },

    /**
     * @param {Message} message
     */

    run: async function (client, message, args) {
        if (!message.member.roles.cache.has('814095138443100191')) {
            message.member.roles.add('814095138443100191');
            message.reply('<:swordthonk:798179606166634516> <#814094638255439894>');
        }
    },
};