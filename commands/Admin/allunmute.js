const { Message } = require('discord.js');
const bot = require('../../bot');
const { errorlog } = require("../../functions/logs/error");

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
     * @param {bot} client
     * @param {Message} message
     * @param {string[]} args
     */

    run: async function (client, message, args) {
        try {
            if (!message.member.voice.channelID) return await message.reply("このコマンドを使用するには、ボイスチャンネルに参加する必要があります！");
            message.member.voice.guild.voiceStates.cache.map(member => member.setMute(false));
            await message.channel.send('全員のミュート解除が終了しました！');
        } catch (error) {
            errorlog(message, error);
        }
        finally {
            client.cooldown.set(message.author.id, false);
        }
    }
};