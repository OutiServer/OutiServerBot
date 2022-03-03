const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { errorlog, clienterrorlog, commanderror_message } = require('../../functions/error');

module.exports = {
    info: {
        name: 'endpoll',
        description: '投票集計コマンド',
        usage: '[投票ID]',
        aliases: [],
        category: 'main',
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
     * @param {import('../../utils/Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
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
                    msg.embeds[0].setFooter({ text: '投票は終了しました' }),
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

    /**
     *
     * @param {import('../../utils/Bot')} client
     * @param {import('discord.js').Message} message
     * @param {Array<string>} args
     */
    run_message: async function (client, message, args) {
        try {
            if (!Number(args[0])) return await message.reply('第一引数に投票IDを入れてください');
            const poll = client.db.prepare('SELECT * FROM polls WHERE id = ?').get(args[0]);
            if (!poll) return await message.reply('その投票は既に終了しています');
            const pollchannel = client.channels.cache.get(poll.channelid);
            if (!pollchannel) {
                client.db.prepare('DELETE FROM polls WHERE id = ?').run(args[0]);
                return await message.reply('投票のチャンネルが見つかりません、投票のチャンネルが削除されたか、Botがアクセスできません');
            }

            try {
                // eslint-disable-next-line no-var
                var msg = await pollchannel.messages.fetch(poll.messageid);
            }
            catch (error) {
                clienterrorlog(client, error);
                client.db.prepare('DELETE FROM polls WHERE id = ?').run(args[0]);
                return await message.reply('投票のメッセージが見つかりません、投票のメッセージが削除されたか、Botが取得できません');
            }

            const allreacionname = msg.reactions.cache.map(reactions => reactions.emoji.name);
            const allreacioncount = msg.reactions.cache.map(reactions => reactions.count);
            let count = 0;
            let msgcontent = '';
            for (const data of allreacioncount) {
                msgcontent += `${allreacionname[count]} ${data - 1}票\n`;
                count++;
            }

            client.db.prepare('DELETE FROM polls WHERE id = ?').run(args[0]);
            msg.reactions.removeAll();
            msg.edit({
                embeds: [
                    msg.embeds[0].setFooter({ text: '投票は終了しました' }),
                ],
            });
            await message.reply(
                {
                    embeds: [
                        new MessageEmbed()
                            .setTitle(msg.embeds[0].title + 'の投票結果')
                            .setDescription(msgcontent)
                            .setURL(`https://discord.com/channels/${message.guild.id}/${poll.channelid}/${poll.messageid}`)
                            .setColor(msg.embeds[0].color)
                            .setTimestamp(),
                    ],
                },
            );
        }
        catch (error) {
            commanderror_message(client, message, error);
        }
    },
};