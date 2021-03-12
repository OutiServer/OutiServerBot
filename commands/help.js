const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
  info: {
    name: "help",
    description: "コマンドの詳細を表示します",
    usage: "[command]",
    aliases: [""],
    botownercommand: false,
    botadmincommand: false,
    category: 'Main'
  },

  /**
   * @param {Message} message
   * @param {Client} client
   */

  run: async function (client, message, args) {
    if (!args[0]) {
      const main = client.commands.filter(x => x.info.category == 'Main').map((x) => '`' + x.info.name + '`').join(', ');
      const casino = client.commands.filter(x => x.info.category == 'Casino').map((x) => '`' + x.info.name + '`').join(', ');
      const money = client.commands.filter(x => x.info.category == 'Money').map((x) => '`' + x.info.name + '`').join(', ');
      const admin = client.commands.filter(x => x.info.category == 'Admin').map((x) => '`' + x.info.name + '`').join(', ');
      const owner = client.commands.filter(x => x.info.category == 'Owner').map((x) => '`' + x.info.name + '`').join(', ');
      const embed = new MessageEmbed()
        .setTitle(`${client.user.tag} helpページ`)
        .addField('Main', main)
        .addField('Money', money)
        .addField('Casino', casino)
        .setColor('RANDOM')
        .setTimestamp();
      if (message.member.roles.cache.has('771015602180587571')) {
        embed.addField('Admin', admin);
      }
      if (message.author.id === process.env.OWNERID) {
        embed.addField('Owner', owner);
      }
      message.channel.send(embed);
    }
    else {
      let cmd = args[0]
      let command = client.commands.get(cmd)
      if (!command) command = client.commands.find(x => x.info.aliases.includes(cmd))
      if (!command) {
        message.react('793460058250805259');
        return message.channel.send("そんなコマンドないで。😉");
      }
      let commandinfo = new MessageEmbed()
        .setTitle("コマンド名: " + command.info.name + " の詳細")
        .setColor("RANDOM")
        .setDescription(`コマンド名: ${command.info.name}\n説明: ${command.info.description}\n使用法: \`\`${process.env.PREFIX}${command.info.name} ${command.info.usage}\`\`\nエイリアス: ${command.info.aliases.join(", ")}\n\nカテゴリー: ${command.info.category}BotOwnerコマンド: ${command.info.ownercommand}\nBotAdminコマンド: ${command.info.botadmincommand}`)
      message.channel.send(commandinfo)
    }
  },
};