const { Client, Message, MessageEmbed } = require('discord.js');

const normaldata = [
    {
        "name":"下級国民",
        "id":"802512106272325643"
    },
    {
        "name":"UNKO",
        "id":"802512348555247616"
    },
    {
        "name":"茶のうんこ",
        "id":"802511954030886942"
    },
    {
        "name":"金のうんこ",
        "id":"802512546057682964"
    },
    {
        "name":"緑のうんこ",
        "id":"802512911889072128"
    },
    {
        "name":"丸いうんこ",
        "id":"802513093473075220"
    },
    {
        "name":"四角いうんこ",
        "id":"802513182136074261"
    }
];
const raredata = [
    {
        "name":"チョコボール",
        "id":"802513495848386591"
    },
    {
        "name":"プラチナうんこ",
        "id":"802513730276950016"
    }
];

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
    run: async function(client, message, args) {
        let usermoneydata = client.getMoney.get(message.author.id, message.guild.id);
        if (!usermoneydata) {
           usermoneydata　= { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, money: 0, dailylogin: 0, ticket: 0 }
        }
        if(usermoneydata.ticket < 1){
            message.reply('お前チケット1枚も持ってないやん！').then( msg => {
                msg.delete({ timeout: 5000 });
            });
            return;
        }
        usermoneydata.ticket -= 1;
        var random = Math.ceil( Math.random()*10 );
        let content = '';
        if(random === 1){
            let roleid = '';
            let rarerandom = Math.ceil( Math.random()*30 );
            if(rarerandom === 1){
                let rare = Math.floor( Math.random() * raredata.length);
                content = `当たり！\nレア枠: ${raredata[rare].name}を入手した`;
                roleid = raredata[rare].id;
            }
            else{
                let normal = Math.floor( Math.random() * normaldata.length);
                content = `当たり！\n普通枠: ${normaldata[normal].name}を入手した`;
                roleid = normaldata[normal].id;
            }
            message.member.roles.add(roleid);
        }
        else{
            content = 'はずれ'
        }
        message.channel.send(
            new MessageEmbed()
            .setTitle('うんこガチャ')
            .setImage('https://media.discordapp.net/attachments/800317829962399795/802522002275172352/gacha.png')
            .setColor('RANDOM')
            .setTimestamp()
        ).then( msg => {
            setTimeout(() => {
                msg.edit(
                    new MessageEmbed()
                    .setTitle('うんこガチャ')
                    .setImage('https://media.discordapp.net/attachments/800317829962399795/802521531704016896/capsule_close1_red.png')
                    .setColor('RANDOM')
                    .setTimestamp()
                ).then( msg => {
                    setTimeout(() => {
                        msg.edit(
                            new MessageEmbed()
                            .setTitle('うんこガチャ')
                            .setImage('https://media.discordapp.net/attachments/800317829962399795/802521536040402944/capsule_open1_red.png')
                            .setColor('RANDOM')
                            .setTimestamp()
                        ).then( msg => {
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