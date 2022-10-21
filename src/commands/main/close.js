const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    info: {
        name: 'close',
        description: 'お問い合わせ',
        category: 'main',
        deferReply: true,
        ephemeral: false,
    },

    data: new SlashCommandBuilder()
        .setName('close')
        .setDescription('お問い合わせクローズ')
        .setDMPermission(false),

    /**
     * @param {import('../../Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        if (interaction.channel.parentId !== '821684794056245258') return await interaction.followUp('このコマンドはお問い合わせカテゴリーのみ使用できます');
        await interaction.followUp('このお問い合わせをクローズしました');
        await interaction.channel.setParent('828268142820196372');
    },
};