const { SlashCommandBuilder } = require('@discordjs/builders');
const SpeakerClient = require('../../utils/SpearkClient');

module.exports = {
    info: {
        name: 'join',
        description: '読み上げを開始',
        category: 'main',
        deferReply: true,
        ephemeral: false,
    },

    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('読み上げを開始する')
        .setDMPermission(false),

    /**
     * @param {import('../../Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        if (!interaction.member.voice.channelId) return await interaction.followUp('VCに接続してからこのコマンドを送信してください！');
        else if (client.speakers.get(interaction.guildId)) return await interaction.followUp('既に読み上げを開始しています');

        client.speakers.set(interaction.guildId, new SpeakerClient(client,
            interaction.guildId,
            interaction.channelId,
            interaction.member.voice.channelId,
            interaction.guild.voiceAdapterCreator,
        ));

        await interaction.followUp(`${interaction.member.voice.channel.name}で読み上げを開始しました！`);
    },
};