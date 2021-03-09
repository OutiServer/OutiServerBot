const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
  info: {
    name: "help",
    description: "コマンドの詳細を表示します",
    usage: "[command]",
    aliases: [""],
    botownercommand: false,
    botadmincommand: false
  },

  /**
   * @param {Message} message
   * @param {Client} client
   */

  run: async function (client, message, args) {
    if (!args[0]) {
      const commands = client.commands.map(command => command.info);
      let commandconstdescription = '';
      const embed = new MessageEmbed()
        .setTitle(`${client.user.tag} helpページ`)
        .setColor('RANDOM')
        .setTimestamp();
      commandconstdescription += '```\n';
      for (const cmd of commands) {
        commandconstdescription += `${process.env.PREFIX}${cmd.name} ${cmd.usage}: ${cmd.description}\n`;
      }
      commandconstdescription += '```';
      embed.setDescription(commandconstdescription)
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
        .setDescription(`コマンド名: ${command.info.name}\n説明: ${command.info.description}\n使用法: \`\`${process.env.PREFIX}${command.info.name} ${command.info.usage}\`\`\nエイリアス: ${command.info.aliases.join(", ")}\nBotOwnerコマンド: ${command.info.ownercommand}\nBotAdminコマンド: ${command.info.botadmincommand}`)
      message.channel.send(commandinfo)
    }
  },
};