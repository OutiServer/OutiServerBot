const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    info: {
        name: 'disconnect',
        description: '読み上げを終了する',
        category: 'main',
        deferReply: false,
    },

    data: new SlashCommandBuilder()
        .setName('disconnect')
        .setDescription('読み上げを終了する'),

    /**
     * @param {import('../../Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        if (!interaction.member.voice.channelId) {
            return await interaction.followUp('VCに接続してからこのコマンドを送信してください！');
        }
        else if (!client.speakers.get(interaction.guildId)) {
            return await interaction.followUp('読み上げを開始していません');
        }

        await interaction.followUp('読み上げを停止しています...');
        const speaker = client.speakers.get(interaction.guildId);
        speaker.stop();
        client.speakers.delete(interaction.guildId);
    },
};