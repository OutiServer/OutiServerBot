const { Client, Message } = require('discord.js');

module.exports = {
    info: {
        name: "allunmute",
        description: "VCにいる人全員UnMute",
        usage: "",
        aliases: [""],
        owneronly: false,
        adminonly: true,
        category: 'Admin'
    },

    /**
     * @param {Message} message
     * @param {Client} client
     */

    run: async function (client, message, args) {
        if (!message.member.voice.channelID) {
            message.react('816282137065947136');
            return message.reply("このコマンドを使用するには、ボイスチャンネルに参加する必要があります！");
        }
        message.member.voice.guild.voiceStates.cache.map(member => member.setMute(false, 'Among Us!'));
        message.reply('全員のミュート解除が終了しました！');
    }
};