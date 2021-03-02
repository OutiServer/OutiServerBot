const { Client, Message, MessageEmbed, WebhookClient } = require('discord.js');
const dataStore = require('../store')
const storeAsync = dataStore('../dat/global.json', { webhooks: [] })

/**
 * @param {Client} client
 * @param {Message} message
 */

module.exports = async (client, message) => {

  if (message.author.bot || !message.guild || message.system) return;
  let usermoneydata = client.getMoney.get(message.author.id, message.guild.id);
  if (!usermoneydata) {
    usermoneydata = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, money: 0, dailylogin: 0, ticket: 0 }
  }
  let userdebtdata = client.getDebt.get(message.author.id, message.guild.id);
  if (!userdebtdata) {
    userdebtdata = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, Tuna: 0, Shoulder: null }
  }
  let userdailydata = client.getDaily.get(message.author.id, message.guild.id);
  if (!userdailydata) {
    userdailydata = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, login: 0 }
  }
  let servermoneydata = client.getServerMoney.get(message.guild.id);
  if (!servermoneydata) {
    servermoneydata = { id: `${message.guild.id}`, guild: message.guild.id, money: 0 }
  }

  if (userdailydata.login === 0 && userdebtdata.Tuna === 0 && message.guild.id === '706452606918066237') {
    userdailydata.login = 1;
    usermoneydata.dailylogin += 1;
    usermoneydata.money += 10000 * usermoneydata.dailylogin;
    message.channel.send(
      new MessageEmbed()
        .setDescription(`<@${message.author.id}>、あなたは現在うんこ鯖に${usermoneydata.dailylogin}日浮上しています！\nデイリーボーナスとして${10000 * usermoneydata.dailylogin}うんコイン獲得しました！`)
        .setColor('RANDOM')
        .setTimestamp()
    );
  }
  servermoneydata.money += message.content.length;
  if (usermoneydata.money < 10000 && userdebtdata.Tuna === 0) {
    usermoneydata.money += message.content.length * 10;
    if (usermoneydata.money > 9999) {
      usermoneydata.money = 10000;
    }
  }
  if (usermoneydata.money < -99999 && userdebtdata.Tuna === 0) {
    message.member.roles.add('798570033235755029');
    userdebtdata.Tuna = 1;
    const webhook = new WebhookClient('798186603235246111', 'Rf6vyUbm7GuwLOmmHseu-QZp7bV7QOYykwEoqzrSLX3Rjkza_7ipOsbJQGe9BKoGNiHn');
    webhook.send(`${message.author}、開けろごらああ！てめえ自分が何シてんのかわかってるのか！！？\n${usermoneydata.money * -1}円、しっかり払ってもらうで`)
  }
  else if (usermoneydata.money > -1 && userdebtdata.Tuna === 1) {
    message.member.roles.remove('798570033235755029');
    const webhook = new WebhookClient('798186603235246111', 'Rf6vyUbm7GuwLOmmHseu-QZp7bV7QOYykwEoqzrSLX3Rjkza_7ipOsbJQGe9BKoGNiHn');
    webhook.send(`${message.author}、確かに借金は返してもらった、もう二度と借金すんじゃねえぞ。`);
    userdebtdata.Tuna = 0;
  }
  if (usermoneydata.ticket === null) {
    usermoneydata.ticket = 0;
  }
  client.setMoney.run(usermoneydata);
  client.setDebt.run(userdebtdata);
  client.setDaily.run(userdailydata);
  client.setServerMoney.run(servermoneydata);
  if (message.channel.id === '798157114555105330' || message.channel.id === '798176065562476604' || message.channel.id === '798198069849227294' || message.channel.id === '798570749136601158' || message.channel.id === '798486503255834664' || message.channel.id === '798186469516116028' || message.channel.id === '798571746730049597' || message.channel.id === '798191278369931265' || message.channel.id === '798500844579586048') {
    message.member.roles.add('798533393448960020');
  }
  else if (message.channel.id === '738899882454024323' || message.channel.id === '801057145529172018' || message.channel.id === '801095344800661544') {
    message.member.roles.add('801796340057112589');
  }
  const URL_PATTERN = /http(?:s)?:\/\/(?:.*)?discord(?:app)?\.com\/channels\/(?:\d{17,19})\/(?<channelId>\d{17,19})\/(?<messageId>\d{17,19})/g;
  let result;
  while ((result = URL_PATTERN.exec(message.content)) !== null) {
    const group = result.groups;
    client.channels.fetch(group.channelId)
      .then(channel => channel.messages.fetch(group.messageId))
      .then(targetMessage => message.channel.send(targetMessage.author.username + 'のメッセージを展開します\n\n',
        new MessageEmbed()
          .setDescription(targetMessage.cleanContent)
          .setColor('RANDOM')
          .setTimestamp()))
      .catch(error => message.reply(error)
        .then(message => message.delete({ timeout: 10000 }))
        .catch(console.error)
      );
  }
  if (message.content.startsWith('?addChannel')) return addShareChannel(message).catch(console.error)
  if (message.content.startsWith('?removeChannel')) return removeShareChannel(message).catch(console.error)
  handleMessage(message);
  if (!message.content.startsWith(process.env.PREFIX)) return;
  const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if (!command) return;
  const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.info.aliases && cmd.info.aliases.includes(command));
  if (!cmd || cmd.info.botownercommand && process.env.OWNERID !== message.author.id || cmd.info.botadmincommand && !message.member.roles.cache.has('771015602180587571') && message.member.guild.owner.id !== message.author.id && message.guild.id === '706452606918066237') {
    message.delete();
    return message.reply('そんなコマンドないで。😉');
  }
  cmd.run(client, message, args);
};

