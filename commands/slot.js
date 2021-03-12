const { Client, Message, MessageEmbed } = require("discord.js");
const { Database } = require('../unko/index');
const db = new Database('unkoserver.db');

module.exports = {
    info: {
        name: "slot",
        description: "スロット",
        usage: "",
        aliases: ["s"],
        botownercommand: false,
        botadmincommand: false,
        category: 'Casino'
    },

    /**
     * @param {Message} message
     * @param {Client} client
     */

    run: async function (client, message, args) {
        let usermoneydata = db.MoneyGet(message.author.id, message.guild.id);
        let slotsettingsdata = db.SlotSettingsGet(message.guild.id);
        let slot = {};
        let content = '';
        let slotlength = 11;
        let emojis = [];
        let Win = 0
        let Latch = Number(args[0]);
        if (usermoneydata.tuna === 0) {
            if (message.channel.id !== '798157114555105330' && message.channel.id !== '798176065562476604' && message.channel.id !== '798198069849227294' && message.channel.id !== '798486503255834664' && message.channel.id !== '798570749136601158' && message.guild.id === '706452606918066237') {
                message.react('793460058250805259');
                return message.reply('そのコマンドは<#798157114555105330>・<#798176065562476604>、<#798198069849227294>、<#798486503255834664>、<#798570749136601158>でしか使用できません<a:owoxgif:793460058250805259>');

            }
            if (!Latch || Latch > 20000 || Latch < 100) {
                message.react('793460058250805259');
                return message.reply('第一引数に賭け金を100~20000の数値で入れてください！');
            }
            slotsettingsdata.Jackpot += Latch;
            var random = Math.round(Math.random() * slotsettingsdata.Jackpotprobability);
            if (random === 0) {
                emojis = ['<:image0:798159753611575296>', '<:unkooo:790538555407597590>', '<:emoji_106:790546684710223882>', '<:Butter_sote_spla:777481415616102400>', '<:syowatan:773869600189448202>', '<:Butter_sote:772132826756808714>', '<:emoji_57:774599957273378848>', '<:emoji_75:775276792570707968>', '<:emoji_74:775276727437754408>', '<:Daisuke:706520557176225802>', '<a:HIVE:779352019827294239>', '<:__:706468448581976085>'];
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
                if (slot[19] === slot[29] && slot[19] === slot[39]) {
                    if (slot[19] === 0) {
                        Win = slotsettingsdata.Jackpot
                        slotsettingsdata.Jackpot = 100000;
                        slotsettingsdata.Jackpotprobability = 10;
                        client.channels.cache.get('798479605764718592').send(
                            new MessageEmbed()
                                .setDescription(`<@${message.author.id}>がジャックポットを当て、${Win}うんコイン入手しました！`)
                                .setColor('RANDOM')
                                .setTimestamp()
                        );
                        content = `ジャックポット当選、おめでとう！\n${Win}うんコイン獲得！`;
                    }
                    else {
                        Win = Latch * 10
                        content = `大当たり、おめでとう！\n${Win}}うんコイン獲得！`;
                    }
                    usermoneydata.money += Win;
                }
                else {
                    usermoneydata.money -= Latch;
                    content = `ハズレ\n${Latch}うんコイン消失`;
                }
            }
            else {
                emojis = ['<:image0:798159753611575296>', '<:swordthonk:798179606166634516>', '<:swordthinkblue:798179591582908446>'];
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
                if (slot[19] === slot[29] && slot[19] === slot[39]) {
                    if (slot[19] === 0) {
                        Win = Latch * 7;
                    }
                    else if (slot[19] === 1) {
                        Win = Latch * 5;
                    }
                    else if (slot[19] === 2) {
                        Win = Latch * 3;
                    }
                    usermoneydata.money += Win;
                    content = `当たり おめでとう！\n${Win}うんコイン獲得！`;
                }
                else {
                    usermoneydata.money -= Latch;
                    content = `ハズレ\n${Latch}うんコイン消失`;
                }
            }
            content += `\nあなたのうんコイン: ${usermoneydata.money}枚`;
        }
        else {
            if (message.channel.id !== '798571746730049597' && message.guild.id === '706452606918066237') {
                message.react('793460058250805259');
                return message.reply('そのコマンドは<#798571746730049597>でしか使用できません<a:owoxgif:793460058250805259>');

            }
            emojis = ['<:maguro:798234419659800616>', '<:image0:798159753611575296>', '<:swordthonk:798179606166634516>', '<:swordthonk:798179606166634516>'];
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
            if (slot[19] === slot[29] && slot[19] === slot[39] && slot[19] === 0) {
                usermoneydata.money += 100000;
                content = `マグロを釣った！`;
            }
            else {
                content = `ハズレ`;
            }
            content += `\nあなたの残りの借金: ${usermoneydata.money * -1}うんコイン`;
        }
        message.channel.send(
            new MessageEmbed()
                .setDescription(`${emojis[slot[11]]}-${emojis[slot[21]]}-${emojis[slot[31]]}\n\nうんこ抽選中...`)
                .setColor('RANDOM')
                .setTimestamp()
        ).then(reply => {
            reply.edit(
                new MessageEmbed()
                    .setDescription(`${emojis[slot[12]]}-${emojis[slot[22]]}-${emojis[slot[32]]}\n\nうんこ抽選中...`)
                    .setColor('RANDOM')
                    .setTimestamp()
            ).then(reply => {
                reply.edit(
                    new MessageEmbed()
                        .setDescription(`${emojis[slot[13]]}-${emojis[slot[23]]}-${emojis[slot[33]]}\n\nうんこ抽選中...`)
                        .setColor('RANDOM')
                        .setTimestamp()
                ).then(reply => {
                    reply.edit(
                        new MessageEmbed()
                            .setDescription(`${emojis[slot[14]]}-${emojis[slot[24]]}-${emojis[slot[34]]}\n\nうんこ抽選中...`)
                            .setColor('RANDOM')
                            .setTimestamp()
                    ).then(reply => {
                        reply.edit(
                            new MessageEmbed()
                                .setDescription(`${emojis[slot[15]]}-${emojis[slot[25]]}-${emojis[slot[35]]}\n\nうんこ抽選中...`)
                                .setColor('RANDOM')
                                .setTimestamp()
                        ).then(reply => {
                            reply.edit(
                                new MessageEmbed()
                                    .setDescription(`${emojis[slot[16]]}-${emojis[slot[26]]}-${emojis[slot[36]]}\n\nうんこ抽選中...`)
                                    .setColor('RANDOM')
                                    .setTimestamp()
                            ).then(reply => {
                                reply.edit(
                                    new MessageEmbed()
                                        .setDescription(`${emojis[slot[17]]}-${emojis[slot[27]]}-${emojis[slot[37]]}\n\nうんこ抽選中...`)
                                        .setColor('RANDOM')
                                        .setTimestamp()
                                ).then(reply => {
                                    reply.edit(
                                        new MessageEmbed()
                                            .setDescription(`${emojis[slot[18]]}-${emojis[slot[28]]}-${emojis[slot[38]]}\n\nうんこ抽選中...`)
                                            .setColor('RANDOM')
                                            .setTimestamp()
                                    ).then(reply => {
                                        reply.edit(`${message.author}`,
                                            new MessageEmbed()
                                                .setDescription(`${emojis[slot[19]]}-${emojis[slot[29]]}-${emojis[slot[39]]}\n\n${content}`)
                                                .setColor('RANDOM')
                                                .setTimestamp());
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
        db.MoneySet(usermoneydata);
        db.SlotSettingsSet(slotsettingsdata);
    },
};