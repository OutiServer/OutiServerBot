const { MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');
const { SlashCommandBuilder, codeBlock } = require('@discordjs/builders');
const { inspect } = require('util');
const { errorlog, commanderror_message } = require('../../functions/error');
const emojis = require('../../../dat/json/emojis.json');

module.exports = {
  info: {
    name: 'eval',
    description: '環境破壊をするために作られたコマンド(大嘘)\n開発者がいちいちテストプログラムを実行するのがめんどくさいからこのコマンドは作られた',
    usage: '[評価するコード]',
    aliases: [],
    category: 'owner',
  },

  data: new SlashCommandBuilder()
    .setName('eval')
    .setDescription('環境破壊をするために作られたコマンド(大嘘)\n開発者がいちいちテストプログラムを実行するのがめんどくさいからこのコマンドは作られた')
    .addStringOption(option => {
      option.setName('code');
      option.setDescription('評価するコード');
      option.setRequired(true);

      return option;
    }),

  /**
     * @param {import('../../utils/Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

  run: async function (client, interaction) {
    try {
      const buttons = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('ok')
            .setEmoji(emojis.owov)
            .setStyle('PRIMARY'),
          new MessageButton()
            .setCustomId('no')
            .setEmoji(emojis.owox)
            .setStyle('PRIMARY'),
        );

      const msg = await interaction.followUp({
        content: `${codeBlock('以下のコードを実行してもいいですか？\n実行していい場合はokを、キャンセルする場合はnoを送信してください\n30秒経つと強制キャンセルされます')}${codeBlock('js', interaction.options.getString('code'))}`,
        components: [buttons],
      });

      const filter = (i) => (i.customId === 'ok' || i.customId === 'no') && i.user.id === interaction.user.id;
      const response2 = await msg.awaitMessageComponent({ filter, componentType: 'BUTTON', max: 1, time: 60000 });
      if (!response2) {
        return await interaction.deleteReply();
      }
      else if (response2.customId === 'no') {
        await interaction.deleteReply();
      }
      else if (response2.customId === 'ok') {
        let evaled;
        try {
          evaled = await eval(interaction.options.getString('code'));
          const evalinsoext = inspect(evaled).length;
          if (evalinsoext <= 2000) {
            await interaction.editReply({
              content: codeBlock(inspect(evaled)),
              components: [],
            });
          }
          else {
            await interaction.editReply({
              content: '実行結果が2000文字を超えているためファイル出力しました',
              components: [],
              files: [
                new MessageAttachment(inspect(evaled), 'evaled.txt'),
              ],
            });
          }
        }
        catch (error) {
          await interaction.editReply(
            {
              content: `ERROR!\n${codeBlock(error.stack)}`,
              components: [],
            },
          );
        }
      }
    }
    catch (error) {
      errorlog(client, interaction, error);
    }
  },

  /**
   *
   * @param {import('../../utils/Bot')} client
   * @param {import('discord.js').Message} message
   * @param {Array<string>} args
   */
  run_message: async function (client, message, args) {
    try {
      if (!args[0]) return await message.reply('引数に評価するコードを入れてください');

      const buttons = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('ok')
            .setEmoji(emojis.owov)
            .setStyle('PRIMARY'),
          new MessageButton()
            .setCustomId('no')
            .setEmoji(emojis.owox)
            .setStyle('PRIMARY'),
        );

      const msg = await message.reply({
        content: `${codeBlock('以下のコードを実行してもいいですか？\n実行していい場合はokを、キャンセルする場合はnoを送信してください\n30秒経つと強制キャンセルされます')}${codeBlock('js', args.join(' '))}`,
        components: [buttons],
      });

      const filter = (i) => (i.customId === 'ok' || i.customId === 'no') && i.user.id === message.author.id;
      const response2 = await msg.awaitMessageComponent({ filter, componentType: 'BUTTON', max: 1, time: 60000 });
      if (response2.customId === 'no') {
        await msg.delete();
      }
      else if (response2.customId === 'ok') {
        let evaled;
        try {
          evaled = await eval(args.join(' '));
          const evalinsoext = inspect(evaled).length;
          if (evalinsoext <= 4000) {
            await msg.edit({
              content: codeBlock(inspect(evaled)),
              components: [],
            });
          }
          else {
            await msg.edit({
              content: '実行結果が2000文字を超えているためファイル出力しました',
              components: [],
              files: [
                new MessageAttachment(inspect(evaled), 'evaled.txt'),
              ],
            });
          }
        }
        catch (error) {
          await msg.edit(
            {
              content: `ERROR!\n${codeBlock(error.stack)}`,
              components: [],
            },
          );
        }
      }
    }
    catch (error) {
      commanderror_message(client, message, error);
    }
  },
};