const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  info: {
    name: "tintiro",
    description: "チンチロ",
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
    let usermoneydata = client.getMoney.get(message.author.id, message.guild.id);
    if (!usermoneydata) {
        usermoneydata　= { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, money: 0, dailylogin: 0 }
    }
    if(message.channel.id !== '798157114555105330' && message.channel.id !== '798176065562476604' && message.channel.id !== '798198069849227294' && message.channel.id !== '798486503255834664' && message.channel.id !== '798570749136601158' && message.guild.id === '706452606918066237') {
        message.delete();
        message.reply('そのコマンドは<#798157114555105330>・<#798176065562476604>、<#798198069849227294>、<#798486503255834664>、<#798570749136601158>でしか使用できません<a:owoxgif:793460058250805259>').then( msg => {
            msg.delete({ timeout: 5000 });
        });
        return;
    }
    let Latch = Number(args[0]);
    if(!Latch || Latch > 10000 || Latch < 500) return message.reply('第一引数に賭け金を100~20000の数値で入れてください！');
     const emojis = ['<:Dice1:800739696300654633>', '<:Dice2:800739696589668422>', '<:Dice3:800739696627679242>', '<:Dice4:800739696472358932>', '<:Dice5:800739696736600095>', '<:Dice6:800739696484548608>'];
     let Norole = Math.floor( Math.random() * emojis.length);
     if(Norole === 0){
        usermoneydata.money -= Latch;
        message.channel.send(
            new MessageEmbed()
            .setTitle('チンチロの結果')
            .setDescription(`ションベン\n${Latch}うんコイン消失\nあなたのうんコイン${usermoneydata.money}`)
            .setColor('RANDOM')
            .setTimestamp()
        );
     } 
     let slot = {};
     let slotlength = 11;
     while(slotlength < 40){
        slot[slotlength] = Math.floor( Math.random() * emojis.length);
        if(slotlength > 30){
           slotlength -= 20;
           slotlength++;
        }
        else{
           slotlength += 10;
        }
    }
    let Win = 0;
    if(slot[19] === slot[29] && slot[19] === slot[39]){
        if(slot[19] === 0){
            Win = Latch * 5;
            usermoneydata.money += Win;
            message.channel.send(
                new MessageEmbed()
                .setDescription(`${emojis[slot[11]]}-${emojis[slot[21]]}-${emojis[slot[31]]}\n\nうんこ抽選中...`)
                .setColor('RANDOM')
                .setTimestamp()
            ).then( reply => {
                    reply.edit(
                       new MessageEmbed()
                       .setDescription(`${emojis[slot[12]]}-${emojis[slot[22]]}-${emojis[slot[32]]}\n\nうんこ抽選中...`)
                       .setColor('RANDOM')
                       .setTimestamp()
                   ).then( reply => {
                        reply.edit(
                            new MessageEmbed()
                            .setDescription(`${emojis[slot[13]]}-${emojis[slot[23]]}-${emojis[slot[33]]}\n\nうんこ抽選中...`)
                            .setColor('RANDOM')
                            .setTimestamp()
                        ).then( reply => {
                                reply.edit(
                                    new MessageEmbed()
                                    .setDescription(`${emojis[slot[14]]}-${emojis[slot[24]]}-${emojis[slot[34]]}\n\nうんこ抽選中...`)
                                    .setColor('RANDOM')
                                    .setTimestamp()
                                ).then( reply => {
                                        reply.edit(
                                            new MessageEmbed()
                                            .setDescription(`${emojis[slot[15]]}-${emojis[slot[25]]}-${emojis[slot[35]]}\n\nうんこ抽選中...`)
                                            .setColor('RANDOM')
                                            .setTimestamp()
                                        ).then( reply => {
                                                reply.edit(
                                                    new MessageEmbed()
                                                    .setDescription(`${emojis[slot[16]]}-${emojis[slot[26]]}-${emojis[slot[36]]}\n\nうんこ抽選中...`)
                                                    .setColor('RANDOM')
                                                    .setTimestamp()
                                                ).then( reply => {
                                                        reply.edit(
                                                            new MessageEmbed()
                                                            .setDescription(`${emojis[slot[17]]}-${emojis[slot[27]]}-${emojis[slot[37]]}\n\nうんこ抽選中...`)
                                                            .setColor('RANDOM')
                                                            .setTimestamp()
                                                        ).then( reply => {
                                                                reply.edit(
                                                                    new MessageEmbed()
                                                                    .setDescription(`${emojis[slot[18]]}-${emojis[slot[28]]}-${emojis[slot[38]]}\n\nうんこ抽選中...`)
                                                                    .setColor('RANDOM')
                                                                    .setTimestamp()
                                                                ).then( reply => {
                                                                        reply.edit(`${message.author}`,
                                                                        new MessageEmbed()
                                                                        .setDescription(`${emojis[slot[19]]}-${emojis[slot[29]]}-${emojis[slot[39]]}\n\nピンゾロ！！！\n${Win}うんコイン獲得！\nあなたのうんコイン: ${usermoneydata.money}枚`)
                                                                        .setColor('RANDOM')
                                                                        .setTimestamp()
                                                                        );
                                                                })
                                                        })
                                                })
                                        })
                                })
                        })
                   })
            });
        }
        else{
            Win = Latch * 3;
            usermoneydata.money += Win;
            message.channel.send(
                new MessageEmbed()
                .setDescription(`${emojis[slot[11]]}-${emojis[slot[21]]}-${emojis[slot[31]]}\n\nうんこ抽選中...`)
                .setColor('RANDOM')
                .setTimestamp()
            ).then( reply => {
                    reply.edit(
                       new MessageEmbed()
                       .setDescription(`${emojis[slot[12]]}-${emojis[slot[22]]}-${emojis[slot[32]]}\n\nうんこ抽選中...`)
                       .setColor('RANDOM')
                       .setTimestamp()
                   ).then( reply => {
                        reply.edit(
                            new MessageEmbed()
                            .setDescription(`${emojis[slot[13]]}-${emojis[slot[23]]}-${emojis[slot[33]]}\n\nうんこ抽選中...`)
                            .setColor('RANDOM')
                            .setTimestamp()
                        ).then( reply => {
                                reply.edit(
                                    new MessageEmbed()
                                    .setDescription(`${emojis[slot[14]]}-${emojis[slot[24]]}-${emojis[slot[34]]}\n\nうんこ抽選中...`)
                                    .setColor('RANDOM')
                                    .setTimestamp()
                                ).then( reply => {
                                        reply.edit(
                                            new MessageEmbed()
                                            .setDescription(`${emojis[slot[15]]}-${emojis[slot[25]]}-${emojis[slot[35]]}\n\nうんこ抽選中...`)
                                            .setColor('RANDOM')
                                            .setTimestamp()
                                        ).then( reply => {
                                                reply.edit(
                                                    new MessageEmbed()
                                                    .setDescription(`${emojis[slot[16]]}-${emojis[slot[26]]}-${emojis[slot[36]]}\n\nうんこ抽選中...`)
                                                    .setColor('RANDOM')
                                                    .setTimestamp()
                                                ).then( reply => {
                                                        reply.edit(
                                                            new MessageEmbed()
                                                            .setDescription(`${emojis[slot[17]]}-${emojis[slot[27]]}-${emojis[slot[37]]}\n\nうんこ抽選中...`)
                                                            .setColor('RANDOM')
                                                            .setTimestamp()
                                                        ).then( reply => {
                                                                reply.edit(
                                                                    new MessageEmbed()
                                                                    .setDescription(`${emojis[slot[18]]}-${emojis[slot[28]]}-${emojis[slot[38]]}\n\nうんこ抽選中...`)
                                                                    .setColor('RANDOM')
                                                                    .setTimestamp()
                                                                ).then( reply => {
                                                                        reply.edit(`${message.author}`,
                                                                        new MessageEmbed()
                                                                        .setDescription(`${emojis[slot[19]]}-${emojis[slot[29]]}-${emojis[slot[39]]}\n\nゾロ目\n${Win}うんコイン獲得！\nあなたのうんコイン: ${usermoneydata.money}枚`)
                                                                        .setColor('RANDOM')
                                                                        .setTimestamp()
                                                                        );
                                                                })
                                                        })
                                                })
                                        })
                                })
                        })
                   })
            });
        }
    }
    else if(slot[19] === 3 && slot[29] === 4 && slot[39] === 5){
       　　　Win = Latch * 2;
            usermoneydata.money += Win;
            message.channel.send(
                new MessageEmbed()
                .setDescription(`${emojis[slot[11]]}-${emojis[slot[21]]}-${emojis[slot[31]]}\n\nうんこ抽選中...`)
                .setColor('RANDOM')
                .setTimestamp()
            ).then( reply => {
                    reply.edit(
                       new MessageEmbed()
                       .setDescription(`${emojis[slot[12]]}-${emojis[slot[22]]}-${emojis[slot[32]]}\n\nうんこ抽選中...`)
                       .setColor('RANDOM')
                       .setTimestamp()
                   ).then( reply => {
                        reply.edit(
                            new MessageEmbed()
                            .setDescription(`${emojis[slot[13]]}-${emojis[slot[23]]}-${emojis[slot[33]]}\n\nうんこ抽選中...`)
                            .setColor('RANDOM')
                            .setTimestamp()
                        ).then( reply => {
                                reply.edit(
                                    new MessageEmbed()
                                    .setDescription(`${emojis[slot[14]]}-${emojis[slot[24]]}-${emojis[slot[34]]}\n\nうんこ抽選中...`)
                                    .setColor('RANDOM')
                                    .setTimestamp()
                                ).then( reply => {
                                        reply.edit(
                                            new MessageEmbed()
                                            .setDescription(`${emojis[slot[15]]}-${emojis[slot[25]]}-${emojis[slot[35]]}\n\nうんこ抽選中...`)
                                            .setColor('RANDOM')
                                            .setTimestamp()
                                        ).then( reply => {
                                                reply.edit(
                                                    new MessageEmbed()
                                                    .setDescription(`${emojis[slot[16]]}-${emojis[slot[26]]}-${emojis[slot[36]]}\n\nうんこ抽選中...`)
                                                    .setColor('RANDOM')
                                                    .setTimestamp()
                                                ).then( reply => {
                                                        reply.edit(
                                                            new MessageEmbed()
                                                            .setDescription(`${emojis[slot[17]]}-${emojis[slot[27]]}-${emojis[slot[37]]}\n\nうんこ抽選中...`)
                                                            .setColor('RANDOM')
                                                            .setTimestamp()
                                                        ).then( reply => {
                                                                reply.edit(
                                                                    new MessageEmbed()
                                                                    .setDescription(`${emojis[slot[18]]}-${emojis[slot[28]]}-${emojis[slot[38]]}\n\nうんこ抽選中...`)
                                                                    .setColor('RANDOM')
                                                                    .setTimestamp()
                                                                ).then( reply => {
                                                                        reply.edit(`${message.author}`,
                                                                        new MessageEmbed()
                                                                        .setDescription(`${emojis[slot[19]]}-${emojis[slot[29]]}-${emojis[slot[39]]}\n\nシゴロ\n${Win}うんコイン獲得！\nあなたのうんコイン: ${usermoneydata.money}枚`)
                                                                        .setColor('RANDOM')
                                                                        .setTimestamp()
                                                                        );
                                                                })
                                                        })
                                                })
                                        })
                                })
                        })
                   })
            });
    }
    else if(slot[19] === 1 && slot[29] === 1 && slot[39] === 5 || slot[19] === 1 && slot[29] === 1 && slot[39] === 4 || slot[19] === 1 && slot[29] === 1 && slot[39] === 3 || slot[19] === 1 && slot[29] === 1 && slot[39] === 2 || slot[19] === 2 && slot[29] === 2 && slot[39] === 1 || slot[19] === 1 && slot[29] === 1 && slot[39] === 0){
        　　　Win = Latch;
             usermoneydata.money += Win;
             message.channel.send(
                 new MessageEmbed()
                 .setDescription(`${emojis[slot[11]]}-${emojis[slot[21]]}-${emojis[slot[31]]}\n\nうんこ抽選中...`)
                 .setColor('RANDOM')
                 .setTimestamp()
             ).then( reply => {
                     reply.edit(
                        new MessageEmbed()
                        .setDescription(`${emojis[slot[12]]}-${emojis[slot[22]]}-${emojis[slot[32]]}\n\nうんこ抽選中...`)
                        .setColor('RANDOM')
                        .setTimestamp()
                    ).then( reply => {
                         reply.edit(
                             new MessageEmbed()
                             .setDescription(`${emojis[slot[13]]}-${emojis[slot[23]]}-${emojis[slot[33]]}\n\nうんこ抽選中...`)
                             .setColor('RANDOM')
                             .setTimestamp()
                         ).then( reply => {
                                 reply.edit(
                                     new MessageEmbed()
                                     .setDescription(`${emojis[slot[14]]}-${emojis[slot[24]]}-${emojis[slot[34]]}\n\nうんこ抽選中...`)
                                     .setColor('RANDOM')
                                     .setTimestamp()
                                 ).then( reply => {
                                         reply.edit(
                                             new MessageEmbed()
                                             .setDescription(`${emojis[slot[15]]}-${emojis[slot[25]]}-${emojis[slot[35]]}\n\nうんこ抽選中...`)
                                             .setColor('RANDOM')
                                             .setTimestamp()
                                         ).then( reply => {
                                                 reply.edit(
                                                     new MessageEmbed()
                                                     .setDescription(`${emojis[slot[16]]}-${emojis[slot[26]]}-${emojis[slot[36]]}\n\nうんこ抽選中...`)
                                                     .setColor('RANDOM')
                                                     .setTimestamp()
                                                 ).then( reply => {
                                                         reply.edit(
                                                             new MessageEmbed()
                                                             .setDescription(`${emojis[slot[17]]}-${emojis[slot[27]]}-${emojis[slot[37]]}\n\nうんこ抽選中...`)
                                                             .setColor('RANDOM')
                                                             .setTimestamp()
                                                         ).then( reply => {
                                                                 reply.edit(
                                                                     new MessageEmbed()
                                                                     .setDescription(`${emojis[slot[18]]}-${emojis[slot[28]]}-${emojis[slot[38]]}\n\nうんこ抽選中...`)
                                                                     .setColor('RANDOM')
                                                                     .setTimestamp()
                                                                 ).then( reply => {
                                                                         reply.edit(`${message.author}`,
                                                                         new MessageEmbed()
                                                                         .setDescription(`${emojis[slot[19]]}-${emojis[slot[29]]}-${emojis[slot[39]]}\n\n通常の目\nあなたのうんコイン: ${usermoneydata.money}枚`)
                                                                         .setColor('RANDOM')
                                                                         .setTimestamp()
                                                                         );
                                                                 })
                                                         })
                                                 })
                                         })
                                 })
                         })
                    })
             });
    }
    else if(slot[19] === 0 && slot[29] === 1 && slot[39] === 2){
        　　　Win = Latch * 2;
             usermoneydata.money -= Win;
             message.channel.send(
                 new MessageEmbed()
                 .setDescription(`${emojis[slot[11]]}-${emojis[slot[21]]}-${emojis[slot[31]]}\n\nうんこ抽選中...`)
                 .setColor('RANDOM')
                 .setTimestamp()
             ).then( reply => {
                     reply.edit(
                        new MessageEmbed()
                        .setDescription(`${emojis[slot[12]]}-${emojis[slot[22]]}-${emojis[slot[32]]}\n\nうんこ抽選中...`)
                        .setColor('RANDOM')
                        .setTimestamp()
                    ).then( reply => {
                         reply.edit(
                             new MessageEmbed()
                             .setDescription(`${emojis[slot[13]]}-${emojis[slot[23]]}-${emojis[slot[33]]}\n\nうんこ抽選中...`)
                             .setColor('RANDOM')
                             .setTimestamp()
                         ).then( reply => {
                                 reply.edit(
                                     new MessageEmbed()
                                     .setDescription(`${emojis[slot[14]]}-${emojis[slot[24]]}-${emojis[slot[34]]}\n\nうんこ抽選中...`)
                                     .setColor('RANDOM')
                                     .setTimestamp()
                                 ).then( reply => {
                                         reply.edit(
                                             new MessageEmbed()
                                             .setDescription(`${emojis[slot[15]]}-${emojis[slot[25]]}-${emojis[slot[35]]}\n\nうんこ抽選中...`)
                                             .setColor('RANDOM')
                                             .setTimestamp()
                                         ).then( reply => {
                                                 reply.edit(
                                                     new MessageEmbed()
                                                     .setDescription(`${emojis[slot[16]]}-${emojis[slot[26]]}-${emojis[slot[36]]}\n\nうんこ抽選中...`)
                                                     .setColor('RANDOM')
                                                     .setTimestamp()
                                                 ).then( reply => {
                                                         reply.edit(
                                                             new MessageEmbed()
                                                             .setDescription(`${emojis[slot[17]]}-${emojis[slot[27]]}-${emojis[slot[37]]}\n\nうんこ抽選中...`)
                                                             .setColor('RANDOM')
                                                             .setTimestamp()
                                                         ).then( reply => {
                                                                 reply.edit(
                                                                     new MessageEmbed()
                                                                     .setDescription(`${emojis[slot[18]]}-${emojis[slot[28]]}-${emojis[slot[38]]}\n\nうんこ抽選中...`)
                                                                     .setColor('RANDOM')
                                                                     .setTimestamp()
                                                                 ).then( reply => {
                                                                         reply.edit(`${message.author}`,
                                                                         new MessageEmbed()
                                                                         .setDescription(`${emojis[slot[19]]}-${emojis[slot[29]]}-${emojis[slot[39]]}\nヒフミ\n${Win}うんコイン消失\nあなたのうんコイン: ${usermoneydata.money}枚`)
                                                                         .setColor('RANDOM')
                                                                         .setTimestamp()
                                                                         );
                                                                 })
                                                         })
                                                 })
                                         })
                                 })
                         })
                    })
             });
    }
    else{
    usermoneydata.money -= Latch;
    message.channel.send(
        new MessageEmbed()
        .setDescription(`${emojis[slot[11]]}-${emojis[slot[21]]}-${emojis[slot[31]]}\n\nうんこ抽選中...`)
        .setColor('RANDOM')
        .setTimestamp()
    ).then( reply => {
            reply.edit(
               new MessageEmbed()
               .setDescription(`${emojis[slot[12]]}-${emojis[slot[22]]}-${emojis[slot[32]]}\n\nうんこ抽選中...`)
               .setColor('RANDOM')
               .setTimestamp()
           ).then( reply => {
                reply.edit(
                    new MessageEmbed()
                    .setDescription(`${emojis[slot[13]]}-${emojis[slot[23]]}-${emojis[slot[33]]}\n\nうんこ抽選中...`)
                    .setColor('RANDOM')
                    .setTimestamp()
                ).then( reply => {
                        reply.edit(
                            new MessageEmbed()
                            .setDescription(`${emojis[slot[14]]}-${emojis[slot[24]]}-${emojis[slot[34]]}\n\nうんこ抽選中...`)
                            .setColor('RANDOM')
                            .setTimestamp()
                        ).then( reply => {
                                reply.edit(
                                    new MessageEmbed()
                                    .setDescription(`${emojis[slot[15]]}-${emojis[slot[25]]}-${emojis[slot[35]]}\n\nうんこ抽選中...`)
                                    .setColor('RANDOM')
                                    .setTimestamp()
                                ).then( reply => {
                                        reply.edit(
                                            new MessageEmbed()
                                            .setDescription(`${emojis[slot[16]]}-${emojis[slot[26]]}-${emojis[slot[36]]}\n\nうんこ抽選中...`)
                                            .setColor('RANDOM')
                                            .setTimestamp()
                                        ).then( reply => {
                                                reply.edit(
                                                    new MessageEmbed()
                                                    .setDescription(`${emojis[slot[17]]}-${emojis[slot[27]]}-${emojis[slot[37]]}\n\nうんこ抽選中...`)
                                                    .setColor('RANDOM')
                                                    .setTimestamp()
                                                ).then( reply => {
                                                        reply.edit(
                                                            new MessageEmbed()
                                                            .setDescription(`${emojis[slot[18]]}-${emojis[slot[28]]}-${emojis[slot[38]]}\n\nうんこ抽選中...`)
                                                            .setColor('RANDOM')
                                                            .setTimestamp()
                                                        ).then( reply => {
                                                              reply.edit(
                                                                new MessageEmbed()
                                                                .setDescription(`${emojis[slot[19]]}-${emojis[slot[29]]}-${emojis[slot[39]]}\n\n役なし\n${Latch}うんコイン消失\nあなたのうんコイン: ${usermoneydata.money}枚`)
                                                                .setColor('RANDOM')
                                                                .setTimestamp()
                                                                  );
                                                        })
                                                })
                                        })
                                })
                            })
                })
           })
    });    
    }
    client.setMoney.run(usermoneydata);
  },
};