const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    info: {
        name: "sumpoll",
        description: "投票集計コマンド",
        usage: "[メッセージID]",
        aliases: [""],
        botownercommand: false,
        botadmincommand: false
    },
/**
 * @param {Message} message
 * @param {Client} client
 */
    run: async function(client, message, args) {
        const messageid = args[0];
        if(!messageid) return message.reply('集計する投票のメッセージIDを入れてください！');
        try{
            var msg = await message.channel.messages.fetch(messageid);
        }
        catch(e){
            return message.channel.send('投票が見つかりませんでした');
        }
        const allreacionname = msg.reactions.cache.map(reactions => reactions.emoji.name+reactions.count+'票');
            const reaction = allreacionname.join('\n');
            message.channel.send(
              new MessageEmbed()
              .setDescription(reaction)
              .setColor('RANDOM')
              .setTimestamp()
            );
    },
};