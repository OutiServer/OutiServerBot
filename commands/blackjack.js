const { Client, Message, MessageEmbed } = require("discord.js");
const { Database } = require('../unko/index');
const db = new Database('unkoserver.db');
const cards = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];
const dealer = {};
const player = {};

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
     * @param {Client} client
     */

    run: async function (client, message, args) {
        if (!dealer[message.author.id]) {
            dealer[message.author.id] = [];
            player[message.author.id] = [];
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

        for (let i = 0; i < 2; i++) {
            dealer[message.author.id].push(Math.floor(Math.random() * cards.length));
        }
        for (let i = 0; i < 2; i++) {
            player[message.author.id].push(Math.floor(Math.random() * cards.length));
        }
        const msg = await message.channel.send(
            new MessageEmbed()
                .setTitle('BlackJack')
                .addField('ディーラー', player[message.author.id].join(' '))
                .addField('あなた', player[message.author.id].join(' '))
                .setColor('RANDOM')
                .setTimestamp()
        );
    }
}