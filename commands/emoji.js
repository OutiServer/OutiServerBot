const { Message } = require('discord.js');

module.exports = {
    info: {
        name: "emoji",
        description: "必殺絵文字人",
        usage: "",
        aliases: [""],
        botownercommand: false,
        botadmincommand: false
    },

    /**
     * @param {Message} message
     */

    run: async function (client, message, args) {
        if (message.member.roles.cache.has('717326376516190221')) {
            message.member.roles.remove('717326376516190221');
            message.reply('<:blobtukkomi:778507729517412402>');
        }
        else {
            message.member.roles.add('717326376516190221');
            message.reply('<:blobv:741467219208437800>');
        }
    },
};