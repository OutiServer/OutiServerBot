const { CommandInteraction, MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const bot = require('../../utils/Bot');
const { errorlog, clienterrorlog } = require('../../functions/logs/error');

module.exports = {
    info: {
        name: 'endpoll',
        description: '投票集計コマンド',
        usage: '[メッセージID]',
        owneronly: false,
        adminonly: false,
        category: 'Main',
    },

    data: new SlashCommandBuilder()
        .setName('endpoll')
        .setDescription('投票を強制終了する')
        .addIntegerOption(option => {
            return option
                .setName('id')
                .setDescription('投票ID')
                .setRequired(true);
        }),

    /**
     * @param {bot} client
     * @param {CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        try {
            const id = interaction.options.getInteger('id', true);
            const poll = client.db.prepare('SELECT * FROM polls WHERE id = ?').get(id);
            if (!poll) return await interaction.followUp('その投票は既に終了しています');
            const pollchannel = client.channels.cache.get(poll.channelid);
            if (!pollchannel) {
                client.db.prepare('DELETE FROM polls WHERE id = ?').run(id);
                return await interaction.followUp('投票のチャンネルが見つかりません、投票のチャンネルが削除されたか、Botがアクセスできません');
            }

            try {
                // eslint-disable-next-line no-var
                var msg = await pollchannel.messages.fetch(poll.messageid);
            }
            catch (error) {
                clienterrorlog(client, error);
                client.db.prepare('DELETE FROM polls WHERE id = ?').run(id);
                return await interaction.followUp('投票のメッセージが見つかりません、投票のメッセージが削除されたか、Botが取得できません');
            }

            const allreacionname = msg.reactions.cache.map(reactions => reactions.emoji.name);
            const allreacioncount = msg.reactions.cache.map(reactions => reactions.count);
            let count = 0;
            let msgcontent = '';
            for (const data of allreacioncount) {
                msgcontent += `${allreacionname[count]} ${data - 1}票\n`;
                count++;
            }

            client.db.prepare('DELETE FROM polls WHERE id = ?').run(id);
            msg.reactions.removeAll();
            msg.edit({
                embeds: [
                    msg.embeds[0].setFooter('投票は終了しました'),
                ],
            });
            await interaction.followUp(
                {
                    embeds: [
                        new MessageEmbed()
                            .setTitle(msg.embeds[0].title + 'の投票結果')
                            .setDescription(msgcontent)
                            .setURL(`https://discord.com/channels/${interaction.guild.id}/${poll.channelid}/${poll.messageid}`)
                            .setColor(msg.embeds[0].color)
                            .setTimestamp(),
                    ],
                },
            );
        }
        catch (error) {
            errorlog(client, interaction, error);
        }
    },
};