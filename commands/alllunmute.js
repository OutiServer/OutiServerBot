const { Client, Message } = require('discord.js');

module.exports = {
    info: {
        name: "allunmute",
        description: "VCにいる人全員UnMute",
        usage: "",
        aliases: [""],
        botownercommand: false,
        botadmincommand: true
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
        message.member.voice.guild.voiceStates.cache.map(member => member.setMute(false, 'Among Us!'));
        message.reply('全員のミュート解除が終了しました！');
    }
};