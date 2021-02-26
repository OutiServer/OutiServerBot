const { Client, Message, MessageEmbed } = require('discord.js');
const SQLite = require("better-sqlite3");
const sql = new SQLite('data/db/unkoserver.db');

module.exports = {
    info: {
        name: "snsdelete",
        description: "sns宣伝を削除",
        usage: "",
        aliases: [""],
        botownercommand: false,
        botadmincommand: true
    },
    /**
     * @param {Message} message
     * @param {Client} client
     */
    run: async function (client, message, args) {
        const allsns = sql.prepare("SELECT * FROM snss WHERE guild = ? ORDER BY user DESC;").all(message.guild.id);
        const embed = new MessageEmbed()
            .setTitle('SNS宣伝一覧')
            .setDescription('現在登録されているSNS宣伝です、削除するNo.を発言してください')
            .setColor('RANDOM')
            .setTimestamp();
        let number = 0;
        for (const data of allsns) {
            embed.addField(`No. ${number}`, `登録した人: <@${data.user}>\nタイトル: ${data.title}\nURL: ${data.url}\n宣伝した回数: ${data.count}`);
            number++;
        }
        const reply = await message.channel.send(embed);
        const filter = msg => msg.author.id === message.author.id;
        const collected = await message.channel.awaitMessages(filter, { max: 1, time: 60000 });
        const response = collected.first();
        if (!response) return reply.edit('時間切れです...');
        if (response.content > number) return reply.edit('そのデータは存在しません', '');
        sql.prepare(`DELETE FROM snss WHERE user = ${allsns[response.content].user} AND guild = ${allsns[response.content].guild}`).run();
        reply.edit('データを削除しました', '');
    },
};