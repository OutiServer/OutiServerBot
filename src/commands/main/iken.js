const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    info: {
        name: 'iken',
        description: '意見を匿名で出します',
        category: 'main',
        deferReply: true,
        ephemeral: true,
    },

    data: new SlashCommandBuilder()
        .setName('iken')
        .setDescription('意見を匿名で出します')
        .addStringOption(option => option
            .setName('iken')
            .setDescription('意見')
            .setRequired(true))
        .setDMPermission(false),

    /**
     * @param {import('../../Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        if (interaction.guildId !== '877587515677237258' && interaction.guildId !== '872880984205430834') return await interaction.followUp('このコマンドはこのサーバーでは利用できません');

        await interaction.channel.send(interaction.options.getString('iken', true));
        await interaction.followUp('意見を提出しました');
    },
};