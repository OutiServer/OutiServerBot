const { Client, MessageEmbed, MessageAttachment } = require('discord.js');

/**
 * @param {Client} client
 */

module.exports = (client) => {
    client.channels.cache.get('825231334657884161').send(
        new MessageEmbed()
            .setDescription(`匿名で参加できるアンケートを設置しています。暇なときに記入してみてください。貴重な意見を待っています。\n[みんなが遊びたい理想の鯖とは](https://docs.google.com/forms/d/156rdFiJkwUzNsHvx9KBNnEdoTFvJINsABn7x6hP8vzw/edit)\n[おうち鯖botからの質問](https://docs.google.com/forms/d/e/1FAIpQLScJNd7ka66_69_irUeDr6NPAf5t4z_oNOKFWs60UBctGWkePA/viewform?usp=sf_link)\n[戦争サーバーに足りない要素](https://forms.gle/s6m83AwQTGDWHQeXA)`)
            .setImage('https://media.discordapp.net/attachments/818411667015991297/826376437769568286/outisabakoiyo.png')
            .setColor('RANDOM')
            .setTimestamp()
    );
}