const requireBotPermissions = ['ADMINISTRATOR']
const missingBotPermissionsMessage = `ボットがこのコマンドの処理を行うためには、**${requireBotPermissions.join(', ')}**権限が必要です。`

const requireMemberPermissions = ['ADMINISTRATOR']
const missingMemberPermissionsMessage = `あなたがこのコマンドを使用するには、**${requireMemberPermissions.join(', ')}**権限を持っている必要があります。`

const noChannelMentionMessage = 'チャンネルをメンションしてメッセージを送信してね。'

/**
 * @param {Discord.Message} message
 */
async function addShareChannel(message) {
  const member = message.member
  const channels = message.mentions.channels

  if (!member.hasPermission(requireMemberPermissions)) return message.reply(missingMemberPermissionsMessage)
  if (!message.guild.me.hasPermission(requireBotPermissions)) return message.reply(missingBotPermissionsMessage)
  if (!channels.size) return message.reply(noChannelMentionMessage)

  const store = await storeAsync.then(value => value.webhooks)

  return Promise.all(channels.map(channel => channel.fetchWebhooks()))
    .then(webhooks => webhooks.map(webhooks => webhooks.map(webhook => webhook.channelID)))
    .then(channelIds => channelIds.reduce((previousValue, currentValue) => previousValue.concat(currentValue), []))
    .then(channelIds => channelIds.filter(channelId => store.some(value => value.channelId !== channelId)))
    .then(channelIds => channels.filter(channel => !channelIds.includes(channel.id)))
    .then(channels => Promise.all(channels.map(channel => channel.createWebhook('うんこ鯖~カスクラサーバー！'))))
    .then(webhooks => Promise.all(webhooks.map(webhook => store.push({ webhookId: webhook.id, channelId: webhook.channelID }))))
    .then(indexNumbers => message.reply(`処理終了`))
}

/**
 * @param {Discord.Message} message
 */
async function removeShareChannel(message) {
  const member = message.member
  const channels = message.mentions.channels

  if (!member.hasPermission(requireMemberPermissions)) return message.reply(missingMemberPermissionsMessage)
  if (!message.guild.me.hasPermission(requireBotPermissions)) return message.reply(missingBotPermissionsMessage)
  if (!channels.size) return message.reply(noChannelMentionMessage)

  const store = await storeAsync
  const deleteWebhookIds = []

  const deleteWebhook = webhook => {
    deleteWebhookIds.push(webhook.id)

    return webhook.delete()
  }

  return Promise.all(channels.map(channel => channel.fetchWebhooks()))
    .then(webhooks => webhooks.map(webhooks => webhooks.map(webhook => webhook)))
    .then(webhooks => webhooks.reduce((previousValue, currentValue) => previousValue.concat(currentValue), []))
    .then(webhooks => webhooks.filter(webhook => store.webhooks.some(value => value.webhookId === webhook.id)))
    .then(webhooks => webhooks.filter(webhook => channels.has(webhook.channelID)))
    .then(webhooks => Promise.all(webhooks.map(webhook => deleteWebhook(webhook))))
    .then(() => { store.webhooks = store.webhooks.filter(value => !deleteWebhookIds.includes(value.webhookId)) })
    .then(() => message.reply(`処理終了`))
}


/**
 * @param {Discord.Message} message
 */
async function handleMessage(message) {
  const store = await storeAsync.then(value => value.webhooks)

  if (!store.find(value => value.channelId === message.channel.id)) return

  const messageOptions = {
    username: message.author.username,
    avatarURL: message.author.displayAvatarURL({ format: 'png', size: 512 }),
    files: message.attachments.map(attachment => attachment.url)
  }

  return Promise.all(store.map(value => client.channels.fetch(value.channelId)))
    .then(channels => channels.filter(channel => channel.type === 'text' && !channel.deleted))
    .then(channels => Promise.all(channels.map(channel => channel.fetchWebhooks())))
    .then(webhooks => webhooks.map(webhooks => webhooks.map(webhook => webhook)))
    .then(webhooks => webhooks.reduce((previousValue, currentValue) => previousValue.concat(currentValue), []))
    .then(webhooks => webhooks.filter(webhook => store.some(value => value.webhookId === webhook.id)))
    .then(webhooks => Promise.all(webhooks.map(webhook => webhook.send(message.cleanContent, messageOptions))))
    .then(() => message.delete())
}