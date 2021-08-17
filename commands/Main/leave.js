const { Message, MessageEmbed } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const bot = require('../../Utils/Bot');
const { errorlog } = require("../../functions/logs/error");

module.exports = {
    info: {
        name: "leave",
        description: "読み上げを終わる",
        usage: "",
        aliases: ["dc"],
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
            else if (!client.connection) {
                return message.reply(
                    {
                        content: '読み上げを開始していません',
                        allowedMentions: {
                            repliedUser: false
                        }
                    }
                ).catch(error => errorlog(message, error));
            }

            client.connection.destroy();
            client.connection = null;
            client.speekqueue = {};

            message.reply({
                content: `読み上げを終了しました`,
                allowedMentions: {
                    repliedUser: false
                }
            }).catch(error => errorlog(message, error));
        } catch (error) {
            errorlog(message, error);
        }
        finally {
            client.cooldown.delete(message.author.id);
        }
    },
};