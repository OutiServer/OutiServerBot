const { Message } = require('discord.js');
const { inspect } = require('util');
const bot = require('../../Utils/Bot');
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
      const msg = await message.channel.send({
        content: '```以下のコードを実行してもいいですか？\n実行していい場合はokを、キャンセルする場合はnoを送信してください\n30秒経つと強制キャンセルされます```\n```js\n' + args.join(' ') + '\n```',
        allowedMentions: {
          repliedUser: false
        }
      });
      while (true) {
        const filter = msg => msg.author.id === message.author.id;
        const collected = await message.channel.awaitMessages({ filter: filter, max: 1, time: 30000 });
        const response = collected.first();
        if (!response) return msg.delete().catch(error => errorlog(message, error));
        if (response.content === 'ok') {
          let evaled;
          try {
            evaled = await eval(args.join(' '));
            const evalinsoext = inspect(evaled).length;
            message.react('844941572679794688').catch(error => errorlog(message, error));
            if (evalinsoext <= 2000) {
              msg.edit(inspect(evaled), { code: true }).catch(error => errorlog(message, error));
            }
            else {
              msg.edit({
                content: '実行結果が2000文字を超えているため送信出来ません'
              }).catch(error => errorlog(message, error));
            }
          }
          catch (error) {
            message.react('844941573422186497').catch(error => errorlog(message, error));
            msg.edit(error, { code: true }).catch(error => errorlog(message, error));
          }
          response.delete().catch(error => errorlog(message, error));
          break;
        }
        else if (response.content === 'no') {
          response.delete().catch(error => errorlog(message, error));
          msg.delete().catch(error => errorlog(message, error));
          break;
        }
      }
    } catch (error) {
      errorlog(interaction, error);
    }
    finally {
      client.cooldown.delete(message.author.id);
    }
  },
};