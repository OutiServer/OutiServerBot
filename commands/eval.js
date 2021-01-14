const { Message, MessageEmbed } = require('discord.js');
const { Menu } = require('discord.js-menu');
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
    run: async function(client, message, args) {
      let evalMenu = new Menu(message.channel, message.author.id, [
        {
            name: 'main',
            content: new MessageEmbed()
            .setDescription('```js\n'+args.join(' ')+'```')
            .setColor('RANDOM')
            .setTimestamp(),
            reactions: {
                '793460057932038145': 'yes',
                '793460058250805259': 'delete'
            }
        },
        {
            name: 'yes',
            content: new MessageEmbed()
            .setDescription('```js\n'+args.join(' ')+'```')
            .setColor('RANDOM')
            .setTimestamp(),
            reactions: {
                '⏹': 'delete'
            }
        }
    ], 60000)
    evalMenu.start()
    evalMenu.on('pageChange', async destination => {
      if (destination.name === "yes") {
      let evaled;
      try {
        evaled = await eval(args.join(' '));
        const evalinsoext = inspect(evaled).length
        if(evalinsoext <= 2000){
          message.channel.send(new MessageEmbed()
          .setDescription('```'+inspect(evaled)+'```')
          .setColor('RANDOM')
          .setTimestamp());
        }
        else{
          message.reply(new MessageEmbed()
          .setDescription('```実行結果が2000文字を超過しているため表示できません```')
          .setColor('RANDOM')
          .setTimestamp());
        }
      }
      catch (error) {
        message.channel.send(new MessageEmbed()
          .setDescription('```'+error+'```')
          .setColor('RANDOM')
          .setTimestamp());
      }
      }
    })
    },
};