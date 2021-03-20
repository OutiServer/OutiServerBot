const { Message, MessageEmbed } = require("discord.js");
const { Database } = require('../unko/index');
const db = new Database('unkoserver.db');
const cards = require('../dat/cards.json');
const dealer = new Map();
const player = new Map();
const winloseflag = new Map();

module.exports = {
    info: {
        name: "blackjack",
        description: "ブラックジャック",
        usage: "",
        aliases: ["s"],
        owneronly: false,
        adminonly: false,
        category: 'Casino'
    },

    /**
     * @param {Message} message
     */

    run: async function (client, message, args) {
        if (message.channel.id !== '798157114555105330' && message.channel.id !== '798176065562476604' && message.channel.id !== '798198069849227294' && message.channel.id !== '798486503255834664' && message.channel.id !== '798570749136601158' && message.guild.id === '706452606918066237') {
            message.react('793460058250805259');
            return message.reply('そのコマンドは<#798157114555105330>・<#798176065562476604>、<#798198069849227294>、<#798486503255834664>、<#798570749136601158>でしか使用できません<a:owoxgif:793460058250805259>');
        }

        let usermoneydata = db.MoneyGet(message.author.id, message.guild.id);
        if (usermoneydata.tuna === 1) {
            message.react('793460058250805259');
            return message.reply('借金返済中にブラックジャックはできません');
        }

        if (!dealer.get(message.author.id)) {
            const dealerarray = [];
            const playerarray = [];
            for (let i = 0; i < 2; i++) {
                dealerarray.push(Math.floor(Math.random() * cards[0].length));
            }
            for (let i = 0; i < 2; i++) {
                playerarray.push(Math.floor(Math.random() * cards[0].length));
            }
            dealer.set(message.author.id, dealerarray);
            player.set(message.author.id, playerarray);
        }

        const msg = await message.channel.send(
            new MessageEmbed()
                .setTitle('BlackJack')
                .setDescription('操作を送信してください\n`Stand`')
                .addField('ディーラー', dealer.get(message.author.id).map(data => cards[0][data]).join(' '))
                .addField('あなた', player.get(message.author.id).map(data => cards[0][data]).join(' '))
                .setColor('RANDOM')
                .setTimestamp()
        );

        while (true) {
            const filter = msg => msg.author.id === message.author.id;
            const collected = await message.channel.awaitMessages(filter, { max: 1, time: 60000 });
            const response = collected.first();
            if (!response) break;
            if (response.content === 'Stand') break;
        }

        let dealernumber = 0;
        let playernumber = 0;
        const dealerarray = player.get(message.author.id);

        while (winloseflag.get(message.author.id) === 1) {
            dealerarray.push(Math.floor(Math.random() * cards[0].length));
            for (const data of dealerarray) {
                if (data < 10) {
                    dealernumber += data + 1;
                }
                else {
                    dealernumber += 10;
                }
            }

            for (const data of player.get(message.author.id)) {
                if (data < 10) {
                    playernumber += data + 1;
                }
                else {
                    playernumber += 10;
                }
            }

            if (dealernumber > 17) {
                if (dealernumber === 21) {
                    winloseflag.set(message.author.id, -1);
                    break;
                }
                else if (dealernumber > 21) {
                    winloseflag.set(message.author.id, -3);
                    break;
                }
                else if (dealernumber > playernumber) {
                    winloseflag.set(message.author.id, -2);
                    break;
                }
                else if (dealernumber < playernumber) {
                    winloseflag.set(message.author.id, 3);
                    break;
                }
                else {
                    winloseflag.set(message.author.id, 10);
                    break;
                }
            }
        }

        if (winloseflag.get(message.author.id) === 0) {
            msg.edit(
                new MessageEmbed()
                    .setTitle('BlackJack')
                    .setDescription('BlackJack\nあなたの勝ちです')
                    .addField('ディーラー', dealer.get(message.author.id).map(data => cards[0][data]).join(' '))
                    .addField('あなた', player.get(message.author.id).map(data => cards[0][data]).join(' '))
                    .setColor('RANDOM')
                    .setTimestamp())
        }
        else if (winloseflag.get(message.author.id) === 2) {
            msg.edit(
                new MessageEmbed()
                    .setTitle('BlackJack')
                    .setDescription('Busted\nあなたの負けです')
                    .addField('ディーラー', dealer.get(message.author.id).map(data => cards[0][data]).join(' '))
                    .addField('あなた', player.get(message.author.id).map(data => cards[0][data]).join(' '))
                    .setColor('RANDOM')
                    .setTimestamp())
        }
        else if (winloseflag.get(message.author.id) === 3) {
            msg.edit(
                new MessageEmbed()
                    .setTitle('BlackJack')
                    .setDescription('あなたの勝ちです')
                    .addField('ディーラー', dealer.get(message.author.id).map(data => cards[0][data]).join(' '))
                    .addField('あなた', player.get(message.author.id).map(data => cards[0][data]).join(' '))
                    .setColor('RANDOM')
                    .setTimestamp())
        }
        else if (winloseflag.get(message.author.id) === 10) {
            msg.edit(
                new MessageEmbed()
                    .setTitle('BlackJack')
                    .setDescription('引き分け')
                    .addField('ディーラー', dealer.get(message.author.id).map(data => cards[0][data]).join(' '))
                    .addField('あなた', player.get(message.author.id).map(data => cards[0][data]).join(' '))
                    .setColor('RANDOM')
                    .setTimestamp())
        }
        else if (winloseflag.get(message.author.id) === -1) {
            msg.edit(
                new MessageEmbed()
                    .setTitle('BlackJack')
                    .setDescription('ディーラーBlackKack\nあなたの負けです')
                    .addField('ディーラー', dealer.get(message.author.id).map(data => cards[0][data]).join(' '))
                    .addField('あなた', player.get(message.author.id).map(data => cards[0][data]).join(' '))
                    .setColor('RANDOM')
                    .setTimestamp())
        }
        else if (winloseflag.get(message.author.id) === -2) {
            msg.edit(
                new MessageEmbed()
                    .setTitle('BlackJack')
                    .setDescription('あなたの負けです')
                    .addField('ディーラー', dealer.get(message.author.id).map(data => cards[0][data]).join(' '))
                    .addField('あなた', player.get(message.author.id).map(data => cards[0][data]).join(' '))
                    .setColor('RANDOM')
                    .setTimestamp())
        }
        else if (winloseflag.get(message.author.id) === -3) {
            msg.edit(
                new MessageEmbed()
                    .setTitle('BlackJack')
                    .setDescription('ディーラーBusted\nあなたの勝ちです')
                    .addField('ディーラー', dealer.get(message.author.id).map(data => cards[0][data]).join(' '))
                    .addField('あなた', player.get(message.author.id).map(data => cards[0][data]).join(' '))
                    .setColor('RANDOM')
                    .setTimestamp())
        }

        dealer.delete(message.author.id);
        player.delete(message.author.id);
    }
}