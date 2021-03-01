const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
    info: {
        name: "tintiro",
        description: "チンチロ",
        usage: "",
        aliases: ["賭け金"],
        botownercommand: false,
        botadmincommand: false
    },
    /**
     * @param {Message} message
     * @param {Client} client
     */
    run: async function (client, message, args) {
        if (message.channel.id !== '798157114555105330' && message.channel.id !== '798176065562476604' && message.channel.id !== '798198069849227294' && message.channel.id !== '798486503255834664' && message.channel.id !== '798570749136601158' && message.channel.id !== '798571746730049597' && message.guild.id === '706452606918066237') {
            message.delete();
            return message.reply('そのコマンドは<#798157114555105330>・<#798176065562476604>、<#798198069849227294>、<#798486503255834664>、<#798570749136601158>、<#798571746730049597>でしか使用できません<a:owoxgif:793460058250805259>');

        }
        let usermoneydata = client.getMoney.get(message.author.id, message.guild.id);
        if (!usermoneydata) {
            usermoneydata = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, money: 0, dailylogin: 0, ticket: 0 }
        }
        let userdebtdata = client.getDebt.get(message.author.id, message.guild.id);
        if (!userdebtdata) {
            userdebtdata = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, Tuna: 0, Shoulder: null }
        }
        let Latch = Number(args[0]);
        if (!Latch || Latch > 10000 || Latch < 500) {
            message.delete();
            return message.reply('第一引数に賭け金を500~10000の数値で入れてください！');
        }
        const emojis = ['<:dice1:802898424928010240>', '<:dice2:802898424986730536>', '<:dice3:802898424944787496>', '<:dice4:802898424810569728>', '<:dice5:802898424802050049>', '<:dice6:802898424789336105>'];
        let Norole = Math.floor(Math.random() * emojis.length);
        if (Norole === 0) {
            usermoneydata.money -= Latch;
            message.channel.send(
                new MessageEmbed()
                    .setTitle('チンチロの結果')
                    .setDescription(`ションベン\n${Latch}うんコイン消失\nあなたのうんコイン${usermoneydata.money}`)
                    .setColor('RANDOM')
                    .setTimestamp()
            );
        }
        else {
            let slot = {};
            let slotlength = 11;
            let content = '';
            while (slotlength < 40) {
                slot[slotlength] = Math.floor(Math.random() * emojis.length);
                if (slotlength > 30) {
                    slotlength -= 20;
                    slotlength++;
                }
                else {
                    slotlength += 10;
                }
            }
            let Win = 0;
            if (slot[19] === slot[29] && slot[19] === slot[39]) {
                if (slot[19] === 0) {
                    Win = Latch * 5;
                    usermoneydata.money += Win;
                    content = `ピンゾロ！！！\n${Win}うんコイン獲得！`;
                }
                else {
                    Win = Latch * 3;
                    usermoneydata.money += Win;
                    content = `ゾロ目\n${Win}うんコイン獲得！`;
                }
            }
            else if (slot[19] === 3 && slot[29] === 4 && slot[39] === 5) {
                Win = Latch * 2;
                usermoneydata.money += Win;
                content = `シゴロ\n${Win}うんコイン獲得！`;
            }
            else if (slot[19] === 1 && slot[29] === 1 && slot[39] === 5 || slot[19] === 1 && slot[29] === 1 && slot[39] === 4 || slot[19] === 1 && slot[29] === 1 && slot[39] === 3 || slot[19] === 1 && slot[29] === 1 && slot[39] === 2 || slot[19] === 2 && slot[29] === 2 && slot[39] === 1 || slot[19] === 1 && slot[29] === 1 && slot[39] === 0) {
                Win = Latch;
                usermoneydata.money += Win;
                content = `通常の目`;
            }
            else if (slot[19] === 0 && slot[29] === 1 && slot[39] === 2) {
                Win = Latch * 2;
                usermoneydata.money -= Win;
                content = `ヒフミ\n${Win}うんコイン消失`;
            }
            else {
                usermoneydata.money -= Latch;
                content = `役なし\n${Latch}うんコイン消失`;
            }
            if (userdebtdata.Tuna === 1) {
                content += `\nあなたの残りの借金: ${usermoneydata.money * -1}うんコイン`;
            }
            else {
                content += `\nあなたのうんコイン: ${usermoneydata.money}枚`;
            }
            message.channel.send(
                new MessageEmbed()
                    .setDescription(`${emojis[slot[11]]}-${emojis[slot[21]]}-${emojis[slot[31]]}\n\nざわ・・・ざわ・・・`)
                    .setColor('RANDOM')
                    .setTimestamp()
            ).then(reply => {
                reply.edit(
                    new MessageEmbed()
                        .setDescription(`${emojis[slot[12]]}-${emojis[slot[22]]}-${emojis[slot[32]]}\n\nざわ・・・ざわ・・・`)
                        .setColor('RANDOM')
                        .setTimestamp()
                ).then(reply => {
                    reply.edit(
                        new MessageEmbed()
                            .setDescription(`${emojis[slot[13]]}-${emojis[slot[23]]}-${emojis[slot[33]]}\n\nざわ・・・ざわ・・・`)
                            .setColor('RANDOM')
                            .setTimestamp()
                    ).then(reply => {
                        reply.edit(
                            new MessageEmbed()
                                .setDescription(`${emojis[slot[14]]}-${emojis[slot[24]]}-${emojis[slot[34]]}\n\nざわ・・・ざわ・・・`)
                                .setColor('RANDOM')
                                .setTimestamp()
                        ).then(reply => {
                            reply.edit(
                                new MessageEmbed()
                                    .setDescription(`${emojis[slot[15]]}-${emojis[slot[25]]}-${emojis[slot[35]]}\n\nざわ・・・ざわ・・・`)
                                    .setColor('RANDOM')
                                    .setTimestamp()
                            ).then(reply => {
                                reply.edit(
                                    new MessageEmbed()
                                        .setDescription(`${emojis[slot[16]]}-${emojis[slot[26]]}-${emojis[slot[36]]}\n\nざわ・・・ざわ・・・`)
                                        .setColor('RANDOM')
                                        .setTimestamp()
                                ).then(reply => {
                                    reply.edit(
                                        new MessageEmbed()
                                            .setDescription(`${emojis[slot[17]]}-${emojis[slot[27]]}-${emojis[slot[37]]}\n\nざわ・・・ざわ・・・`)
                                            .setColor('RANDOM')
                                            .setTimestamp()
                                    ).then(reply => {
                                        reply.edit(
                                            new MessageEmbed()
                                                .setDescription(`${emojis[slot[18]]}-${emojis[slot[28]]}-${emojis[slot[38]]}\n\nざわ・・・ざわ・・・`)
                                                .setColor('RANDOM')
                                                .setTimestamp()
                                        ).then(reply => {
                                            reply.edit(`${message.author}`,
                                                new MessageEmbed()
                                                    .setDescription(`${emojis[slot[19]]}-${emojis[slot[29]]}-${emojis[slot[39]]}\n\n${content}`)
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
        client.setDebt.run(userdebtdata);
    },
};