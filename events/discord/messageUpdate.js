const { Message, MessageEmbed } = require('discord.js');
const bot = require('../../Utils/Bot');
const { clienterrorlog } = require('../../functions/logs/error');

/**
 * @param {bot} client 
 * @param {Message} oldMessage
 * @param {Message} newMessage
 */

module.exports = async (client, oldMessage, newMessage) => {
    try {
        if (newMessage.author.id == "761562078095867916") {
            if (newMessage.embeds[0].url == "https://dissoku.net/" && newMessage.embeds[0].fields[0].name.endsWith('をアップしたよ!')) {
                await newMessage.channel.send({
                    embeds: [
                        new MessageEmbed()
                            .setDescription(`upを確認しました、一時間後にこのチャンネルで通知します`)
                            .setColor('RANDOM')
                            .setTimestamp()
                    ]
                });
                setTimeout(async () => {
                    await newMessage.channel.send(`Upしてから一時間経ちました\n\`/dissoku up\` を実行しましょう`);
                }, 3600000);
            }
            else if (newMessage.embeds[0].url == "https://dissoku.net/" && newMessage.embeds[0].fields[0].value.startsWith('間隔をあけてください')) {
                const waittime_up = newMessage.embeds[0].fields[0].value.split("間隔をあけてください")[1].split('(')[1].split(')')[0];
                await newMessage.channel.send(`Upに失敗したようです、${waittime_up}後にもう一度もう一度実行してください！`);
            }
        }
    } catch (error) {
        clienterrorlog(error);
    }
}