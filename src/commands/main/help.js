const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { SlashCommandBuilder, codeBlock } = require('@discordjs/builders');

module.exports = {
  info: {
    name: 'help',
    description: 'コマンドの詳細を表示します',
    category: 'main',
    deferReply: true,
  },

  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('コマンドの詳細を表示します')
    .addStringOption(option => option
      .setName('commandname')
      .setDescription('helpを表示するコマンド名')
      .setRequired(false)),

  /**
     * @param {import('../../Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */
  run: async function (client, interaction) {
    if (!interaction.options.getString('commandname', false)) {
      const embeds = [];
      embeds.push(
        new MessageEmbed()
          .setTitle(`${client.user.tag} helpページ`)
          .addField('main', client.commands.filter(x => x.info.category == 'main').map((x) => '`' + x.info.name + '`').join(', '))
          .addField('minecraft', client.commands.filter(x => x.info.category == 'minecraft').map((x) => '`' + x.info.name + '`').join(', '))
          .setColor('RANDOM')
          .setTimestamp(),
      );
      embeds.push(
        new MessageEmbed()
          .setTitle('main')
          .setDescription(`${codeBlock(client.commands.filter(x => x.info.category == 'main').map((x) => `/${x.info.name}: ${x.info.description}`).join('\n'))}`)
          .setColor('RANDOM')
          .setTimestamp(),
      );
      embeds.push(
        new MessageEmbed()
          .setTitle('minecraft')
          .setDescription(`${codeBlock(client.commands.filter(x => x.info.category == 'minecraft').map((x) => `/${x.info.name}: ${x.info.description}`).join('\n'))}`)
          .setColor('RANDOM')
          .setTimestamp(),
      );

      if (interaction.member.roles.cache.has('822852335322923060') || interaction.member.roles.cache.has('771015602180587571') || interaction.member.permissions.has('ADMINISTRATOR')) {
        embeds[0].addField('admin', client.commands.filter(x => x.info.category == 'admin').map((x) => '`' + x.info.name + '`').join(', '));
        embeds.push(
          new MessageEmbed()
            .setTitle('admin')
            .setDescription(codeBlock(client.commands.filter(x => x.info.category == 'admin').map((x) => `/${x.info.name}: ${x.info.description}`).join('\n')))
            .setColor('RANDOM')
            .setTimestamp(),
        );
      }
      if (interaction.user.id === process.env.OWNERID) {
        embeds[0].addField('owner', client.commands.filter(x => x.info.category == 'admin').map((x) => '`' + x.info.name + '`').join(', '));
        embeds.push(
          new MessageEmbed()
            .setTitle('owner')
            .setDescription(codeBlock(client.commands.filter(x => x.info.category == 'owner').map((x) => `/${x.info.name}: ${x.info.description}`).join('\n')))
            .setColor('RANDOM')
            .setTimestamp(),
        );
      }

      const buttons = new MessageActionRow()
        .addComponents(
          [
            new MessageButton()
              .setCustomId('left')
              .setLabel('◀️')
              .setStyle('PRIMARY')
              .setDisabled(),
            new MessageButton()
              .setCustomId('right')
              .setLabel('▶️')
              .setStyle('PRIMARY'),
            new MessageButton()
              .setCustomId('stop')
              .setLabel('⏹️')
              .setStyle('DANGER'),
          ],
        );

      const message = await interaction.followUp({
        embeds: [embeds[0]],
        components: [buttons],
        fetchReply: true,
      });

      let select = 0;
      const filter = (i) => i.user.id === interaction.user.id;
      const collector = message.createMessageComponentCollector({ filter: filter, componentType: 'BUTTON' });
      collector.on('collect', async i => {
        if (i.customId === 'left') {
          select--;
          buttons.components[1].setDisabled(false);
          if (select < 1) {
            buttons.components[0].setDisabled();
          }
          await i.update(
            {
              embeds: [embeds[select]],
              components: [buttons],
            },
          );
        }
        else if (i.customId === 'right') {
          select++;
          buttons.components[0].setDisabled(false);
          if (select >= embeds.length - 1) {
            buttons.components[1].setDisabled();
          }
          await i.update(
            {
              embeds: [embeds[select]],
              components: [buttons],
            },
          );
        }
        else if (i.customId === 'stop') {
          buttons.components[0].setDisabled();
          buttons.components[1].setDisabled();
          buttons.components[2].setDisabled();
          await i.update(
            {
              embeds: [embeds[select]],
              components: [buttons],
            },
          );
          collector.stop();
        }
      });
    }
    else {
      const cmd = interaction.options.getString('commandname', false);
      let command = client.commands.get(cmd);
      if (!command) command = client.commands.find(x => x.info.aliases.includes(cmd));
      if (!command) return await interaction.followUp('そんなコマンドないで。😉');
      await interaction.followUp({
        embeds: [
          new MessageEmbed()
            .setTitle('コマンド名: ' + command.info.name + ' の詳細')
            .setDescription(`コマンド名: ${command.info.name}\n説明: ${command.info.description}\n使用法: \`\`${command.info.name}\`\`\nエイリアス: ${command.info.aliases.join(', ')}\n\nカテゴリー: ${command.info.category}`)
            .setColor('RANDOM')
            .setTimestamp(),
        ],
      });
    }
  },
};