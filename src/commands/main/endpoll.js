const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    info: {
        name: 'endpoll',
        description: '投票集計コマンド',
        category: 'main',
        deferReply: true,
        ephemeral: false,
    },

    data: new SlashCommandBuilder()
        .setName('endpoll')
        .setDescription('投票を終了する')
        .addIntegerOption(option => {
            return option
                .setName('id')
                .setDescription('投票ID')
                .setRequired(true);
        })
        .setDMPermission(false),

    /**
     * @param {import('../../Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        const poll = await client.database.getPoll(interaction.options.getInteger('id', true));
        if (!poll) return await interaction.followUp('投票データが見つからないか、既に終了している投票です');

        if (poll.user_id !== interaction.user.id && interaction.member.permissions.has('ADMINISTRATOR')) return await interaction.followUp('この投票を終了する権限がありません');

        const channel = client.channels.cache.get(poll.channel_id);
        if (!channel) {
            await client.database.removePoll(poll.id);
            return await interaction.followUp('投票のチャンネルが削除されたか、Botがアクセスできません');
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
            return await interaction.followUp('投票のメッセージが削除されたか、Botが取得できません');
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
        await interaction.followUp(
            {
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`${msg.embeds[0].title}の投票結果`)
                        .setDescription(result)
                        .setURL(`https://discord.com/channels/${interaction.guild.id}/${poll.channelid}/${poll.messageid}`)
                        .setTimestamp(),
                ],
            },
        );

        await client.database.removePoll(poll.id);
    },
};