const { Client, Message } = require('discord.js');

module.exports = {
    info: {
        name: "sns",
        description: "sns宣伝券",
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
        let usermoneydata = client.getMoney.get(message.author.id, message.guild.id);
        if (!usermoneydata) {
           usermoneydata　= { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, money: 0, dailylogin: 0, ticket: 0 }
        }
        if(usermoneydata.ticket < 1){
            message.reply('チケットが足りてないですよ 出直してきてください＾＾').then( msg => {
                msg.delete({ timeout: 5000 });
            });
            return;
        }
        let usersnsdata = client.getSns.get(message.author.id, message.guild.id);
        if (!usersnsdata) {
           usersnsdata　= { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, title: '', url: '', count: 0 }
        }
        else {
            message.reply('お前すでに登録済みやん！').then( msg => {
                msg.delete({ timeout: 5000 });
            });
            return;
        }
        const reply = await message.channel.send('宣伝するタイトルを送信してください');
        const filter = msg => msg.author.id === message.author.id;
        const collected = await message.channel.awaitMessages(filter, { max: 1, time: 60000 });
        const response = collected.first();
        if (!response) return reply.edit('時間切れです...');
        usersnsdata.title = response.content;
        response.delete();
        reply.edit('宣伝するURLを送信してください');
        const filter2 = msg => msg.author.id === message.author.id;
        const collected2 = await message.channel.awaitMessages(filter2, { max: 1, time: 60000 });
        const response2 = collected2.first();
        if (!response2) return reply.edit('時間切れです...');
        usersnsdata.url = response2.content;
        response2.delete();
        usermoneydata.ticket -= 5;
        client.setMoney.run(usermoneydata);
        client.setSns.run(usersnsdata);
        message.channel.send('登録しました');
    },
};