const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord.js');

module.exports = {
    info: {
        name: 'skip',
        description: '再生中の読み上げをスキップする',
        category: 'admin',
        deferReply: true,
        ephemeral: true,
    },

    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('再生中の読み上げをスキップする')
        .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers | PermissionFlagsBits.DeafenMembers | PermissionFlagsBits.MoveMembers)
        .setDMPermission(false),

    /**
     * @param {import('../../Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        if (!interaction.member.voice.channel) return await interaction.followUp('このコマンドを使用するにはVCに参加している必要があります');
        else if (!client.speakers.get(interaction.guildId)) return await interaction.followUp('読み上げを開始していません');

        const speaker = client.speakers.get(interaction.guildId);
        speaker.skip();

        await interaction.followUp('スキップしました');
    },
};