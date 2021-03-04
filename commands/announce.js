const { Client, Message } = require('discord.js');

module.exports = {
    info: {
        name: "announce",
        description: "臨時お知らせ",
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
        if (message.member.roles.cache.has('780217228649562113')) {
            message.member.roles.remove('780217228649562113');
            message.reply('<:DeadCrew1:778271180888080394>');
        }
        else {
            message.member.roles.add('780217228649562113');
            message.reply('<:emoji_106:790546684710223882>');
        }
    },
};