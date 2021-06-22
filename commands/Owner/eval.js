const { Message } = require('discord.js');
const { inspect } = require('util');
const bot = require('../../bot');
const { errorlog } = require("../../functions/logs/error");

module.exports = {
  info: {
    name: "eval",
    description: "環境破壊をするために作られたコマンド(大嘘)\n開発者がいちいちテストプログラムを実行するのがめんどくさいからこのコマンドは作られた",
    usage: "",
    aliases: [""],
    owneronly: true,
    adminonly: false,
    category: 'Owner'
  },

  /**
   * @param {bot} client
   * @param {Message} message
   * @param {string[]} args
   */

  run: async function (client, message, args) {
    try {
      const msg = await message.channel.send('```以下のコードを実行してもいいですか？\n実行していい場合はokを、キャンセルする場合はnoを送信してください\n30秒経つと強制キャンセルされます```\n```js\n' + args.join(' ') + '\n```');
      while (true) {
        const filter = msg => msg.author.id === message.author.id;
        const collected = await message.channel.awaitMessages(filter, { max: 1, time: 30000 });
        const response = collected.first();
        if (!response) return await msg.delete();
        if (response.content === 'ok') {
          let evaled;
          try {
            evaled = await eval(args.join(' '));
            const evalinsoext = inspect(evaled).length;
            await message.react('844941572679794688');
            if (evalinsoext <= 2000) {
              await msg.edit(inspect(evaled), { code: true });
            }
          }
          catch (error) {
            await message.react('844941573422186497');
            await msg.edit(error, { code: true });
          }
          await response.delete();
          break;
        }
        else if (response.content === 'no') {
          await response.delete();
          await msg.delete();
          break;
        }
      }
    } catch (error) {
      errorlog(message, error);
    }
    finally {
      client.cooldown.set(message.author.id, false);
    }
  },
};