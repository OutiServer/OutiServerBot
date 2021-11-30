const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton, InteractionCollector } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const bot = require('../../Utils/Bot');
const { errorlog } = require('../../functions/logs/error');

module.exports = {
  info: {
    name: 'help',
    description: 'コマンドの詳細を表示します',
    usage: '(commandname)',

    owneronly: false,
    adminonly: false,
    category: 'Main',
  },

  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('コマンドの詳細を表示します'),

  /**
     * @param {bot} client
     * @param {CommandInteraction} interaction
     */
  run: async function (client, interaction) {
    try {
      if (!interaction.options.getString('commandname', false)) {
        const main = client.commands.filter(x => x.info.category == 'Main').map((x) => '`' + x.info.name + '`').join(', ');
        const minecraft = client.commands.filter(x => x.info.category == 'Minecraft').map((x) => '`' + x.info.name + '`').join(', ');
        const level = client.commands.filter(x => x.info.category == 'Level').map((x) => '`' + x.info.name + '`').join(', ');
        const omake = client.commands.filter(x => x.info.category == 'Omake').map((x) => '`' + x.info.name + '`').join(', ');
        const admin = client.commands.filter(x => x.info.category == 'Admin').map((x) => '`' + x.info.name + '`').join(', ');
        const owner = client.commands.filter(x => x.info.category == 'Owner').map((x) => '`' + x.info.name + '`').join(', ');
        const embeds = [];
        embeds.push(
          new MessageEmbed()
            .setTitle(`${client.user.tag} helpページ`)
            .addField('Main', main)
            .addField('Minecraft', minecraft)
            .addField('Level', level)
            .addField('Omake', omake)
            .setColor('RANDOM')
            .setTimestamp(),
        );
        embeds.push(
          new MessageEmbed()
            .setTitle('Main')
            .setDescription('```' + client.commands.filter(x => x.info.category == 'Main').map((x) => `${process.env.PREFIX}${x.info.name} ${x.info.usage}: ${x.info.description}`).join('\n') + '```')
            .setColor('RANDOM')
            .setTimestamp(),
        );
        embeds.push(
          new MessageEmbed()
            .setTitle('Minecraft')
            .setDescription('```' + client.commands.filter(x => x.info.category == 'Minecraft').map((x) => `${process.env.PREFIX}${x.info.name} ${x.info.usage}: ${x.info.description}`).join('\n') + '```')
            .setColor('RANDOM')
            .setTimestamp(),
        );
        embeds.push(
          new MessageEmbed()
            .setTitle('Level')
            .setDescription('```' + client.commands.filter(x => x.info.category == 'Level').map((x) => `${process.env.PREFIX}${x.info.name} ${x.info.usage}: ${x.info.description}`).join('\n') + '```')
            .setColor('RANDOM')
            .setTimestamp(),

        );
        embeds.push(
          new MessageEmbed()
            .setTitle('Omake')
            .setDescription('```' + client.commands.filter(x => x.info.category == 'Omake').map((x) => `${process.env.PREFIX}${x.info.name} ${x.info.usage}: ${x.info.description}`).join('\n') + '```')
            .setColor('RANDOM')
            .setTimestamp(),
        );

        if (interaction.member.roles.cache.has('822852335322923060') || interaction.member.roles.cache.has('771015602180587571') || interaction.member.permissions.has('ADMINISTRATOR')) {
          embeds[0].addField('Admin', admin);
          embeds.push(
            new MessageEmbed()
              .setTitle('Admin')
              .setDescription('```' + client.commands.filter(x => x.info.category == 'Admin').map((x) => `${process.env.PREFIX}${x.info.name} ${x.info.usage}: ${x.info.description}`).join('\n') + '```')
              .setColor('RANDOM')
              .setTimestamp(),
          );
        }
        console.log(interaction.user.id);
        if (interaction.user.id === process.env.OWNERID) {
          embeds[0].addField('Owner', owner);
          embeds.push(
            new MessageEmbed()
              .setTitle('Owner')
              .setDescription('```' + client.commands.filter(x => x.info.category == 'Owner').map((x) => `${process.env.PREFIX}${x.info.name} ${x.info.usage}: ${x.info.description}`).join('\n') + '```')
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

        const collector = new InteractionCollector(client, { componentType: 'BUTTON', message: message });
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
          .setDescription(`コマンド名: ${command.info.name}\n説明: ${command.info.description}\n使用法: \`\`${process.env.PREFIX}${command.info.name} ${command.info.usage}\`\`\nエイリアス: ${command.info.aliases.join(', ')}\n\nカテゴリー: ${command.info.category}\nBotOwnerコマンド: ${command.info.owneronly}\nBotAdminコマンド: ${command.info.adminonly}`)
          .setColor('RANDOM')
          .setTimestamp();
        await interaction.followUp(commandinfo);
      }
    }
    catch (error) {
      errorlog(client, interaction, error);
    }
  },
};