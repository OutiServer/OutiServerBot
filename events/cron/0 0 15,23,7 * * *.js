const { Client, MessageEmbed } = require('discord.js');
const SQLite = require("better-sqlite3");
const sql = new SQLite('unkoserver.db');

/**
 * @param {Client} client
 */

module.exports = (client) => {
    const sns10 = sql.prepare("SELECT * FROM snss WHERE guild = ? ORDER BY user DESC;").all('706452606918066237');
    let content = ''
    for (let data of sns10) {
        content += `[${data.title}](${data.url})\n`;
        data.count++;
        client.setSns.run(data);
        if (data.count > 8) {
            sql.prepare(`DELETE FROM snss WHERE user = ${data.user} AND guild = ${data.guild}`).run();
        }
    }
    client.channels.cache.get('706452607538954263').send(
        new MessageEmbed()
            .setDescription(`匿名で参加できるアンケートを設置しています。暇なときに記入してみてください。貴重な意見を待っています。\n[うんこ鯖アンケート](https://forms.gle/aRtBT1piAofz3vJM6)\n[みんなが遊びたい理想の鯖とは](https://docs.google.com/forms/d/156rdFiJkwUzNsHvx9KBNnEdoTFvJINsABn7x6hP8vzw/edit)\n[:new:アンケート:new:](https://docs.google.com/forms/d/e/1FAIpQLScJNd7ka66_69_irUeDr6NPAf5t4z_oNOKFWs60UBctGWkePA/viewform?usp=sf_link)\n${content}`)
            .setColor('RANDOM')
            .setTimestamp()
    );
}