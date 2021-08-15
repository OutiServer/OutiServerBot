const { Message, MessageEmbed } = require('discord.js');
const bot = require('../../Utils/Bot');
const { errorlog, clienterrorlog } = require("../../functions/logs/error");

module.exports = {
    info: {
        name: "sumpoll",
        description: "投票集計コマンド",
        usage: "[メッセージID]",
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
            const messageid = args[0];
            if (!messageid) return message.reply('集計する投票のメッセージIDを入れてください！').catch(error => errorlog(message, error));

            try {
                var msg = await message.channel.messages.fetch(messageid);
            }
            catch (e) {
                return message.reply('投票が見つかりませんでした').catch(error => errorlog(message, error));
            }

            const allreacionname = msg.reactions.cache.map(reactions => reactions.emoji.name);
            const allreacioncount = msg.reactions.cache.map(reactions => reactions.count);
            let count = 0;
            let msgcontent = '';
            for (const data of allreacioncount) {
                msgcontent += `${allreacionname[count]} ${data - 1}票\n`
                count++;
            }

            message.reply(
                {
                    embeds: [
                        new MessageEmbed()
                            .setTitle(msg.embeds[0].title + 'の投票結果')
                            .setDescription(msgcontent)
                            .setURL(`https://discord.com/channels/${message.guild.id}/${message.channel.id}/${messageid}`)
                            .setColor(msg.embeds[0].color)
                            .setTimestamp(msg.embeds[0].timestamp)
                    ],
                    allowedMentions: {
                        repliedUser: false
                    }
                }
            ).catch(error => errorlog(message, error));
        } catch (error) {
            errorlog(message, error);
        }
        finally {
            client.cooldown.delete(message.author.id);
        }
    },
};