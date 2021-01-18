const { Message, MessageEmbed } = require('discord.js');
const util = require('minecraft-server-util');

module.exports = {
    info: {
        name: "serverstatus",
        description: "BotのPing値とメモリ使用率を表示",
        usage: "",
        aliases: ["ss"],
        botownercommand: false,
        botadmincommand: false
    },
/**
 * @param {Message} message
 */
    run: async function(client, message, args) {
        let timerdata = client.getTimer.get('706452606918066237').unkoserver;
        new MessageEmbed()
      .setTitle('💩うんこサーバーの現在の状態💩')
      .setDescription('うんこサーバーは現在落ちてます\nうんこ鯖が生き返るまで残り'+timerdata+'日')
      .setImage('https://media.discordapp.net/attachments/800317829962399795/800317874614829086/setumeisitekudasai.jpg')
      .setColor('RANDOM')
      .setTimestamp()
    },
};