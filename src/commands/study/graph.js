const { SlashCommandBuilder } = require('discord.js');
const QuickChart = require('quickchart-js');

module.exports = {
    info: {
        name: 'graph',
        description: '勉強時間をグラフで表示',
        category: 'study',
        deferReply: true,
    },

    data: new SlashCommandBuilder()
        .setName('graph')
        .setDescription('勉強時間をグラフで表示'),

    /**
     * @param {import('../../Bot')} client
     * @param {import('discord.js').CommandInteraction} interaction
     */

    run: async function (client, interaction) {
        const date = new Date();
        const all = client.database.getStudyMonth(interaction.user.id, date.getFullYear(), date.getMonth() + 1);
        if (!all || all.length < 1) return interaction.followUp('あなたはまだデータがないようです。');
        const labels = [];
        const time = [];

        for (const data of all) {
            labels.push(`${date.getMonth() + 1}月${data.day}日`);
            time.push(data.time);
        }

        const chart = new QuickChart();
        chart.setConfig({
            type: 'bar',
            data: { labels: labels, datasets: [{ label: '勉強時間', data: time }] },
        });
        const url = await chart.getShortUrl();
        await interaction.followUp(url);
    },
};