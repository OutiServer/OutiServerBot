const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    info: {
        name: 'studytimeadd',
        description: '勉強時間を追加',
        category: 'study',
        deferReply: true,
    },

    data: new SlashCommandBuilder()
        .setName('studytimeadd')
        .setDescription('勉強時間を追加')
        .addIntegerOption(option => option
            .setName('time')
            .setDescription('勉強時間を分単位で追加する')
            .setRequired(true)),

    /**
     * @param {import('../../Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        const date = new Date();
        const time = interaction.options.getInteger('time', true);

        client.database.addStudyTime(interaction.user.id, date.getFullYear(), date.getMonth() + 1, date.getDate(), time);

        await interaction.followUp(`${time}分、今日の勉強時間に追加しました`);
    },
};