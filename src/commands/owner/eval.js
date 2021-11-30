const { CommandInteraction, MessageActionRow, MessageButton } = require('discord.js');
const { SlashCommandBuilder, codeBlock } = require('@discordjs/builders');
const { inspect } = require('util');
const bot = require('../../Utils/Bot');
const { errorlog } = require('../../functions/logs/error');

module.exports = {
  info: {
    name: 'eval',
    description: '環境破壊をするために作られたコマンド(大嘘)\n開発者がいちいちテストプログラムを実行するのがめんどくさいからこのコマンドは作られた',
    usage: '',

    owneronly: true,
    adminonly: false,
    category: 'Owner',
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
     * @param {bot} client
     * @param {CommandInteraction} interaction
     */

  run: async function (client, interaction) {
    try {
      const buttons = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('ok')
            .setEmoji('810436146718441483')
            .setStyle('PRIMARY'),
          new MessageButton()
            .setCustomId('no')
            .setEmoji('810436146978619392')
            .setStyle('PRIMARY'),
        );

      const msg = await interaction.followUp({
        content: `${codeBlock('以下のコードを実行してもいいですか？\n実行していい場合はokを、キャンセルする場合はnoを送信してください\n30秒経つと強制キャンセルされます')}${codeBlock('js', interaction.options.getString('code'))}`,
        components: [buttons],
      });

      const filter = (i) => (i.customId === 'ok' || i.customId === 'no') && i.user.id === interaction.user.id;
      const response2 = await msg.awaitMessageComponent({ filter, componentType: 'BUTTON', max: 1, time: 60000 });
      if (!response2) {return await interaction.deleteReply();}
      else if (response2.customId === 'no') {await interaction.deleteReply();}
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
              content: '実行結果が2000文字を超えているため送信出来ません',
              components: [],
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
};