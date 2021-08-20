const { Message, MessageEmbed } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const bot = require('../../Utils/Bot');
const { errorlog } = require("../../functions/logs/error");

module.exports = {
    info: {
        name: "join",
        description: "読み上げを開始",
        usage: "",
        aliases: [""],
        owneronly: false,
        adminonly: false,
        category: 'Main'
    },

    /**
     * @param {bot} client
     * @param {Message} message
     * @param {string[]} args
     */

    run: async function (client, message, args) {
        try {
            if (!message.member.voice.channelId) return message.reply(
                {
                    content: 'VCに接続してからこのコマンドを送信してください！',
                    allowedMentions: {
                        repliedUser: false
                    }
                }
            ).catch(error => errorlog(message, error));
            else if (client.connection) {
                return message.reply(
                    {
                        content: '既に読み上げを開始しています',
                        allowedMentions: {
                            repliedUser: false
                        }
                    }
                ).catch(error => errorlog(message, error));
            }

            client.connection = joinVoiceChannel({
                channelId: message.member.voice.channelId,
                guildId: message.guildId,
                adapterCreator: message.guild.voiceAdapterCreator
            });
            client.speekqueue = {
                channel: [message.channelId],
                message: [],
                flag: false
            };

            message.reply({
                content: `${message.member.voice.channel.name}で読み上げを開始しました！`,
                allowedMentions: {
                    repliedUser: false
                }
            }).catch(error => errorlog(message, error));
        } catch (error) {
            errorlog(interaction, error);
        }
        finally {
            client.cooldown.delete(message.author.id);
        }
    },
};