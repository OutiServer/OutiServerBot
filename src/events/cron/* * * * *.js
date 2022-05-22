const { userMention } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

/**
 * @param {import('../../Bot')} client
 */

module.exports = async (client) => {
    client.logger.info('Checking');
    client.database.getEndAllPoll(Date.now())
        .forEach(async poll => {
            const channel = client.channels.cache.get(poll.channelid);
            if (!channel) {
                client.database.removePoll(poll.id);
                return;
            }

            /**
             * @type {import('discord.js').Message}
             */
            let msg = null;
            try {
                msg = await channel.messages.fetch(poll.messageid);
            }
            catch {
                client.database.removePoll(poll.id);
                return;
            }

            const allName = msg.reactions.cache.map(reactions => reactions.emoji.name);
            const allCount = msg.reactions.cache.map(reactions => reactions.count);
            let count = 0;
            let result = '';
            for (const data of allCount) {
                result += `${allName[count]} ${data - 1}票\n`;
                count++;
            }

            msg.reactions.removeAll();
            msg.edit({
                embeds: [
                    msg.embeds[0].setFooter({ text: '投票は終了しました' }),
                ],
            });
            await channel.send({
                content: `${userMention(poll.userid)} 投票が終了しました`,
                embeds: [
                    new MessageEmbed()
                        .setTitle(`${msg.embeds[0].title}の投票結果`)
                        .setDescription(result)
                        .setURL(`https://discord.com/channels/${channel.guildId}/${poll.channelid}/${poll.messageid}`)
                        .setTimestamp(),
                ],
            });

            client.database.removePoll(poll.id);
        });
};