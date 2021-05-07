const { Client, MessageEmbed } = require('discord.js');
const { clienterrorlog } = require('../../functions/error');

/**
 * @param {Client} client
 */

module.exports = (client) => {
    try {
        client.channels.cache.get('825231334657884161').send(
            new MessageEmbed()
                .setDescription(`匿名で参加できるアンケートを設置しています。暇なときに記入してみてください。貴重な意見を待っています。\n[みんなが遊びたい理想の鯖とは](https://docs.google.com/forms/d/156rdFiJkwUzNsHvx9KBNnEdoTFvJINsABn7x6hP8vzw/edit)\n[おうち鯖botからの質問](https://docs.google.com/forms/d/e/1FAIpQLScJNd7ka66_69_irUeDr6NPAf5t4z_oNOKFWs60UBctGWkePA/viewform?usp=sf_link)`)
                .setImage('https://media.discordapp.net/attachments/840154191036022794/840154293453062144/outisabakoiyo.png')
                .setColor('RANDOM')
                .setTimestamp()
        );
    } catch (error) {
        clienterrorlog(client, error);
    }
}