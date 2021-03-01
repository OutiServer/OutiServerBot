const { Client, Message, MessageEmbed } = require('discord.js');
const normaldata = require('../dat/normal.json');
const raredata = require('../dat/rare.json');

module.exports = {
    info: {
        name: "gacha",
        description: "ガチャ",
        usage: "",
        aliases: [""],
        botownercommand: false,
        botadmincommand: false
    },
    /**
     * @param {Message} message
     * @param {Client} client
     */
    run: async function (client, message, args) {
        if (message.channel.id !== '798157114555105330' && message.channel.id !== '798176065562476604' && message.channel.id !== '798198069849227294' && message.channel.id !== '798486503255834664' && message.channel.id !== '798570749136601158' && message.guild.id === '706452606918066237') {
            message.delete();
            return message.reply('そのコマンドは<#798157114555105330>・<#798176065562476604>、<#798198069849227294>、<#798486503255834664>、<#798570749136601158>でしか使用できません<a:owoxgif:793460058250805259>');
        }
        let usermoneydata = client.getMoney.get(message.author.id, message.guild.id);
        if (!usermoneydata) {
            usermoneydata = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, money: 0, dailylogin: 0, ticket: 0 }
        }
        if (usermoneydata.ticket < 1) {
            message.delete();
            return message.reply('お前チケット1枚も持ってないやん！');
        }
        usermoneydata.ticket -= 1;
        let random = Math.random(); //乱数生成
        let content = '';
        if (random < 0.1) {
            let roleid = '';
            let rarerandom = Math.ceil(Math.random() * 30);
            if (rarerandom === 1) {
                let rare = Math.floor(Math.random() * raredata.length);
                content = `当たり！\nレア枠: ${raredata[rare].name}を入手した`;
                roleid = raredata[rare].id;
            }
            else {
                let normal = Math.floor(Math.random() * normaldata.length);
                content = `当たり！\n普通枠: ${normaldata[normal].name}を入手した`;
                roleid = normaldata[normal].id;
            }
            message.member.roles.add(roleid);
        }
        else {
            content = 'はずれ'
        }
        message.channel.send(
            new MessageEmbed()
                .setTitle('うんこガチャ')
                .setImage('https://media.discordapp.net/attachments/800317829962399795/802522002275172352/gacha.png')
                .setColor('RANDOM')
                .setTimestamp()
        ).then(msg => {
            setTimeout(() => {
                msg.edit(
                    new MessageEmbed()
                        .setTitle('うんこガチャ')
                        .setImage('https://media.discordapp.net/attachments/800317829962399795/802521531704016896/capsule_close1_red.png')
                        .setColor('RANDOM')
                        .setTimestamp()
                ).then(msg => {
                    setTimeout(() => {
                        msg.edit(
                            new MessageEmbed()
                                .setTitle('うんこガチャ')
                                .setImage('https://media.discordapp.net/attachments/800317829962399795/802521536040402944/capsule_open1_red.png')
                                .setColor('RANDOM')
                                .setTimestamp()
                        ).then(msg => {
                            setTimeout(() => {
                                msg.edit(
                                    new MessageEmbed()
                                        .setTitle('うんこガチャ')
                                        .setDescription(`うんこガチャの結果\n${content}`)
                                        .setColor('RANDOM')
                                        .setTimestamp()
                                );
                            }, 1000);
                        })
                    }, 1000);
                })
            }, 1000);
        });
        client.setMoney.run(usermoneydata);
    },
};