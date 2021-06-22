const { Message, MessageEmbed } = require('discord.js');
const { ReactionController } = require('discord.js-reaction-controller');
const bot = require('../../bot');
const { errorlog } = require("../../functions/logs/error");

module.exports = {
  info: {
    name: "help",
    description: "コマンドの詳細を表示します",
    usage: "[command]",
    aliases: [""],
    owneronly: false,
    adminonly: false,
    category: 'Main'
  },

  /**
   * @param {bot} client
   * @param {Message} message
   * @param {string[]} args
   */

  run: async function (client, message, args) {
    try {
      if (!args[0]) {
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
            .setTimestamp()
        );
        embeds.push(
          new MessageEmbed()
            .setTitle('Main')
            .setDescription('```' + client.commands.filter(x => x.info.category == 'Main').map((x) => `${process.env.PREFIX}${x.info.name} ${x.info.usage}: ${x.info.description}`).join('\n') + '```')
            .setColor('RANDOM')
            .setTimestamp()
        );
        embeds.push(
          new MessageEmbed()
            .setTitle('Minecraft')
            .setDescription('```' + client.commands.filter(x => x.info.category == 'Minecraft').map((x) => `${process.env.PREFIX}${x.info.name} ${x.info.usage}: ${x.info.description}`).join('\n') + '```')
            .setColor('RANDOM')
            .setTimestamp()
        );
        embeds.push(
          new MessageEmbed()
            .setTitle('Level')
            .setDescription('```' + client.commands.filter(x => x.info.category == 'Level').map((x) => `${process.env.PREFIX}${x.info.name} ${x.info.usage}: ${x.info.description}`).join('\n') + '```')
            .setColor('RANDOM')
            .setTimestamp()

        );
        embeds.push(
          new MessageEmbed()
            .setTitle('Omake')
            .setDescription('```' + client.commands.filter(x => x.info.category == 'Omake').map((x) => `${process.env.PREFIX}${x.info.name} ${x.info.usage}: ${x.info.description}`).join('\n') + '```')
            .setColor('RANDOM')
            .setTimestamp()
        );

        if (message.member.roles.cache.has('822852335322923060') || message.member.roles.cache.has('771015602180587571') || message.member.hasPermission('ADMINISTRATOR')) {
          embeds[0].addField('Admin', admin);
          embeds.push(
            new MessageEmbed()
              .setTitle('Admin')
              .setDescription('```' + client.commands.filter(x => x.info.category == 'Admin').map((x) => `${process.env.PREFIX}${x.info.name} ${x.info.usage}: ${x.info.description}`).join('\n') + '```')
              .setColor('RANDOM')
              .setTimestamp()
          );
        }
        if (message.author.id === process.env.OWNERID) {
          embeds[0].addField('Owner', owner);
          embeds.push(
            new MessageEmbed()
              .setTitle('Owner')
              .setDescription('```' + client.commands.filter(x => x.info.category == 'Owner').map((x) => `${process.env.PREFIX}${x.info.name} ${x.info.usage}: ${x.info.description}`).join('\n') + '```')
              .setColor('RANDOM')
              .setTimestamp()
          );
        }

        const controller = new ReactionController(client);
        controller.addPages(embeds);
        await controller.sendTo(message.channel, message.author);
      }
      else {
        let cmd = args[0];
        let command = client.commands.get(cmd);
        if (!command) command = client.commands.find(x => x.info.aliases.includes(cmd))
        if (!command) return await message.reply("そんなコマンドないで。😉");
        let commandinfo = new MessageEmbed()
          .setTitle("コマンド名: " + command.info.name + " の詳細")
          .setDescription(`コマンド名: ${command.info.name}\n説明: ${command.info.description}\n使用法: \`\`${process.env.PREFIX}${command.info.name} ${command.info.usage}\`\`\nエイリアス: ${command.info.aliases.join(", ")}\n\nカテゴリー: ${command.info.category}\nBotOwnerコマンド: ${command.info.owneronly}\nBotAdminコマンド: ${command.info.adminonly}`)
          .setColor("RANDOM")
          .setTimestamp();
        await message.channel.send(commandinfo);
      }
    } catch (error) {
      errorlog(message, error);
    }
    finally {
      client.cooldown.set(message.author.id, false);
    }
  },
};