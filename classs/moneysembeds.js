const { Message, MessageEmbed } = require("discord.js");

class levelsembeds {
/**
 * @param {Message} message
 */
    constructor(message, args1, args2){
        this.embeds = new MessageEmbed()
        .setTitle(`うんこ鯖所持金ランキング${args1}〜${args2}位`)
        .setFooter(`コマンド実行者 ${message.author.tag}`, message.author.avatarURL())
        .setColor('RANDOM')
        .setTimestamp();
    }
}

module.exports = levelsembeds;