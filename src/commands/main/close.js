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
        if (interaction.channel.parentId !== '821684794056245258' && interaction.channel.parentId !== '1053292420793647226') return await interaction.followUp('このコマンドはお問い合わせカテゴリーでのみ使用できます');
        await interaction.followUp('このお問い合わせをクローズしました');
        if (interaction.guildId === '706452606918066237') {
            await interaction.channel.setParent('828268142820196372');
        }
        else if (interaction.guildId === '1014096503389814844') {
            await interaction.channel.setParent('1053293176233926677');
        }
    },
};