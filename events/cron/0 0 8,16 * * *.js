const { Client, MessageEmbed } = require('discord.js');

/**
 * @param {Client} client
 */

module.exports = (client) => {
    client.channels.cache.get('706452607538954263').send(
        new MessageEmbed()
            .setDescription(`匿名で参加できるアンケートを設置しています。暇なときに記入してみてください。貴重な意見を待っています。\n[うんこ鯖アンケート](https://forms.gle/aRtBT1piAofz3vJM6)\n[みんなが遊びたい理想の鯖とは](https://docs.google.com/forms/d/156rdFiJkwUzNsHvx9KBNnEdoTFvJINsABn7x6hP8vzw/edit)\n[:new:アンケート:new:](https://docs.google.com/forms/d/e/1FAIpQLScJNd7ka66_69_irUeDr6NPAf5t4z_oNOKFWs60UBctGWkePA/viewform?usp=sf_link)`)
            .setColor('RANDOM')
            .setTimestamp()
    );
}