const { Client, Message, MessageEmbed } = require('discord.js');
const normaldata = require('../dat/gacha.json');
const raredata = require('../dat/raregacha.json');

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
        var random = Math.ceil( Math.random()*5 );
        let content = '';
        if(random === 1){
            let roleid = '';
            let rarerandom = Math.ceil( Math.random()*20 );
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
                )
            }, 3000);
        }).then( msg => {
            setTimeout(() => {
                msg.edit(
                    new MessageEmbed()
                    .setTitle('うんこガチャ')
                    .setImage('https://media.discordapp.net/attachments/800317829962399795/802521536040402944/capsule_open1_red.png')
                    .setColor('RANDOM')
                    .setTimestamp()
                );
            }, 3000);
        }).then( msg => {
            setTimeout(() => {
                msg.edit(
                    new MessageEmbed()
                    .setTitle('うんこガチャ')
                    .setDescription(`うんこガチャの結果\n${content}`)
                    .setColor('RANDOM')
                    .setTimestamp()
                );
            }, 3000);
        })
    },
};