const { Client, Message } = require('discord.js');

module.exports = {
    info: {
        name: "allmute",
        description: "VCにいる人全員Mute",
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
        message.member.voice.guild.voiceStates.cache.map(member => member.setMute(true, 'Among Us!'));
        message.reply('全員のミュートが終了しました！\n解除するには `?allunmute` を送信してください！');
    }
};