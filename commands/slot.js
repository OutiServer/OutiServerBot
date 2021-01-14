const { Client, Message, MessageEmbed, WebhookClient } = require("discord.js");

module.exports = {
  info: {
    name: "slot",
    description: "スロット",
    usage: "",
    aliases: ["s"],
    botownercommand: false,
    botadmincommand: false
  },
/**
 * @param {Message} message
 * @param {Client} client
 */
  run: async function (client, message, args) { 
    let userdebtdata = client.getDebt.get(message.author.id, message.guild.id);
    if (!userdebtdata) {
      userdebtdata　= { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, Tuna: 0, Shoulder: null }
    }
    let usermoneydata = client.getMoney.get(message.author.id, message.guild.id);
    if (!usermoneydata) {
        usermoneydata　= { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, money: 0, dailylogin: 0 }
    }
    let slotsettingsdata = client.getSlotsettings.get(message.guild.id);
    if (!slotsettingsdata) {
        slotsettingsdata　= { id: `${message.guild.id}`, guild: message.guild.id, Jackpotprobability: 10, Jackpot: 100000 }
    }
    if(userdebtdata.Tuna === 0){
        if(message.channel.id !== '798157114555105330' && message.channel.id !== '798176065562476604' && message.channel.id !== '798198069849227294' && message.channel.id !== '798486503255834664' && message.channel.id !== '798570749136601158' && message.guild.id === '706452606918066237') {
            message.delete();
            const reply = await message.reply('そのコマンドは<#798157114555105330>・<#798176065562476604>、<#798198069849227294>、<#798486503255834664>、<#798570749136601158>でしか使用できません<a:owoxgif:793460058250805259>');
            reply.delete({ timeout: 5000 });
            return;
        }
        if(message.channel.id === '798486503255834664' || usermoneydata.money > 99999){
            var Latch = 20000;
        }
        else{
            var Latch = 2000;
        }
        slotsettingsdata.Jackpot += Latch;
        var random = Math.round( Math.random()*slotsettingsdata.Jackpotprobability );
        if(random === 0){
            const emojis = ['<:image0:798159753611575296>', '<:unkooo:790538555407597590>', '<:emoji_106:790546684710223882>', '<:Butter_sote_spla:777481415616102400>', '<:syowatan:773869600189448202>', '<:Butter_sote:772132826756808714>', '<:emoji_57:774599957273378848>', '<:emoji_75:775276792570707968>', '<:emoji_74:775276727437754408>', '<:Daisuke:706520557176225802>', '<a:HIVE:779352019827294239>', '<:__:706468448581976085>'];
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
            const reply1 = await message.channel.send(
                new MessageEmbed()
                .setDescription(`${emojis[slot[11]]}-${emojis[slot[21]]}-${emojis[slot[31]]}\n\nうんこ抽選中...`)
                .setColor('RANDOM')
                .setTimestamp()
              );
            setTimeout( async () => {
                await reply1.edit(
                    new MessageEmbed()
                    .setDescription(`${emojis[slot[12]]}-${emojis[slot[22]]}-${emojis[slot[32]]}\n\nうんこ抽選中...`)
                    .setColor('RANDOM')
                    .setTimestamp()
                );
            }, 100);
            setTimeout( async () => {
                await reply1.edit(
                    new MessageEmbed()
                    .setDescription(`${emojis[slot[13]]}-${emojis[slot[23]]}-${emojis[slot[33]]}\n\nうんこ抽選中...`)
                    .setColor('RANDOM')
                    .setTimestamp()
                );
            }, 200);
            setTimeout( async () => {
                await reply1.edit(
                    new MessageEmbed()
                    .setDescription(`${emojis[slot[14]]}-${emojis[slot[24]]}-${emojis[slot[34]]}\n\nうんこ抽選中...`)
                    .setColor('RANDOM')
                    .setTimestamp()
                );
            }, 300);
            setTimeout( async () => {
                await reply1.edit(
                    new MessageEmbed()
                    .setDescription(`${emojis[slot[15]]}-${emojis[slot[25]]}-${emojis[slot[35]]}\n\nうんこ抽選中...`)
                    .setColor('RANDOM')
                    .setTimestamp()
                );
            }, 400);
            setTimeout( async() => {
                await reply1.edit(
                    new MessageEmbed()
                    .setDescription(`${emojis[slot[16]]}-${emojis[slot[26]]}-${emojis[slot[36]]}\n\nうんこ抽選中...`)
                    .setColor('RANDOM')
                    .setTimestamp()
                );
            }, 500);
            setTimeout( async () => {
                await reply1.edit(
                    new MessageEmbed()
                    .setDescription(`${emojis[slot[17]]}-${emojis[slot[27]]}-${emojis[slot[37]]}\n\nうんこ抽選中...`)
                    .setColor('RANDOM')
                    .setTimestamp()
                );
            }, 600);
            setTimeout( async () => {
                await reply1.edit(
                    new MessageEmbed()
                    .setDescription(`${emojis[slot[18]]}-${emojis[slot[28]]}-${emojis[slot[38]]}\n\nうんこ抽選中...`)
                    .setColor('RANDOM')
                    .setTimestamp()
                );
            }, 700);
            if(slot[19] === slot[29] && slot[19] === slot[39]){
                if(slot[19] === 0){
                    let Win = slotsettingsdata.Jackpot
                    usermoneydata.money += Win;
                    slotsettingsdata.Jackpot = 100000;
                    slotsettingsdata.Jackpotprobability = 10;
                    client.channels.cache.get('798479605764718592').send(
                        new MessageEmbed()
                        .setDescription(`<@${message.author.id}>がジャックポットを当て、${Win}うんコイン入手しました！`)
                        .setColor('RANDOM')
                        .setTimestamp());
                        await message.channel.send(
                            new MessageEmbed()
                            .setDescription(`${emojis[slot[11]]}-${emojis[slot[21]]}-${emojis[slot[31]]}\n\nうんこ抽選中...`)
                            .setColor('RANDOM')
                            .setTimestamp()
                        ).then( reply => {
                            setTimeout( () => {
                                reply.edit(
                                   new MessageEmbed()
                                   .setDescription(`${emojis[slot[12]]}-${emojis[slot[22]]}-${emojis[slot[32]]}\n\nうんこ抽選中...`)
                                   .setColor('RANDOM')
                                   .setTimestamp()
                               ).then( reply => {
                                setTimeout( () => {
                                    reply.edit(
                                        new MessageEmbed()
                                        .setDescription(`${emojis[slot[13]]}-${emojis[slot[23]]}-${emojis[slot[33]]}\n\nうんこ抽選中...`)
                                        .setColor('RANDOM')
                                        .setTimestamp()
                                    ).then( reply => {
                                        setTimeout( () => {
                                            reply.edit(
                                                new MessageEmbed()
                                                .setDescription(`${emojis[slot[14]]}-${emojis[slot[24]]}-${emojis[slot[34]]}\n\nうんこ抽選中...`)
                                                .setColor('RANDOM')
                                                .setTimestamp()
                                            ).then( reply => {
                                                setTimeout( () => {
                                                    reply.edit(
                                                        new MessageEmbed()
                                                        .setDescription(`${emojis[slot[15]]}-${emojis[slot[25]]}-${emojis[slot[35]]}\n\nうんこ抽選中...`)
                                                        .setColor('RANDOM')
                                                        .setTimestamp()
                                                    ).then( reply => {
                                                        setTimeout( () => {
                                                            reply.edit(
                                                                new MessageEmbed()
                                                                .setDescription(`${emojis[slot[16]]}-${emojis[slot[26]]}-${emojis[slot[36]]}\n\nうんこ抽選中...`)
                                                                .setColor('RANDOM')
                                                                .setTimestamp()
                                                            ).then( reply => {
                                                                setTimeout( () => {
                                                                    reply.edit(
                                                                        new MessageEmbed()
                                                                        .setDescription(`${emojis[slot[17]]}-${emojis[slot[27]]}-${emojis[slot[37]]}\n\nうんこ抽選中...`)
                                                                        .setColor('RANDOM')
                                                                        .setTimestamp()
                                                                    ).then( reply => {
                                                                        setTimeout( () => {
                                                                            reply.edit(
                                                                                new MessageEmbed()
                                                                                .setDescription(`${emojis[slot[18]]}-${emojis[slot[28]]}-${emojis[slot[38]]}\n\nうんこ抽選中...`)
                                                                                .setColor('RANDOM')
                                                                                .setTimestamp()
                                                                            ).then( reply => {
                                                                                setTimeout( () => {
                                                                                    reply.edit(`${message.author}`,
                                                                                    new MessageEmbed()
                                                                                    .setDescription(`${emojis[slot[19]]}-${emojis[slot[29]]}-${emojis[slot[39]]}\n\nジャックポット当選、おめでとう！\n${Win}うんコイン獲得！\nあなたのうんコイン: ${usermoneydata.money}枚`)
                                                                                    .setColor('RANDOM')
                                                                                    .setTimestamp());
                                                                                }, 1000);
                                                                            })
                                                                        }, 700)
                                                                    })
                                                                }, 600)
                                                            })
                                                        }, 500)
                                                    })
                                                }, 400)
                                            })
                                        }, 300)
                                    })
                                }, 200)
                               })
                            }, 100)
                        })
                }
                else{
                    let Win = Latch * 10
                    usermoneydata.money += Win;
                    await message.channel.send(
                        new MessageEmbed()
                        .setDescription(`${emojis[slot[11]]}-${emojis[slot[21]]}-${emojis[slot[31]]}\n\nうんこ抽選中...`)
                        .setColor('RANDOM')
                        .setTimestamp()
                    ).then( reply => {
                        setTimeout( () => {
                            reply.edit(
                               new MessageEmbed()
                               .setDescription(`${emojis[slot[12]]}-${emojis[slot[22]]}-${emojis[slot[32]]}\n\nうんこ抽選中...`)
                               .setColor('RANDOM')
                               .setTimestamp()
                           ).then( reply => {
                            setTimeout( () => {
                                reply.edit(
                                    new MessageEmbed()
                                    .setDescription(`${emojis[slot[13]]}-${emojis[slot[23]]}-${emojis[slot[33]]}\n\nうんこ抽選中...`)
                                    .setColor('RANDOM')
                                    .setTimestamp()
                                ).then( reply => {
                                    setTimeout( () => {
                                        reply.edit(
                                            new MessageEmbed()
                                            .setDescription(`${emojis[slot[14]]}-${emojis[slot[24]]}-${emojis[slot[34]]}\n\nうんこ抽選中...`)
                                            .setColor('RANDOM')
                                            .setTimestamp()
                                        ).then( reply => {
                                            setTimeout( () => {
                                                reply.edit(
                                                    new MessageEmbed()
                                                    .setDescription(`${emojis[slot[15]]}-${emojis[slot[25]]}-${emojis[slot[35]]}\n\nうんこ抽選中...`)
                                                    .setColor('RANDOM')
                                                    .setTimestamp()
                                                ).then( reply => {
                                                    setTimeout( () => {
                                                        reply.edit(
                                                            new MessageEmbed()
                                                            .setDescription(`${emojis[slot[16]]}-${emojis[slot[26]]}-${emojis[slot[36]]}\n\nうんこ抽選中...`)
                                                            .setColor('RANDOM')
                                                            .setTimestamp()
                                                        ).then( reply => {
                                                            setTimeout( () => {
                                                                reply.edit(
                                                                    new MessageEmbed()
                                                                    .setDescription(`${emojis[slot[17]]}-${emojis[slot[27]]}-${emojis[slot[37]]}\n\nうんこ抽選中...`)
                                                                    .setColor('RANDOM')
                                                                    .setTimestamp()
                                                                ).then( reply => {
                                                                    setTimeout( () => {
                                                                        reply.edit(
                                                                            new MessageEmbed()
                                                                            .setDescription(`${emojis[slot[18]]}-${emojis[slot[28]]}-${emojis[slot[38]]}\n\nうんこ抽選中...`)
                                                                            .setColor('RANDOM')
                                                                            .setTimestamp()
                                                                        ).then( reply => {
                                                                            setTimeout( () => {
                                                                               reply.edit(`${message.author}`,
                                                                                new MessageEmbed()
                                                                                .setDescription(`${emojis[slot[19]]}-${emojis[slot[29]]}-${emojis[slot[39]]}\n\n大当たり、おめでとう！\n${Win}}うんコイン獲得！\nあなたのうんコイン: ${usermoneydata.money}枚`)
                                                                                .setColor('RANDOM')
                                                                                .setTimestamp());
                                                                            }, 1000);
                                                                        })
                                                                    }, 700)
                                                                })
                                                            }, 600)
                                                        })
                                                    }, 500)
                                                })
                                            }, 400)
                                        })
                                    }, 300)
                                })
                            }, 200)
                           })
                        }, 100)
                    })
                } 
            }
            else{
            usermoneydata.money -= Latch;
            await message.channel.send(
                new MessageEmbed()
                .setDescription(`${emojis[slot[11]]}-${emojis[slot[21]]}-${emojis[slot[31]]}\n\nうんこ抽選中...`)
                .setColor('RANDOM')
                .setTimestamp()
            ).then( reply => {
                setTimeout( () => {
                    reply.edit(
                       new MessageEmbed()
                       .setDescription(`${emojis[slot[12]]}-${emojis[slot[22]]}-${emojis[slot[32]]}\n\nうんこ抽選中...`)
                       .setColor('RANDOM')
                       .setTimestamp()
                   ).then( reply => {
                    setTimeout( () => {
                        reply.edit(
                            new MessageEmbed()
                            .setDescription(`${emojis[slot[13]]}-${emojis[slot[23]]}-${emojis[slot[33]]}\n\nうんこ抽選中...`)
                            .setColor('RANDOM')
                            .setTimestamp()
                        ).then( reply => {
                            setTimeout( () => {
                                reply.edit(
                                    new MessageEmbed()
                                    .setDescription(`${emojis[slot[14]]}-${emojis[slot[24]]}-${emojis[slot[34]]}\n\nうんこ抽選中...`)
                                    .setColor('RANDOM')
                                    .setTimestamp()
                                ).then( reply => {
                                    setTimeout( () => {
                                        reply.edit(
                                            new MessageEmbed()
                                            .setDescription(`${emojis[slot[15]]}-${emojis[slot[25]]}-${emojis[slot[35]]}\n\nうんこ抽選中...`)
                                            .setColor('RANDOM')
                                            .setTimestamp()
                                        ).then( reply => {
                                            setTimeout( () => {
                                                reply.edit(
                                                    new MessageEmbed()
                                                    .setDescription(`${emojis[slot[16]]}-${emojis[slot[26]]}-${emojis[slot[36]]}\n\nうんこ抽選中...`)
                                                    .setColor('RANDOM')
                                                    .setTimestamp()
                                                ).then( reply => {
                                                    setTimeout( () => {
                                                        reply.edit(
                                                            new MessageEmbed()
                                                            .setDescription(`${emojis[slot[17]]}-${emojis[slot[27]]}-${emojis[slot[37]]}\n\nうんこ抽選中...`)
                                                            .setColor('RANDOM')
                                                            .setTimestamp()
                                                        ).then( reply => {
                                                            setTimeout( () => {
                                                                reply.edit(
                                                                    new MessageEmbed()
                                                                    .setDescription(`${emojis[slot[18]]}-${emojis[slot[28]]}-${emojis[slot[38]]}\n\nうんこ抽選中...`)
                                                                    .setColor('RANDOM')
                                                                    .setTimestamp()
                                                                ).then( reply => {
                                                                    setTimeout( () => {
                                                                      reply.edit(
                                                                        new MessageEmbed()
                                                                        .setDescription(`${emojis[slot[19]]}-${emojis[slot[29]]}-${emojis[slot[39]]}\n\nハズレ 次は当たるといいな＾＾\n${Latch}うんコイン消失\nあなたのうんコイン: ${usermoneydata.money}枚`)
                                                                        .setColor('RANDOM')
                                                                        .setTimestamp()
                                                                          );
                                                                    }, 1000);
                                                                })
                                                            }, 700)
                                                        })
                                                    }, 600)
                                                })
                                            }, 500)
                                        })
                                    }, 400)
                                })
                            }, 300)
                        })
                    }, 200)
                   })
                }, 100)
            });    
            }
        }
        else{
         const emojis = ['<:image0:798159753611575296>', '<:swordthonk:798179606166634516>', '<:swordthinkblue:798179591582908446>'];
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
                Win = Latch * 7;
            }
            else if(slot[19] === 1){
                Win = Latch * 5;
            }
            else if(slot[19] === 2){
                Win = Latch * 3;
            }
            usermoneydata.money += Win;
            await message.channel.send(
                new MessageEmbed()
                .setDescription(`${emojis[slot[11]]}-${emojis[slot[21]]}-${emojis[slot[31]]}\n\nうんこ抽選中...`)
                .setColor('RANDOM')
                .setTimestamp()
            ).then( reply => {
                setTimeout( () => {
                    reply.edit(
                       new MessageEmbed()
                       .setDescription(`${emojis[slot[12]]}-${emojis[slot[22]]}-${emojis[slot[32]]}\n\nうんこ抽選中...`)
                       .setColor('RANDOM')
                       .setTimestamp()
                   ).then( reply => {
                    setTimeout( () => {
                        reply.edit(
                            new MessageEmbed()
                            .setDescription(`${emojis[slot[13]]}-${emojis[slot[23]]}-${emojis[slot[33]]}\n\nうんこ抽選中...`)
                            .setColor('RANDOM')
                            .setTimestamp()
                        ).then( reply => {
                            setTimeout( () => {
                                reply.edit(
                                    new MessageEmbed()
                                    .setDescription(`${emojis[slot[14]]}-${emojis[slot[24]]}-${emojis[slot[34]]}\n\nうんこ抽選中...`)
                                    .setColor('RANDOM')
                                    .setTimestamp()
                                ).then( reply => {
                                    setTimeout( () => {
                                        reply.edit(
                                            new MessageEmbed()
                                            .setDescription(`${emojis[slot[15]]}-${emojis[slot[25]]}-${emojis[slot[35]]}\n\nうんこ抽選中...`)
                                            .setColor('RANDOM')
                                            .setTimestamp()
                                        ).then( reply => {
                                            setTimeout( () => {
                                                reply.edit(
                                                    new MessageEmbed()
                                                    .setDescription(`${emojis[slot[16]]}-${emojis[slot[26]]}-${emojis[slot[36]]}\n\nうんこ抽選中...`)
                                                    .setColor('RANDOM')
                                                    .setTimestamp()
                                                ).then( reply => {
                                                    setTimeout( () => {
                                                        reply.edit(
                                                            new MessageEmbed()
                                                            .setDescription(`${emojis[slot[17]]}-${emojis[slot[27]]}-${emojis[slot[37]]}\n\nうんこ抽選中...`)
                                                            .setColor('RANDOM')
                                                            .setTimestamp()
                                                        ).then( reply => {
                                                            setTimeout( () => {
                                                                reply.edit(
                                                                    new MessageEmbed()
                                                                    .setDescription(`${emojis[slot[18]]}-${emojis[slot[28]]}-${emojis[slot[38]]}\n\nうんこ抽選中...`)
                                                                    .setColor('RANDOM')
                                                                    .setTimestamp()
                                                                ).then( reply => {
                                                                    setTimeout( () => {
                                                                        reply.edit(`${message.author}`,
                                                                        new MessageEmbed()
                                                                        .setDescription(`${emojis[slot[19]]}-${emojis[slot[29]]}-${emojis[slot[39]]}\n\nおおあたり おめでとう！\n${Win}うんコイン獲得！\nあなたのうんコイン: ${usermoneydata.money}枚`)
                                                                        .setColor('RANDOM')
                                                                        .setTimestamp()
                                                                        );
                                                                    }, 1000);
                                                                })
                                                            }, 700)
                                                        })
                                                    }, 600)
                                                })
                                            }, 500)
                                        })
                                    }, 400)
                                })
                            }, 300)
                        })
                    }, 200)
                   })
                }, 100)
            })
            
        }
        else{
           usermoneydata.money -= Latch;
        await message.channel.send(
            new MessageEmbed()
            .setDescription(`${emojis[slot[11]]}-${emojis[slot[21]]}-${emojis[slot[31]]}\n\nうんこ抽選中...`)
            .setColor('RANDOM')
            .setTimestamp()
        ).then( reply => {
            setTimeout( () => {
                reply.edit(
                   new MessageEmbed()
                   .setDescription(`${emojis[slot[12]]}-${emojis[slot[22]]}-${emojis[slot[32]]}\n\nうんこ抽選中...`)
                   .setColor('RANDOM')
                   .setTimestamp()
               ).then( reply => {
                setTimeout( () => {
                    reply.edit(
                        new MessageEmbed()
                        .setDescription(`${emojis[slot[13]]}-${emojis[slot[23]]}-${emojis[slot[33]]}\n\nうんこ抽選中...`)
                        .setColor('RANDOM')
                        .setTimestamp()
                    ).then( reply => {
                        setTimeout( () => {
                            reply.edit(
                                new MessageEmbed()
                                .setDescription(`${emojis[slot[14]]}-${emojis[slot[24]]}-${emojis[slot[34]]}\n\nうんこ抽選中...`)
                                .setColor('RANDOM')
                                .setTimestamp()
                            ).then( reply => {
                                setTimeout( () => {
                                    reply.edit(
                                        new MessageEmbed()
                                        .setDescription(`${emojis[slot[15]]}-${emojis[slot[25]]}-${emojis[slot[35]]}\n\nうんこ抽選中...`)
                                        .setColor('RANDOM')
                                        .setTimestamp()
                                    ).then( reply => {
                                        setTimeout( () => {
                                            reply.edit(
                                                new MessageEmbed()
                                                .setDescription(`${emojis[slot[16]]}-${emojis[slot[26]]}-${emojis[slot[36]]}\n\nうんこ抽選中...`)
                                                .setColor('RANDOM')
                                                .setTimestamp()
                                            ).then( reply => {
                                                setTimeout( () => {
                                                    reply.edit(
                                                        new MessageEmbed()
                                                        .setDescription(`${emojis[slot[17]]}-${emojis[slot[27]]}-${emojis[slot[37]]}\n\nうんこ抽選中...`)
                                                        .setColor('RANDOM')
                                                        .setTimestamp()
                                                    ).then( reply => {
                                                        setTimeout( () => {
                                                            reply.edit(
                                                                new MessageEmbed()
                                                                .setDescription(`${emojis[slot[18]]}-${emojis[slot[28]]}-${emojis[slot[38]]}\n\nうんこ抽選中...`)
                                                                .setColor('RANDOM')
                                                                .setTimestamp()
                                                            ).then( reply => {
                                                                setTimeout( () => {
                                                                  reply.edit(
                                                                    new MessageEmbed()
                                                                    .setDescription(`${emojis[slot[19]]}-${emojis[slot[29]]}-${emojis[slot[39]]}\n\nハズレ 次は当たるといいな＾＾\n${Latch}うんコイン消失\nあなたのうんコイン: ${usermoneydata.money}枚`)
                                                                    .setColor('RANDOM')
                                                                    .setTimestamp()
                                                                      );
                                                                }, 1000);
                                                            })
                                                        }, 700)
                                                    })
                                                }, 600)
                                            })
                                        }, 500)
                                    })
                                }, 400)
                            })
                        }, 300)
                    })
                }, 200)
               })
            }, 100)
        });    
        }
       }
    }
    else{
        if(message.channel.id !== '798571746730049597' && message.guild.id === '706452606918066237') {
            message.delete();
            const reply = await message.reply('そのコマンドは<#798571746730049597>でしか使用できません<a:owoxgif:793460058250805259>');
            reply.delete({ timeout: 5000 });
            return;
        }
        const emojis = ['<:maguro:798234419659800616>',  '<:image0:798159753611575296>', '<:swordthonk:798179606166634516>', '<:swordthonk:798179606166634516>'];
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
         if(slot[19] === slot[29] && slot[19] === slot[39] && slot[19] === 0){
                usermoneydata.money += 100000;
                await message.channel.send(
                    new MessageEmbed()
                    .setDescription(`${emojis[slot[11]]}-${emojis[slot[21]]}-${emojis[slot[31]]}\n\nうんこ抽選中...`)
                    .setColor('RANDOM')
                    .setTimestamp()
                ).then( reply => {
                    setTimeout( () => {
                        reply.edit(
                           new MessageEmbed()
                           .setDescription(`${emojis[slot[12]]}-${emojis[slot[22]]}-${emojis[slot[32]]}\n\nうんこ抽選中...`)
                           .setColor('RANDOM')
                           .setTimestamp()
                       ).then( reply => {
                        setTimeout( () => {
                            reply.edit(
                                new MessageEmbed()
                                .setDescription(`${emojis[slot[13]]}-${emojis[slot[23]]}-${emojis[slot[33]]}\n\nうんこ抽選中...`)
                                .setColor('RANDOM')
                                .setTimestamp()
                            ).then( reply => {
                                setTimeout( () => {
                                    reply.edit(
                                        new MessageEmbed()
                                        .setDescription(`${emojis[slot[14]]}-${emojis[slot[24]]}-${emojis[slot[34]]}\n\nうんこ抽選中...`)
                                        .setColor('RANDOM')
                                        .setTimestamp()
                                    ).then( reply => {
                                        setTimeout( () => {
                                            reply.edit(
                                                new MessageEmbed()
                                                .setDescription(`${emojis[slot[15]]}-${emojis[slot[25]]}-${emojis[slot[35]]}\n\nうんこ抽選中...`)
                                                .setColor('RANDOM')
                                                .setTimestamp()
                                            ).then( reply => {
                                                setTimeout( () => {
                                                    reply.edit(
                                                        new MessageEmbed()
                                                        .setDescription(`${emojis[slot[16]]}-${emojis[slot[26]]}-${emojis[slot[36]]}\n\nうんこ抽選中...`)
                                                        .setColor('RANDOM')
                                                        .setTimestamp()
                                                    ).then( reply => {
                                                        setTimeout( () => {
                                                            reply.edit(
                                                                new MessageEmbed()
                                                                .setDescription(`${emojis[slot[17]]}-${emojis[slot[27]]}-${emojis[slot[37]]}\n\nうんこ抽選中...`)
                                                                .setColor('RANDOM')
                                                                .setTimestamp()
                                                            ).then( reply => {
                                                                setTimeout( () => {
                                                                    reply.edit(
                                                                        new MessageEmbed()
                                                                        .setDescription(`${emojis[slot[18]]}-${emojis[slot[28]]}-${emojis[slot[38]]}\n\nうんこ抽選中...`)
                                                                        .setColor('RANDOM')
                                                                        .setTimestamp()
                                                                    ).then( reply => {
                                                                        setTimeout( () => {
                                                                            reply.edit(`${message.author}`,
                                                                            new MessageEmbed()
                                                                            .setDescription(`${emojis[slot[19]]}-${emojis[slot[29]]}-${emojis[slot[39]]}\n\nマグロを釣った！\nあなたの残りの借金: ${usermoneydata.money * -1}うんコイン`)
                                                                            .setColor('RANDOM')
                                                                            .setTimestamp() );
                                                                        }, 1000);
                                                                    })
                                                                }, 700)
                                                            })
                                                        }, 600)
                                                    })
                                                }, 500)
                                            })
                                        }, 400)
                                    })
                                }, 300)
                            })
                        }, 200)
                       })
                    }, 100)
                })
         }
         else{
            await message.channel.send(
                new MessageEmbed()
                .setDescription(`${emojis[slot[11]]}-${emojis[slot[21]]}-${emojis[slot[31]]}\n\nうんこ抽選中...`)
                .setColor('RANDOM')
                .setTimestamp()
            ).then( reply => {
                setTimeout( () => {
                    reply.edit(
                       new MessageEmbed()
                       .setDescription(`${emojis[slot[12]]}-${emojis[slot[22]]}-${emojis[slot[32]]}\n\nうんこ抽選中...`)
                       .setColor('RANDOM')
                       .setTimestamp()
                   ).then( reply => {
                    setTimeout( () => {
                        reply.edit(
                            new MessageEmbed()
                            .setDescription(`${emojis[slot[13]]}-${emojis[slot[23]]}-${emojis[slot[33]]}\n\nうんこ抽選中...`)
                            .setColor('RANDOM')
                            .setTimestamp()
                        ).then( reply => {
                            setTimeout( () => {
                                reply.edit(
                                    new MessageEmbed()
                                    .setDescription(`${emojis[slot[14]]}-${emojis[slot[24]]}-${emojis[slot[34]]}\n\nうんこ抽選中...`)
                                    .setColor('RANDOM')
                                    .setTimestamp()
                                ).then( reply => {
                                    setTimeout( () => {
                                        reply.edit(
                                            new MessageEmbed()
                                            .setDescription(`${emojis[slot[15]]}-${emojis[slot[25]]}-${emojis[slot[35]]}\n\nうんこ抽選中...`)
                                            .setColor('RANDOM')
                                            .setTimestamp()
                                        ).then( reply => {
                                            setTimeout( () => {
                                                reply.edit(
                                                    new MessageEmbed()
                                                    .setDescription(`${emojis[slot[16]]}-${emojis[slot[26]]}-${emojis[slot[36]]}\n\nうんこ抽選中...`)
                                                    .setColor('RANDOM')
                                                    .setTimestamp()
                                                ).then( reply => {
                                                    setTimeout( () => {
                                                        reply.edit(
                                                            new MessageEmbed()
                                                            .setDescription(`${emojis[slot[17]]}-${emojis[slot[27]]}-${emojis[slot[37]]}\n\nうんこ抽選中...`)
                                                            .setColor('RANDOM')
                                                            .setTimestamp()
                                                        ).then( reply => {
                                                            setTimeout( () => {
                                                                reply.edit(
                                                                    new MessageEmbed()
                                                                    .setDescription(`${emojis[slot[18]]}-${emojis[slot[28]]}-${emojis[slot[38]]}\n\nうんこ抽選中...`)
                                                                    .setColor('RANDOM')
                                                                    .setTimestamp()
                                                                ).then( reply => {
                                                                    setTimeout( () => {
                                                                        reply.edit(
                                                                        new MessageEmbed()
                                                                        .setDescription(`${emojis[slot[19]]}-${emojis[slot[29]]}-${emojis[slot[39]]}\n\nハズレ 次は釣れるといいな＾＾\n残りの借金: ${usermoneydata.money * -1}うんコイン`)
                                                                        .setColor('RANDOM')
                                                                        .setTimestamp());
                                                                    }, 1000);
                                                                })
                                                            }, 700)
                                                        })
                                                    }, 600)
                                                })
                                            }, 500)
                                        })
                                    }, 400)
                                })
                            }, 300)
                        })
                    }, 200)
                   })
                }, 100)
            })  
         }
    }
    client.setMoney.run(usermoneydata);
    client.setDebt.run(userdebtdata);
    client.setSlotsettings.run(slotsettingsdata);
  },
};