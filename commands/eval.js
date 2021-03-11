const { Message, MessageEmbed } = require('discord.js');
const { Menu } = require('discord.js-menu');
const { json } = require('express');
const { inspect } = require('util');

module.exports = {
  info: {
    name: "eval",
    description: "jsのコードを実行するなんか",
    usage: "",
    aliases: [""],
    botownercommand: true,
    botadmincommand: false
  },

  /**
   * @param {Message} message
   */

  run: async function (client, message, args) {
    let evaled;
    try {
      evaled = await eval(args.join(' '));
      message.channel.send(inspect(evaled), { code: true, split: true });
      console.log(inspect(evaled));
    }
    catch (error) {
      console.error(error);
      message.reply(error, { code: true });
    }
  },
};