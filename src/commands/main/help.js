const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { errorlog, commanderror_message } = require('../../functions/error');

module.exports = {
  info: {
    name: 'help',
    description: 'コマンドの詳細を表示します',
    usage: '(commandname)',
    aliases: [],
    category: 'main',
  },

  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('コマンドの詳細を表示します'),

  /**
     * @param {import('../../Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */
  run: async function (client, interaction) {
    try {
      if (!interaction.options.getString('commandname', false)) {
        const main = client.commands.filter(x => x.info.category == 'main').map((x) => '`' + x.info.name + '`').join(', ');
        const minecraft = client.commands.filter(x => x.info.category == 'minecraft').map((x) => '`' + x.info.name + '`').join(', ');
        const omake = client.commands.filter(x => x.info.category == 'omake').map((x) => '`' + x.info.name + '`').join(', ');
        const admin = client.commands.filter(x => x.info.category == 'admin').map((x) => '`' + x.info.name + '`').join(', ');
        const owner = client.commands.filter(x => x.info.category == 'owner').map((x) => '`' + x.info.name + '`').join(', ');
        const embeds = [];
        embeds.push(
          new MessageEmbed()
            .setTitle(`${client.user.tag} helpページ`)
            .addField('main', main)
            .addField('minecraft', minecraft)
            .addField('omake', omake)
            .setColor('RANDOM')
            .setTimestamp(),
        );
        embeds.push(
          new MessageEmbed()
            .setTitle('main')
            .setDescription('```' + client.commands.filter(x => x.info.category == 'main').map((x) => `/${x.info.name} ${x.info.usage}: ${x.info.description}`).join('\n') + '```')
            .setColor('RANDOM')
            .setTimestamp(),
        );
        embeds.push(
          new MessageEmbed()
            .setTitle('omake')
            .setDescription('```' + client.commands.filter(x => x.info.category == 'omake').map((x) => `/${x.info.name} ${x.info.usage}: ${x.info.description}`).join('\n') + '```')
            .setColor('RANDOM')
            .setTimestamp(),
        );

        if (interaction.member.roles.cache.has('822852335322923060') || interaction.member.roles.cache.has('771015602180587571') || interaction.member.permissions.has('ADMINISTRATOR')) {
          embeds[0].addField('admin', admin);
          embeds.push(
            new MessageEmbed()
              .setTitle('admin')
              .setDescription('```' + client.commands.filter(x => x.info.category == 'admin').map((x) => `/${x.info.name} ${x.info.usage}: ${x.info.description}`).join('\n') + '```')
              .setColor('RANDOM')
              .setTimestamp(),
          );
        }
        if (interaction.user.id === process.env.OWNERID) {
          embeds[0].addField('owner', owner);
          embeds.push(
            new MessageEmbed()
              .setTitle('owner')
              .setDescription('```' + client.commands.filter(x => x.info.category == 'owner').map((x) => `/${x.info.name} ${x.info.usage}: ${x.info.description}`).join('\n') + '```')
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
          try {
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
          }
          catch (error) {
            errorlog(client, interaction, error);
          }
        });
      }
      else {
        const cmd = interaction.options.getString('commandname', false);
        let command = client.commands.get(cmd);
        if (!command) command = client.commands.find(x => x.info.aliases.includes(cmd));
        if (!command) return await interaction.followUp('そんなコマンドないで。😉');
        const commandinfo = new MessageEmbed()
          .setTitle('コマンド名: ' + command.info.name + ' の詳細')
          .setDescription(`コマンド名: ${command.info.name}\n説明: ${command.info.description}\n使用法: \`\`${command.info.name} ${command.info.usage}\`\`\nエイリアス: ${command.info.aliases.join(', ')}\n\nカテゴリー: ${command.info.category}\nBotOwnerコマンド: ${command.info.owneronly}\nBotAdminコマンド: ${command.info.adminonly}`)
          .setColor('RANDOM')
          .setTimestamp();
        await interaction.followUp(commandinfo);
      }
    }
    catch (error) {
      errorlog(client, interaction, error);
    }
  },

  /**
   *
   * @param {import('../../Bot')} client
   * @param {import('discord.js').Message} message
   * @param {Array<string>} args
   * @returns
   */
  run_message: async function (client, message, args) {
    try {
      if (!args[0]) {
        const main = client.commands.filter(x => x.info.category == 'main').map((x) => '`' + x.info.name + '`').join(', ');
        const minecraft = client.commands.filter(x => x.info.category == 'minecraft').map((x) => '`' + x.info.name + '`').join(', ');
        const omake = client.commands.filter(x => x.info.category == 'omake').map((x) => '`' + x.info.name + '`').join(', ');
        const admin = client.commands.filter(x => x.info.category == 'admin').map((x) => '`' + x.info.name + '`').join(', ');
        const owner = client.commands.filter(x => x.info.category == 'owner').map((x) => '`' + x.info.name + '`').join(', ');
        const embeds = [];
        embeds.push(
          new MessageEmbed()
            .setTitle(`${client.user.tag} helpページ`)
            .addField('main', main)
            .addField('minecraft', minecraft)
            .addField('omake', omake)
            .setColor('RANDOM')
            .setTimestamp(),
        );
        embeds.push(
          new MessageEmbed()
            .setTitle('main')
            .setDescription('```' + client.commands.filter(x => x.info.category == 'main').map((x) => `${process.env.PREFIX}${x.info.name} ${x.info.usage}: ${x.info.description}`).join('\n') + '```')
            .setColor('RANDOM')
            .setTimestamp(),
        );
        embeds.push(
          new MessageEmbed()
            .setTitle('omake')
            .setDescription('```' + client.commands.filter(x => x.info.category == 'omake').map((x) => `${process.env.PREFIX}${x.info.name} ${x.info.usage}: ${x.info.description}`).join('\n') + '```')
            .setColor('RANDOM')
            .setTimestamp(),
        );

        if (message.member.permissions.has('ADMINISTRATOR') || message.member.roles.cache.has('822852335322923060') || message.member.roles.cache.has('771015602180587571')) {
          embeds[0].addField('admin', admin);
          embeds.push(
            new MessageEmbed()
              .setTitle('admin')
              .setDescription('```' + client.commands.filter(x => x.info.category == 'admin').map((x) => `${process.env.PREFIX}${x.info.name} ${x.info.usage}: ${x.info.description}`).join('\n') + '```')
              .setColor('RANDOM')
              .setTimestamp(),
          );
        }
        if (message.author.id === process.env.OWNERID) {
          embeds[0].addField('owner', owner);
          embeds.push(
            new MessageEmbed()
              .setTitle('owner')
              .setDescription('```' + client.commands.filter(x => x.info.category == 'owner').map((x) => `${process.env.PREFIX}${x.info.name} ${x.info.usage}: ${x.info.description}`).join('\n') + '```')
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

        const msg = await message.reply({
          embeds: [embeds[0]],
          components: [buttons],
          fetchReply: true,
        });

        let select = 0;

        const filter = (i) => i.user.id === message.author.id;
        const collector = msg.createMessageComponentCollector({ filter: filter, componentType: 'BUTTON' });
        collector.on('collect', async i => {
          try {
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
          }
          catch (error) {
            commanderror_message(client, message, error);
          }
        });
      }
      else {
        const cmd = args[0];
        let command = client.commands.get(cmd);
        if (!command) command = client.commands.find(x => x.info.aliases.includes(cmd));
        if (!command) return await message.reply('そんなコマンドないで。😉');
        const commandinfo = new MessageEmbed()
          .setTitle('コマンド名: ' + command.info.name + ' の詳細')
          .setDescription(`コマンド名: ${command.info.name}\n説明: ${command.info.description}\n使用法: \`\`${process.env.PREFIX}${command.info.name} ${command.info.usage}\`\`\nエイリアス: ${command.info.aliases.join(', ')}\n\nカテゴリー: ${command.info.category}`)
          .setColor('RANDOM')
          .setTimestamp();
        await message.reply({
          embeds: [
            commandinfo,
          ],
        });
      }
    }
    catch (error) {
      commanderror_message(client, message, error);
    }
  },
};