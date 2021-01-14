const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    info: {
        name: "slotsettings",
        description: "slotの各種設定",
        usage: "[設定する名前] [設定する内容]",
        aliases: ["st"],
        botownercommand: false,
        botadmincommand: true
    },
/**
 * @param {Message} message
 * @param {Client} client
 */
    run: async function(client, message, args) {
        const slotsettingsname = args[0];
        if(!slotsettingsname) return message.reply('第一引数に設定する名前を入れてください！');
        let slotsettingsdata = client.getSlotsettings.get(message.guild.id);
        if (!slotsettingsdata) {
            slotsettingsdata　= { id: `${message.guild.id}`, guild: message.guild.id, Jackpotprobability: 10, Jackpot: 100000 }
        }
        if(slotsettingsname === 'Jackpotprobability'){
            const Jackpotprobabilitset = Number(args[1]);
            if(!Jackpotprobabilitset || Jackpotprobabilitset < 1 || Jackpotprobabilitset > 100) return message.reply('第二引数にジャックポット抽選が起きる確率を1〜100の数値で入れてください');
            slotsettingsdata.Jackpotprobability = Jackpotprobabilitset;
            message.channel.send(`ジャックポット抽選が起きる確率を${slotsettingsdata.Jackpotprobability}分の1に設定しました`);
        }
        else if(slotsettingsname === 'Jackpot'){
            const Jackpotset = Number(args[1]);
            if(!Jackpotset || Jackpotset < 1) return message.reply('第二引数にジャックポットの額を1以上の数値で入れてください');
            slotsettingsdata.Jackpot = Jackpotset;
            message.channel.send(`ジャックポットを${slotsettingsdata.Jackpot}うんコインに設定しました`);
        }
        else{
            message.channel.send(
                new MessageEmbed()
                .setTitle('現在のslotの各種設定状態')
                .setDescription(`ジャックポット抽選が起きる確率: ${slotsettingsdata.Jackpotprobability}分の1\nジャックポット: ${slotsettingsdata.Jackpot}うんコイン`)
            );
        }
        client.setSlotsettings.run(slotsettingsdata);
    },
};