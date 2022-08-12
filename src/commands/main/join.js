const { SlashCommandBuilder } = require('@discordjs/builders');
const SpeakerClient = require('../../utils/SpearkClient');

module.exports = {
    info: {
        name: 'join',
        description: '読み上げを開始',
        category: 'main',
        deferReply: true,
    },

    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('読み上げを開始する'),

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

        await interaction.followUp(`${interaction.member.voice.channel.name}で読み上げを開始しました！\n\n一部読み上げの使用用途を間違って利用している方を見かけます。\nVOICEVOXは有志の方々で作られた無料の音声合成ソフトであることを留意してご利用ください。\n**性的・政治的・その他不適切な文章の読み上げは禁止します**`);
    },
};