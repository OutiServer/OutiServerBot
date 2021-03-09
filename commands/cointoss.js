const { Message, MessageEmbed } = require('discord.js');
const { Menu } = require('discord.js-menu');
const { Database } = require('../unko/index');
const db = new Database('unkoserver.db');

module.exports = {
    info: {
        name: "cointoss",
        description: "コイントス",
        usage: "[賭け金]",
        aliases: ["ct"],
        botownercommand: false,
        botadmincommand: false
    },

    /**
     * @param {Message} message
     * @param {Client} client
     */

    run: async function (message, args) {
        if (message.channel.id !== '798157114555105330' && message.channel.id !== '798176065562476604' && message.channel.id !== '798198069849227294' && message.channel.id !== '798486503255834664' && message.channel.id !== '798570749136601158' && message.guild.id === '706452606918066237') {
            message.react('793460058250805259');
            return message.reply('そのコマンドは<#798157114555105330>・<#798176065562476604>、<#798198069849227294>、<#798486503255834664>、<#798570749136601158>でしか使用できません<a:owoxgif:793460058250805259>');
        }

        let usermoneydata = db.MoneyGet(message.author.id, message.guild.id);
        if (usermoneydata.tuna === 1) {
            message.react('793460058250805259');
            return message.reply('借金返済中にコイントスはできません');
        }

        const Stake = Number(args[0]);
        if (!Stake || Stake < 50000 || Stake > 100000) {
            message.react('793460058250805259');
            return message.reply('第一引数に賭け金を50000から100000の数値で入れてください！');
        }

        let cointossMenu = new Menu(message.channel, message.author.id, [
            {
                name: 'main',
                content: new MessageEmbed()
                    .setDescription(`コイントスを行います 表・裏、どちらかをリアクションしてください\n表: <:swordthonk:798179606166634516>\n裏: <:swordthinkblue:798179591582908446>`)
                    .setColor('RANDOM')
                    .setTimestamp(),
                reactions: {
                    '798179606166634516': 'front',
                    '798179591582908446': 'back'
                }
            },
            {
                name: 'front',
                content: new MessageEmbed()
                    .setDescription(`表を選択した！`)
                    .setColor('RANDOM')
                    .setTimestamp(),
                reactions: {
                    '⏹': 'delete'
                }
            },
            {
                name: 'back',
                content: new MessageEmbed()
                    .setDescription(`裏を選択した！`)
                    .setColor('RANDOM')
                    .setTimestamp(),
                reactions: {
                    '⏹': 'delete'
                }
            }
        ], 60000)
        cointossMenu.start()
        cointossMenu.on('pageChange', async destination => {
            const emojis = ['<:swordthonk:798179606166634516>', '<:swordthinkblue:798179591582908446>'];
            let coin = Math.ceil(Math.random() * emojis.length);
            let Win = Stake * 2;
            let Lose = Stake * 2;
            const embed = new MessageEmbed()
                .setTitle('コイントスの結果')
                .setColor('RAMDOM')
                .setTimestamp();
            if (destination.name === "front") {
                if (coin === 0) {
                    usermoneydata.money += Win;
                    embed.setDescription(`表 <:swordthonk:798179606166634516> 当たり！\n${Win}うんコイン獲得！`);
                }
                else {
                    usermoneydata.money -= Lose;
                    embed.setDescription(`裏 <:swordthinkblue:798179591582908446> ハズレ\n${Lose}うんコイン消失！`);
                }
            }
            else if (destination.name === "back") {
                if (coin === 1) {
                    usermoneydata.money += Win;
                    embed.setDescription(`裏 <:swordthinkblue:798179591582908446> 当たり！\n${Win}うんコイン獲得！`);
                }
                else {
                    usermoneydata.money -= Lose;
                    embed.setDescription(`表 <:swordthonk:798179606166634516> ハズレ\n${Lose}うんコイン消失！`);
                }
            }
            message.channel.send(embed);
            db.MoneySet(usermoneydata);
        })
    },
};