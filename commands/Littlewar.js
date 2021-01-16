const { Client, Message, MessageEmbed } = require('discord.js');
const { Menu } = require('discord.js-menu');
const Littlewaremojis = require('../classs/Littlewaremojis');

const emojidata = ['<:unkooo:790538555407597590>', '<:emoji_105:790546312679391243>', '<:emoji_104:790546297521307668>'];
let emojis = {};
let userdata = {};

module.exports = {
    info: {
        name: "Littlewar",
        description: "対戦型ゲーム",
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
      　if(!userdata[message.guild.id]){
        console.log('通った1');
          let number = 1;
          for(const data of emojidata){
            emojis[number] = new Littlewaremojis(data);
            number++;
          }
          let LittlewarMenu = new Menu(message.channel, message.author.id, [
            {
                name: 'main',
                content: new MessageEmbed()
                .setDescription(`絵文字をリアクションの中から1つ選んでください`)
                .setColor('RANDOM')
                .setTimestamp(),
                reactions: {
                    '790538555407597590': 'emoji1',
                    '790546312679391243': 'emoji2',
                    '790546297521307668': 'emoji3'
                }
            },
            {
                name: 'emoji1',
                content: new MessageEmbed()
                .setDescription(`データを保存しました\n結果が出ましたら通知します`)
                .setColor('RANDOM')
                .setTimestamp(),
                reactions: {
                    '⏹': 'delete'
                }
            },
            {
                name: 'emoji2',
                content: new MessageEmbed()
                .setDescription(`データを保存しました\n結果が出ましたら通知します`)
                .setColor('RANDOM')
                .setTimestamp(),
                reactions: {
                    '⏹': 'delete'
                }
            },
            {
                name: 'emoji3',
                content: new MessageEmbed()
                .setDescription(`データを保存しました\n結果が出ましたら通知します`)
                .setColor('RANDOM')
                .setTimestamp(),
                reactions: {
                    '⏹': 'delete'
                }
            }
        ], 60000)
        LittlewarMenu.start()
        LittlewarMenu.on('pageChange', destination => {
            if (destination.name === 'emoji1') {
                userdata[message.guild.id] = {
                    userid: message.author.id,
                    number: emojis[1].number
                };
            }
            else if (destination.name === 'emoji2') {
                userdata[message.guild.id] = {
                    userid: message.author.id,
                    number: emojis[2].number
                };
            }
            else if (destination.name === 'emoji3') {
                userdata[message.guild.id] = {
                    userid: message.author.id,
                    number: emojis[1].number
                };
            }
          })
        }
        else{
            let LittlewarMenu = new Menu(message.channel, message.author.id, [
                {
                    name: 'main',
                    content: new MessageEmbed()
                    .setDescription(`絵文字をリアクションの中から1つ選んでください`)
                    .setColor('RANDOM')
                    .setTimestamp(),
                    reactions: {
                        '790538555407597590': 'emoji1',
                        '790546312679391243': 'emoji2',
                        '790546297521307668': 'emoji3'
                    }
                },
                {
                    name: 'emoji1',
                    content: new MessageEmbed()
                    .setDescription(`${emojidata[0]}を選択した！`)
                    .setColor('RANDOM')
                    .setTimestamp(),
                    reactions: {
                        '⏹': 'delete'
                    }
                },
                {
                    name: 'emoji2',
                    content: new MessageEmbed()
                    .setDescription(`${emojidata[1]}を選択した！`)
                    .setColor('RANDOM')
                    .setTimestamp(),
                    reactions: {
                        '⏹': 'delete'
                    }
                },
                {
                    name: 'emoji3',
                    content: new MessageEmbed()
                    .setDescription(`${emojidata[2]}を選択した！`)
                    .setColor('RANDOM')
                    .setTimestamp(),
                    reactions: {
                        '⏹': 'delete'
                    }
                }
            ], 60000)
            LittlewarMenu.start()
            LittlewarMenu.on('pageChange', destination => {
                let playeremojidata = 1;
                if (destination.name === 'emoji1'){
                    playeremojidata = emojis[1].number;
                }
                else if (destination.name === 'emoji2'){
                    playeremojidata = emojis[2].number;
                }
                else if (destination.name === 'emoji3'){
                    playeremojidata = emojis[3].number;
                }
                if(playeremojidata > userdata[message.guild.id].number){
                    message.channel.send(`<@${userdata[message.guild.id].userid}>`,
                        new MessageEmbed()
                        .setDescription(`今回の勝負\n${message.author}の勝ち！`)
                        .setColor('RANDOM')
                        .setTimestamp()
                    );
                }
                else if(playeremojidata < userdata[message.guild.id].number){
                    message.channel.send(`<@${userdata[message.guild.id].userid}>`,
                        new MessageEmbed()
                        .setDescription(`今回の勝負\n<@${userdata[message.guild.id].userid}>の勝ち！`)
                        .setColor('RANDOM')
                        .setTimestamp()
                    );
                }
                else{
                    message.channel.send(`<@${userdata[message.guild.id].userid}>`,
                        new MessageEmbed()
                        .setDescription(`今回の勝負\n引き分け！`)
                        .setColor('RANDOM')
                        .setTimestamp()
                    );
                }
            })
        }
    },
};