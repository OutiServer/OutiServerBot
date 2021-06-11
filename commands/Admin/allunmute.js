const { Client, Message } = require('discord.js');
const { errorlog } = require('../../functions/error');

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
     * @param {Client} client
     * @param {Message} message
     * @param {Array} args
     */

    run: async function (client, message, args) {
        try {
            if (!message.member.voice.channelID) return message.reply("このコマンドを使用するには、ボイスチャンネルに参加する必要があります！");

            message.member.voice.guild.voiceStates.cache.map(member => member.setMute(false));

            message.channel.send('全員のミュート解除が終了しました！');
        } catch (error) {
            errorlog(client, message, error);
        }
        finally {
            client.cooldown.set(message.author.id, false);
        }
    }
};