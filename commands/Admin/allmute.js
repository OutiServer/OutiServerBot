const { Message } = require('discord.js');
const bot = require('../../bot');
const { errorlog } = require("../../functions/logs/error");

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
     * @param {bot} client
     * @param {Message} message
     * @param {string[]} args
     */

    run: async function (client, message, args) {
        try {
            if (!message.member.voice.channelID) return await message.reply("このコマンドを使用するには、ボイスチャンネルに参加する必要があります！");

            const voicemember = message.member.voice.guild.voiceStates.cache.map(member => member);
            for (const data of voicemember) {
                if (data.member.user.bot) continue;
                await data.member.voice.setMute(true);
            }
            await message.channel.send(`ボイスチャンネルに接続されている全員のミュートが完了しました！`);
        } catch (error) {
            errorlog(message, error);
        }
        finally {
            client.cooldown.set(message.author.id, false);
        }
    }
};