const { Collection, MessageEmbed } = require('discord.js');
const bot = require('../../Utils/Bot');
const { clienterrorlog } = require('../../functions/logs/error');

/**
 * @param {bot} client
 */

module.exports = async (client) => {
    try {
        client.levelcooldown = new Collection();
        const polls = client.db.prepare('SELECT * FROM polls ORDER BY id ASC;').all();
        for (const poll of polls) {
            if (poll.endtime <= Date.now()) {
                const pollchannel = client.channels.cache.get(poll.channelid);
                if (!pollchannel) return client.db.prepare('DELETE FROM polls WHERE id = ?').run(poll.id);

                try {
                    var msg = await pollchannel.messages.fetch(poll.messageid);
                } catch (error) {
                    clienterrorlog(error);
                    client.db.prepare('DELETE FROM polls WHERE id = ?').run(poll.id);
                }

                const allreacionname = msg.reactions.cache.map(reactions => reactions.emoji.name);
                const allreacioncount = msg.reactions.cache.map(reactions => reactions.count);
                let count = 0;
                let msgcontent = '';
                for (const data of allreacioncount) {
                    msgcontent += `${allreacionname[count]} ${data - 1}票\n`
                    count++;
                }

                client.db.prepare('DELETE FROM polls WHERE id = ?').run(poll.id);
                msg.reactions.removeAll();
                msg.edit({
                    embeds: [
                        msg.embeds[0].setFooter('投票は終了しました')
                    ]
                });
                await pollchannel.send(
                    {
                        content: `<@${poll.userid}>`,
                        embeds: [
                            new MessageEmbed()
                                .setTitle(msg.embeds[0].title + 'の投票結果')
                                .setDescription(msgcontent)
                                .setURL(`https://discord.com/channels/${poll.guildid}/${poll.channelid}/${poll.messageid}`)
                                .setColor(msg.embeds[0].color)
                                .setTimestamp()
                        ]
                    }
                );
            }
        }
    } catch (error) {
        clienterrorlog(error);
    }
};