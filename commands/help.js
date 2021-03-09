const { Client, Message, MessageEmbed } = require('discord.js');
const { ReactionController } = require('discord.js-reaction-controller');

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
      const controller = new ReactionController(client);
      controller
        .addPages([
          new MessageEmbed()
            .setTitle(`${client.user.tag} help1ページ目(メインコマンド)`)
            .setDescription('```' + `${process.env.PREFIX}ping: BotのPing値とメモリ使用率を表示\n${process.env.PREFIX}poll [タイトル] [選択肢1] [選択肢2] etc...: 投票を作るコマンド\n${process.env.PREFIX}sumpoll [メッセージID]: 投票集計\n${process.env.PREFIX}sns: SNS宣伝\n${process.env.PREFIX}snsdelete: SNS宣伝削除\n${process.env.PREFIX}eval [プログラム]: jsのプログラムを実行できる便利コマンド` + '```')
            .setColor('RANDOM')
            .setFooter(`${process.env.PREFIX}help [command] で各コマンドの詳細を表示します。`, client.user.avatarURL())
            .setTimestamp(),
          new MessageEmbed()
            .setTitle(`${client.user.tag} help2ページ目(通貨コマンド)`)
            .setDescription('```' + `${process.env.PREFIX}money :所持うんコインを確認するコマンド、第一引数にユーザーをメンションするかIDを入れるとその人のうんコインを表示します\n${process.env.PREFIX}moneyrank: うんコイン所持数ランキング\n${process.env.PREFIX}give [ユーザーをメンションまたはid] [付与するうんコイン]: 指定したユーザーにうんコインを自分の分から引いて付与する\n${process.env.PREFIX}add [ユーザーをメンションまたはid] [付与するうんコイン]: 指定したユーザーにうんコインを付与\n${process.env.PREFIX}remove [ユーザーをメンションまたはid] [剥奪するうんコイン]: 指定したユーザーからうんコインを剥奪するコマンド\n${process.env.PREFIX}reset [ユーザーをメンションまたはid]: 指定したユーザーのデータをリセット(初期値)にする` + '```')
            .setColor('RANDOM')
            .setFooter(`${process.env.PREFIX}help [command] で各コマンドの詳細を表示します。`, client.user.avatarURL())
            .setTimestamp(),
          new MessageEmbed()
            .setTitle(`${client.user.tag} help3ページ目(カジノコマンド)`)
            .setDescription('```' + `${process.env.PREFIX}slot: スロットをする、借金返済中の人は強制的にマグロスロットになります\n${process.env.PREFIX}cointoss [賭け金]: コイントスをするコマンド\n${process.env.PREFIX}Littlewar [賭け金]: 小戦争\n${process.env.PREFIX}tintiro [賭け金]: チンチロ\n${process.env.PREFIX}gacha: チケットを1枚使ってガチャを引く` + '```')
            .setColor('RANDOM')
            .setFooter(`${process.env.PREFIX}help [command] で各コマンドの詳細を表示します。`, client.user.avatarURL())
            .setTimestamp()
        ])
      controller.send(message)
        .catch(console.error);
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