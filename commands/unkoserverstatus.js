const { Client, Message, MessageEmbed } = require('discord.js');
const util = require('minecraft-server-util');

module.exports = {
    info: {
        name: "unkoserverstatus",
        description: "うんこサーバーの状態を表示するコマンド",
        usage: "",
        aliases: ["uss"],
        owneronly: false,
        adminonly: false,
        category: 'Main'
    },

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {Array} args
     */

    run: async function (client, message, args) {
        message.reply(`そのコマンドは \`${process.env.PREFIX}hss\` に変更されました\n\`${process.env.PREFIX}uss\` は三日後削除されます`)
    },
};