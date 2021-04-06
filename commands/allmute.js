const { Client, Message } = require('discord.js');

module.exports = {
    info: {
        name: "allmute",
        description: "VCにいる人全員Mute",
        usage: "",
        aliases: ["a"],
        owneronly: false,
        adminonly: true,
        category: 'Admin'
    },

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {Array} args
     */

    run: async function (client, message, args) {
        if (!message.member.voice.channelID) {
            return message.reply("このコマンドを使用するには、ボイスチャンネルに参加する必要があります！");
        }

        const voicemember = message.member.voice.guild.voiceStates.cache.map(member => member);
        for (const data of voicemember) {
            if (data.member.user.bot) continue;
            data.member.voice.setMute(true);
        }

        message.channel.send(`ボイスチャンネルに接続されている全員のミュートが完了しました！`);

        client.cooldown.set(message.author.id, false);
    }
};