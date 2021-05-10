const { Client, Message, MessageEmbed } = require("discord.js");
let count = 0;

/**
 * @param {Client} client 
 * @param {Message} message 
 */

module.exports = async (client, message) => {
    const filter = msg => msg.author.id === message.author.id;
    const collected = await message.channel.awaitMessages(filter, { max: 1, time: 15000 });
    const response = collected.first();
    if (!response) {
        count = 0;
        return;
    }

    count++;
    if (count >= 2000) {
        if (!client.db.prepare('SELECT * FROM bans WHERE user = ?')) {
            message.channel.send(
                new MessageEmbed()
                    .setDescription(`<@${message.author.id}>さん、selfbot検知しました\n問答無用で永BANです＾＾`)
                    .setColor('RANDOM')
                    .setTimestamp()
            );

            const data = { id: `${message.author.id}`, user: message.author.id };
            client.db.prepare('INSERT INTO bans (id, user) VALUES (@id, @user);').run(data);
        }
    }
}