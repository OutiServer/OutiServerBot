const { Client, Message } = require('discord.js');

module.exports = {
    info: {
        name: "allmute",
        description: "VCにいる人全員Mute",
        usage: "",
        aliases: ["a"],
        botownercommand: false,
        botadmincommand: true,
        category: 'Admin'
    },

    /**
     * @param {Message} message
     * @param {Client} client
     */

    run: async function (client, message, args) {
        if (!message.member.voice.channelID) {
            message.react('793460058250805259');
            return message.reply("このコマンドを使用するには、ボイスチャンネルに参加する必要があります！");
        }
        message.member.voice.guild.voiceStates.cache.map(member => member.setMute(true, 'Among Us!'));
        const membermute = message.member.voice.guild.voiceStates.cache.map(member => member.serverMute);
        let flag = false;
        for (const data of membermute) {
            if (data) {
                flag = true;
                break;
            }
            else {
                flag = false;
            }
        }
        if (flag) {
            message.member.voice.guild.voiceStates.cache.map(member => member.setMute(false, 'Among Us!'));
            message.reply('全員のミュート解除が終了しました！');
        }
        else {
            message.member.voice.guild.voiceStates.cache.map(member => member.setMute(true, 'Among Us!'));
            message.reply('全員のミュート解除が終了しました！\n解除するにはもう一度同じコマンドを送信するか `?allunmute を送信してください！');
        }
    }
};