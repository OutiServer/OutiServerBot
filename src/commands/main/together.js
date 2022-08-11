const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChannelType } = require('discord.js');

module.exports = {
    info: {
        name: 'together',
        description: 'ゲームをプレイしたりYoutubeを視聴する',
        category: 'main',
        deferReply: true,
    },

    data: new SlashCommandBuilder()
        .setName('together')
        .setDescription('ゲームをプレイしたりYoutubeを視聴する')
        .addChannelOption(option => option
            .setName('channel')
            .setDescription('VCチャンネル')
            .setRequired(true),
        )
        .addStringOption(option => option
            .setName('type')
            .setDescription('種類')
            .setRequired(true)
            .addChoices(
                { name: 'Youtube', value: 'youtube' },
                { name: 'ポーカー', value: 'Poker' },
                { name: 'チェス', value: 'chess' },
            ),
        ),

    /**
     * @param {import('../../Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        /**
         * @type {import('discord.js').GuildChannel}
         */
        const channel = interaction.options.getChannel('channel', true);
        if (channel.type !== ChannelType.GuildVoice) return await interaction.followUp('VCチャンネルを指定する必要があります');

        /**
         * @type {string}
         */
        const type = interaction.options.getString('type', true);
        try {
            const result = await client.discordTogether.createTogetherCode(channel.id, type);
            await interaction.followUp(result.code);
        }
        catch (e) {
            await interaction.followUp('エラーが発生しました、再度お試しください');
        }
    },
};