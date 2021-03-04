const { Client, MessageEmbed } = require('discord.js');

/**
 * @param {Client} client
 */

module.exports = (client, reason, promise) => {
    console.error(reason);
    client.users.cache.get('714455926970777602').send(
        new MessageEmbed()
            .setDescription('エラー内容:\n```' + reason + '```')
            .setColor('RANDOM')
            .setTimestamp()
    );
};