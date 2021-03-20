const { Message, MessageEmbed } = require("discord.js");
const { Database } = require('../unko/index');
const db = new Database('unkoserver.db');
const cards = require('../dat/cards.json')[0];
const dealer = new Map();
const player = new Map();

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
        if (!dealer.get(message.author.id)) {
            const dealerarray = [];
            const playerarray = [];
            for (let i = 0; i < 2; i++) {
                dealerarray.push(cards[Math.floor(Math.random() * cards.length)]);
            }
            for (let i = 0; i < 2; i++) {
                playerarray.push(cards[Math.floor(Math.random() * cards.length)]);
            }
            dealer.set(message.author.id, dealerarray);
            player.set(message.author.id, playerarray);
        }
        if (message.channel.id !== '798157114555105330' && message.channel.id !== '798176065562476604' && message.channel.id !== '798198069849227294' && message.channel.id !== '798486503255834664' && message.channel.id !== '798570749136601158' && message.guild.id === '706452606918066237') {
            message.react('793460058250805259');
            return message.reply('そのコマンドは<#798157114555105330>・<#798176065562476604>、<#798198069849227294>、<#798486503255834664>、<#798570749136601158>でしか使用できません<a:owoxgif:793460058250805259>');
        }

        let usermoneydata = db.MoneyGet(message.author.id, message.guild.id);
        if (usermoneydata.tuna === 1) {
            message.react('793460058250805259');
            return message.reply('借金返済中にブラックジャックはできません');
        }


        const msg = await message.channel.send(
            new MessageEmbed()
                .setTitle('BlackJack')
                .addField('ディーラー', dealer.get(message.author.id).join(' '))
                .addField('あなた', player.get(message.author.id).join(' '))
                .setColor('RANDOM')
                .setTimestamp()
        );
        dealer.set(message.author.id, []);
        player.set(message.author.id, []);
    }
}