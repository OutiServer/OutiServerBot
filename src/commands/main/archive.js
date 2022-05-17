const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    info: {
        name: 'archive',
        description: 'スレッドをアーカイブする',
        category: 'main',
        deferReply: false,
    },

    data: new SlashCommandBuilder()
        .setName('archive')
        .setDescription('スレッドをアーカイブする'),

    /**
     * @param {import('../../Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        if (!interaction.channel.isThread()) return await interaction.followUp('このコマンドはスレッドチャンネルで使用できます');
        if (!interaction.member.permissions.has('ADMINISTRATOR') && !interaction.member.roles.cache.has('822852335322923060') && interaction.channel.ownerId !== interaction.user.id) return await interaction.followUp('このスレッドをロックすることはできません');
        await interaction.channel.setLocked(true, `Archived by ${interaction.user.tag}`);
        await interaction.followUp('このスレッドをアーカイブしました');
    },
};