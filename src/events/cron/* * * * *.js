const { userMention } = require('@discordjs/builders');
const { EmbedBuilder, SnowflakeUtil } = require('discord.js');

/**
 * @param {import('../../Bot')} client
 */

module.exports = async (client) => {
    const time = new Date();
    if (time.getMinutes() === 0) {
        const charas = [
            { name: 'ずんだもん', id: 3 },
            { name: '四国めたん', id: 2 },
            { name: '春日部つむぎ', id: 8 },
            { name: 'ひろゆき', id: -1 },
        ];
        client.speakers.forEach(async speaker => {
            const rand = Math.floor(Math.random() * charas.length);
            const chara = charas[rand];
            if (chara.id === -1) {
                await speaker.playFile(`dat/hiroyuki_voice/hiroyuki_${time.getHours()}時.wav`);
            }
            else {
                await speaker.addSpearkQueue(`${chara.name}が${time.getHours()}時をお知らせします`, SnowflakeUtil.generate(), chara.id);
            }
        });
    }

    (await client.database.getEndAllPoll(Date.now()))
        .forEach(async poll => {
            const channel = client.channels.cache.get(poll.channel_id);
            if (!channel) {
                await client.database.removePoll(poll.id);
                return;
            }

            /**
             * @type {import('discord.js').Message}
             */
            let msg = null;
            try {
                msg = await channel.messages.fetch(poll.message_id);
            }
            catch {
                await client.database.removePoll(poll.id);
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

            try {
                msg.reactions.removeAll();
                await channel.send({
                    content: `${userMention(poll.user_id)} 投票が終了しました`,
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(`${msg.embeds[0].title}の投票結果`)
                            .setDescription(result)
                            .setURL(`https://discord.com/channels/${channel.guildId}/${poll.channel_id}/${poll.message_id}`)
                            .setTimestamp(),
                    ],
                });

                await client.database.removePoll(poll.id);
            }
            // eslint-disable-next-line no-empty
            catch (e) {
            }
        });
};