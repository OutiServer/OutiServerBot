const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    info: {
        name: 'shutdown',
        description: 'シャットダウンコマンド',
        category: 'owner',
        deferReply: true,
    },

    data: new SlashCommandBuilder()
        .setName('shutdown')
        .setDescription('シャットダウンコマンド'),

    /**
     * @param {import('../../Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        await interaction.followUp('シャットダウンしています...');

        process.exit();
    },
};