const { Client, Message, MessageEmbed } = require('discord.js');
const { errorlog } = require('../../functions/error');

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
     * @param {Client} client
     * @param {Message} message
     * @param {Array} args
     */

    run: async function (client, message, args) {
        try {
            const messageid = args[0];
            if (!messageid) {
                message.react('816282137065947136');
                return message.reply('集計する投票のメッセージIDを入れてください！');
            }

            try {
                var msg = await message.channel.messages.fetch(messageid);
            }
            catch (e) {
                message.react('816282137065947136');
                return message.reply('投票が見つかりませんでした');
            }

            const allreacionname = msg.reactions.cache.map(reactions => reactions.emoji.name);
            const allreacioncount = msg.reactions.cache.map(reactions => reactions.count);
            let count = 0;
            let msgcontent = '';
            for (const data of allreacioncount) {
                msgcontent += `${allreacionname[count]} ${data - 1}票\n`
                count++;
            }

            message.channel.send(
                new MessageEmbed()
                    .setTitle(msg.embeds[0].title + 'の投票結果')
                    .setDescription(msgcontent)
                    .setURL(`https://discord.com/channels/${message.guild.id}/${message.channel.id}/${messageid}`)
                    .setColor(msg.embeds[0].color)
                    .setTimestamp(msg.embeds[0].timestamp)
            );
        } catch (error) {
            errorlog(client, message, error);
        }
        finally {
            client.cooldown.set(message.author.id, false);
        }
    },
};